'use strict';

var should = require('should');

var phantomjs = require('phantomjs-prebuilt');
var webdriverio = require('webdriverio');
var options = { waitforTimeout: 1000, desiredCapabilities: { browserName: 'phantomjs' } };
var phantom = phantomjs.run('--webdriver=4444');

describe('Mozilla Website', function() {
  after(function() {
    return phantom.then(program => program.kill());
  });

  describe('Browse index page', function() {
    it('should has title "MDN Web Docs"', function() {
      this.timeout(5000);
      return phantom.then(() => {
        return webdriverio.remote(options).init()
          .url('https://developer.mozilla.org/en-US/')
          .saveScreenshot('./test/screenshots/it-should-has-title.png')
          .getTitle().then(title => {
            console.log(title);
            title.should.be.equals('MDN Web Docs');
          });
      });
    });
  });
});
