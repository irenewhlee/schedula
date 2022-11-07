#!/usr/bin/env python
# -*- coding: UTF-8 -*-
#
# Copyright 2015-2022, Vincenzo Arcidiacono;
# Licensed under the EUPL (the 'Licence');
# You may not use this work except in compliance with the Licence.
# You may obtain a copy of the Licence at: http://ec.europa.eu/idabc/eupl

import os
import platform
import unittest
import os.path as osp

EXTRAS = os.environ.get('EXTRAS', 'all')

PLATFORM = platform.system().lower()


@unittest.skipIf(EXTRAS not in ('all', 'form'), 'Not for extra %s.' % EXTRAS)
@unittest.skipIf(PLATFORM not in ('darwin', 'linux'),
                 'Not for platform %s.' % PLATFORM)
class TestDispatcherForm(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        try:
            import sys
            import time
            import chromedriver_autoinstaller
            from selenium import webdriver
            from pyvirtualdisplay import Display
        except ImportError:
            return

        if os.environ.get('ACTION', '').lower() == 'true':
            cls.display = display = Display(visible=False, size=(800, 800))
            display.start()

        chromedriver_autoinstaller.install()
        cls.driver = webdriver.Chrome()
        time.sleep(3)
        cls.form_dir = form_dir = osp.abspath(osp.join(
            osp.dirname(__file__), '..', '..', 'examples',
            'length_converter'
        ))
        sys.path.insert(0, form_dir)

    def setUp(self):
        from examples.length_converter.form import form as dsp
        self.dsp = dsp.register()
        self.site = None

    @classmethod
    def tearDownClass(cls):
        if hasattr(cls, 'driver'):
            cls.driver.close()

    def tearDown(self):
        if self.site:
            self.site.shutdown()

    def test_form1(self):
        from selenium.webdriver.common.by import By
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.common.exceptions import NoSuchElementException
        from selenium.webdriver.support import expected_conditions as EC

        sites = set()
        self.dsp.form(directory=self.form_dir, run=True, sites=sites)
        self.site = sites.pop()
        driver = self.driver

        driver.get('%s/' % self.site.url)
        WebDriverWait(driver, 30).until(
            EC.visibility_of_element_located((By.ID, "run-button"))
        ).click()
        with self.assertRaises(NoSuchElementException):
            driver.find_element(value='context-data')

    def test_form2(self):
        from selenium.webdriver.common.by import By
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC

        sites = set()
        self.dsp.form(
            directory=self.form_dir, run=True, sites=sites,
            get_context=lambda: {
                'data': 'cool'
            }, get_data=lambda: {
                "input": {"kwargs": {
                    "inputs": {
                        "value_in": 1, "unit_in": "m",
                        "units_out": ["in", "mm", "km"]
                    },
                    "select_output_kw": {
                        "keys": ["results", "value_in", "unit_in"],
                        "output_type": "all"
                    }
                }},
                "return": {
                    "results": [
                        {"unit_out": "in", "value_out": 39.37007874015748},
                        {"unit_out": "mm", "value_out": 1000},
                        {"unit_out": "km", "value_out": 0.001}
                    ],
                    "unit_in": "m",
                    "value_in": 1
                },
                "hash": "cc051052ae52aa702474df394b5d4f23c19f3232"
            }
        )
        self.site = sites.pop()
        driver = self.driver

        driver.get('%s/' % self.site.url)
        self.assertTrue(WebDriverWait(driver, 30).until(
            EC.visibility_of_element_located((By.ID, "run-button"))
        ).get_attribute('disabled'))
        self.assertEqual(
            driver.find_element(value='context-data').get_attribute('content'),
            'cool'
        )
