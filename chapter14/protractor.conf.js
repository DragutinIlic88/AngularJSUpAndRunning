exports.config = {
    //the adress of a running Selenium server
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //The URL where the server we are testing is running
    baseUrl: 'http://localhost:8000/',
    //Capabilities to be passed to the WebDriver instance
    capabilities: {
        'browserName' : 'chrome'
    },

    //Spec patterns are relative to the location of the spec file
    specs: ['*Spec*.js'],
    //Options to be passed to Jasmine-node
    jasmineNodeOpts: {
        showColors: true
    }
};