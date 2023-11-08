import React, {Component} from "react";
import {
    getTemplate,
    getUiOptions,
    orderProperties,
    ADDITIONAL_PROPERTY_FLAG,
    TranslatableString,
    PROPERTIES_KEY,
    REF_KEY,
    ANY_OF_KEY,
    ONE_OF_KEY,
} from "@rjsf/utils";
import get from "lodash/get";
import has from "lodash/has";
import isObject from "lodash/isObject";
import set from "lodash/set";
import unset from "lodash/unset";
import {createLayoutElement} from "../utils";

/** The `ObjectField` component is used to render a field in the schema that is of type `object`. It tracks whether an
 * additional property key was modified and what it was modified to
 *
 * @param props - The `FieldProps` for this template
 */
class ObjectField extends Component {
    constructor() {
        super(...arguments);
        /** Set up the initial state */
        this.state = {
            wasPropertyKeyModified: false,
            additionalProperties: {},
        };
        /** Returns the `onPropertyChange` handler for the `name` field. Handles the special case where a user is attempting
         * to clear the data for a field added as an additional property. Calls the `onChange()` handler with the updated
         * formData.
         *
         * @param name - The name of the property
         * @param addedByAdditionalProperties - Flag indicating whether this property is an additional property
         * @returns - The onPropertyChange callback for the `name` property
         */
        this.onPropertyChange = (name, addedByAdditionalProperties = false) => {
            return (value, newErrorSchema, id) => {
                const {formData, onChange, errorSchema} = this.props;
                if (value === undefined && addedByAdditionalProperties) {
                    // Don't set value = undefined for fields added by
                    // additionalProperties. Doing so removes them from the
                    // formData, which causes them to completely disappear
                    // (including the input field for the property name). Unlike
                    // fields which are "mandated" by the schema, these fields can
                    // be set to undefined by clicking a "delete field" button, so
                    // set empty values to the empty string.
                    value = "";
                }
                const newFormData = {...formData, [name]: value};
                onChange(newFormData, errorSchema &&
                    errorSchema && {
                        ...errorSchema,
                        [name]: newErrorSchema
                    }, id);
            };
        };
        /** Returns a callback to handle the onDropPropertyClick event for the given `key` which removes the old `key` data
         * and calls the `onChange` callback with it
         *
         * @param key - The key for which the drop callback is desired
         * @returns - The drop property click callback
         */
        this.onDropPropertyClick = (key) => {
            return (event) => {
                event.preventDefault();
                const {onChange, formData} = this.props;
                const copiedFormData = {...formData};
                unset(copiedFormData, key);
                onChange(copiedFormData);
            };
        };
        /** Computes the next available key name from the `preferredKey`, indexing through the already existing keys until one
         * that is already not assigned is found.
         *
         * @param preferredKey - The preferred name of a new key
         * @param [formData] - The form data in which to check if the desired key already exists
         * @returns - The name of the next available key from `preferredKey`
         */
        this.getAvailableKey = (preferredKey, formData) => {
            const {uiSchema} = this.props;
            const {duplicateKeySuffixSeparator = "-"} = getUiOptions(uiSchema);
            let index = 0;
            let newKey = preferredKey;
            while (has(formData, newKey)) {
                newKey = `${preferredKey}${duplicateKeySuffixSeparator}${++index}`;
            }
            return newKey;
        };
        /** Returns a callback function that deals with the rename of a key for an additional property for a schema. That
         * callback will attempt to rename the key and move the existing data to that key, calling `onChange` when it does.
         *
         * @param oldValue - The old value of a field
         * @returns - The key change callback function
         */
        this.onKeyChange = (oldValue) => {
            return (value, newErrorSchema) => {
                if (oldValue === value) {
                    return;
                }
                const {formData, onChange, errorSchema} = this.props;
                value = this.getAvailableKey(value, formData);
                const newFormData = {...formData};
                const newKeys = {[oldValue]: value};
                const keyValues = Object.keys(newFormData).map((key) => {
                    const newKey = newKeys[key] || key;
                    return {[newKey]: newFormData[key]};
                });
                const renamedObj = {...keyValues};
                this.setState({wasPropertyKeyModified: true});
                onChange(renamedObj, errorSchema &&
                    errorSchema && {...errorSchema, [value]: newErrorSchema});
            };
        };
        /** Handles the adding of a new additional property on the given `schema`. Calls the `onChange` callback once the new
         * default data for that field has been added to the formData.
         *
         * @param schema - The schema element to which the new property is being added
         */
        this.handleAddClick = (schema) => () => {
            if (!schema.additionalProperties) {
                return;
            }
            const {formData, onChange, registry} = this.props;
            const newFormData = {...formData};
            let type = undefined;
            if (isObject(schema.additionalProperties)) {
                type = schema.additionalProperties.type;
                let apSchema = schema.additionalProperties;
                if (REF_KEY in apSchema) {
                    const {schemaUtils} = registry;
                    apSchema = schemaUtils.retrieveSchema({$ref: apSchema[REF_KEY]}, formData);
                    type = apSchema.type;
                }
                if (!type && (ANY_OF_KEY in apSchema || ONE_OF_KEY in apSchema)) {
                    type = "object";
                }
            }
            const newKey = this.getAvailableKey("newKey", newFormData);
            // Cast this to make the `set` work properly
            set(newFormData, newKey, this.getDefaultValue(type));
            onChange(newFormData);
        };
    }

