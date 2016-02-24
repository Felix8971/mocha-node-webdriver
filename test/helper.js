import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

class Helper {
    getChromeServiceBuilder() {
        const chromeBinary = __dirname + '/../node_modules/.bin/chromedriver';

        return new chrome.ServiceBuilder(chromeBinary);
    }

    getChromeDriver() {
        return new chrome.Driver(null, this.getChromeServiceBuilder().build());
    }

    getChromeDriverWithVerboseLogging(filePath) {
        const service = this.getChromeServiceBuilder().build()
            .enableVerboseLogging()
            .loggingTo(filePath || 'chromedriver.log')
            .build();

        return new chrome.Driver(null, service);
    }

    waitForPageLoadAfter(driver, seleniumOperation) {
        let bodyElement;
        driver.
            findElement(webdriver.By.tagName('BODY')).
            then(element => {
                bodyElement = element;
            });
        seleniumOperation();
        driver.wait(() => {
            // better implementation:
            //   check error.message for "stale element reference: element is not attached to the page document"
            //   and reject the promise we're returning in that case
            return bodyElement.getAttribute('class').then(() => false, (error) => true);
        });
    }
}

export default new Helper();
