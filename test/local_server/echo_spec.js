import webdriver from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from 'nodium/lib/driver';
import { expect } from 'nodium/lib/assert/chai';

describe('operation GET /echo?echo=', () => {
    it('includes value of echo parameter in response', () => {
        const echoString = 'please echo this';
        driver.get('http://localhost:3030/echo/' + echoString.replace(/ /g, '%20'));

        return expect(driver.getPageSource()).to.eventually.contain(echoString);
    });
});