    /** Returns a flag indicating whether the `name` field is required in the object schema
     *
     * @param name - The name of the field to check for required-ness
     * @returns - True if the field `name` is required, false otherwise
     */
    isRequired(name) {
        const {schema} = this.props;
        return (Array.isArray(schema.required) && schema.required.indexOf(name) !== -1);
    }

    /** Returns a default value to be used for a new additional schema property of the given `type`
     *
     * @param type - The type of the new additional schema property
     */
    getDefaultValue(type) {
        const {
            registry: {translateString},
        } = this.props;
        switch (type) {
            case "string":
                return "New Value";
            case "array":
                return [];
            case "boolean":
                return false;
            case "null":
                return null;
            case "number":
                return 0;
            case "object":
                return {};
            default:
                // We don't have a datatype for some reason (perhaps additionalProperties was true)
                translateString(TranslatableString.NewStringDefault);
        }
    }

    /** Renders the `ObjectField` from the given props
     */
    render() {
        const {
            schema: rawSchema,
            uiSchema = {},
            formData,
            errorSchema,
            idSchema,
            name,
            required = false,
            disabled = false,
            readonly = false,
            hideError,
            idPrefix,
            idSeparator,
            onBlur,
            onFocus,
            registry: registry_,
        } = this.props;
        const {fields, formContext: formContext_, schemaUtils} = registry_;

        const formContext = {...formContext_, parent: this}
        const registry = {...registry_, formContext}

        const {SchemaField} = fields;
        const schema = schemaUtils.retrieveSchema(rawSchema, formData);
        const uiOptions = getUiOptions(uiSchema);
        const {properties: schemaProperties = {}} = schema;
        const Template = getTemplate("ObjectFieldTemplate", registry, uiOptions);
        let templateProps;
        if (uiOptions.layout) {
            return createLayoutElement({
                key: idSchema.$id,
                layout: uiOptions.layout,
                render: {
                    readonly,
                    disabled,
                    idSchema,
                    uiSchema,
                    schema,
                    formData,
                    formContext,
                    registry,
                    errorSchema,
                    idPrefix,
                    idSeparator,
                    onBlur,
                    onFocus,
                    hideError,
                    parent: this,
                    SchemaField
                }
            })
        } else {
            const title = schema.title === undefined ? name : schema.title;
            const description = uiOptions.description || schema.description;
            let orderedProperties;
            try {
                const properties = Object.keys(schemaProperties);
                orderedProperties = orderProperties(properties, uiOptions.order);
            } catch (err) {
                return (React.createElement("div", null,
                    React.createElement("p", {
                            className: "config-error",
                            style: {color: "red"}
                        },
                        "Invalid ",
                        name || "root",
                        " object field configuration:",
                        React.createElement("em", null, err.message),
                        "."),
                    React.createElement("pre", null, JSON.stringify(schema))));
            }
            templateProps = {
                title: uiOptions.title || title,
                description: description,
                properties: orderedProperties.map((name) => {
                    const addedByAdditionalProperties = has(schema, [
                        PROPERTIES_KEY,
                        name,
                        ADDITIONAL_PROPERTY_FLAG,
                    ]);
                    const fieldUiSchema = addedByAdditionalProperties
                        ? uiSchema.additionalProperties
                        : uiSchema[name];
                    const hidden = getUiOptions(fieldUiSchema).widget === "hidden";
                    const fieldIdSchema = get(idSchema, [name], {});
                    return {
                        content: (React.createElement(SchemaField, {
                            key: name,
                            name: name,
                            required: this.isRequired(name),
                            schema: get(schema, [PROPERTIES_KEY, name], {}),
                            uiSchema: fieldUiSchema,
                            errorSchema: get(errorSchema, name),
                            idSchema: fieldIdSchema,
                            idPrefix: idPrefix,
                            idSeparator: idSeparator,
                            formData: get(formData, name),
                            formContext: formContext,
                            wasPropertyKeyModified: this.state.wasPropertyKeyModified,
                            onKeyChange: this.onKeyChange(name),
                            onChange: this.onPropertyChange(name, addedByAdditionalProperties),
                            onBlur: onBlur,
                            onFocus: onFocus,
                            registry: registry,
                            disabled: disabled,
                            readonly: readonly,
                            hideError: hideError,
                            onDropPropertyClick: this.onDropPropertyClick
                        })),
                        name,
                        readonly,
                        disabled,
                        required,
                        hidden,
                    };
                }),
                readonly,
                disabled,
                required,
                idSchema,
                uiSchema,
                schema,
                formData,
                formContext,
                registry,
                onAddClick: this.handleAddClick
            };
        }

        return <Template {...templateProps}/>;
    }
}

export default ObjectField;