/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React, {createContext, useContext, useMemo} from 'react';
import {enquireScreen} from 'enquire-js';
import './less/antMotionStyle.less';
import mergeWith from "lodash/mergeWith";
import {theme} from "antd";
function customizer(objValue, srcValue, key) {
  if (key === 'children' && srcValue) {
    return srcValue;
  }
  // Return undefined to use the default merging behavior for other keys
  return undefined;
}

const {useToken} = theme;
// Create a context to hold multiple values
const MultiValueContext = createContext();

// Custom hook to use the context
export const useMultiValueContext = () => {
    const context = useContext(MultiValueContext);
    if (!context) {
        throw new Error('useMultiValueContext must be used within a MultiValueProvider');
    }
    return context;
};

// Provider component
export const MultiValueProvider = ({value, children}) => {
    const contextValue = useMemo(() => value, [value]);
    return (
        <MultiValueContext.Provider value={contextValue}>
            {children}
        </MultiValueContext.Provider>
    );
};
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

const {location = {}} = typeof window !== 'undefined' ? window : {};

export const ComponentWrapper = (
    {
        CoreComponent,
        children,
        render,
        defaultDataSource,
        dataSource,
        dataSourceMerge = false,
        ...props
    }
) => {
    const parentProps = useMultiValueContext();
    const _props = {
        ...mergeWith({dataSource: defaultDataSource}, parentProps, customizer), ...props
    }
    if (dataSourceMerge) {
        dataSource = mergeWith(_props.dataSource, dataSource, customizer);
    }
    const {token} = useToken();
    return <CoreComponent style={{
        '--primary-color': token.colorPrimary,
        '--text-color': token.colorText
    }} {..._props} dataSource={dataSource}>
        {children}
    </CoreComponent>
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
            show: !location.port, // 如果不是 dva 2.0 请删除
        };
    }

    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({isMobile: !!b});
        });
        // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
        /* 如果不是 dva 2.0 请删除 start */
        if (location.port) {
            // 样式 build 时间在 200-300ms 之间;
            setTimeout(() => {
                this.setState({
                    show: true,
                });
            }, 500);
        }
        /* 如果不是 dva 2.0 请删除 end */
    }

    render() {
        const {id = 'landing', ...props} = this.props;
        return (
            <div
                id={id}
                style={{height: '100%', overflowY: 'auto'}}
                className="templates-wrapper home-page-wrapper"
                ref={(d) => {
                    this.dom = d;
                }}
                {...props}
            ><MultiValueProvider value={{
                isMobile: this.state.isMobile,
                dataSource: {OverPack: {targetId: id}}
            }}>
                {/* 如果不是 dva 2.0 替换成 {children} start */}
                {this.state.show && this.props.children}
                {/* 如果不是 dva 2.0 替换成 {children} end */}
            </MultiValueProvider></div>
        );
    }
}