# mocha-phantomjs

A minimal example of headless browser testing with [Mocha](https://mochajs.org/), [WebdriverIO](https://webdriver.io/) (v4) and [PhantomJS](https://phantomjs.org/).

The test suite starts a PhantomJS instance in WebDriver (GhostDriver) mode, opens a web page through WebdriverIO, takes a screenshot, and checks the page title with [should.js](https://shouldjs.github.io/).

## Project structure

```
.
├── package.json
└── test/
    ├── test-browser.js        # Mocha test suite
    └── screenshots/           # Screenshots captured during test runs
        └── it-should-has-title.png
```

## Requirements

- Node.js and npm
- Network access (the test loads `https://developer.mozilla.org/en-US/`, and `phantomjs-prebuilt` downloads the PhantomJS binary on install)
- Port `4444` free on localhost (PhantomJS's WebDriver server listens there)

## Installation

```bash
npm install
```

## Usage

Run the tests:

```bash
npm test
```

This runs `mocha -R spec --ui bdd --colors test/*.js`.

Generate an HTML coverage report with Istanbul (written to `coverage/`):

```bash
npm run coverage
```

> The `coverage` script calls `./node_modules/.bin/istanbul` with a Unix-style path. On Windows, run it from a Bash-compatible shell (e.g. Git Bash), or change the path to `node_modules\\.bin\\istanbul`.

## How the test works

`test/test-browser.js`:

1. Starts PhantomJS with `phantomjs.run('--webdriver=4444')`, which returns a promise for the running process.
2. Once PhantomJS is up, creates a WebdriverIO session with `browserName: 'phantomjs'` and a `waitforTimeout` of 1000 ms.
3. Navigates to the MDN Web Docs home page.
4. Saves a screenshot to `test/screenshots/it-should-has-title.png`.
5. Asserts that the page title equals `"MDN Web Docs"`.
6. Kills the PhantomJS process in an `after` hook, so it is stopped even when the test fails.

The test has a 5-second timeout (`this.timeout(5000)`).

## Dependencies

| Package              | Version   | Purpose                                   |
| -------------------- | --------- | ----------------------------------------- |
| `mocha`              | ^5.0.5    | Test runner                               |
| `should`             | ^13.2.1   | BDD-style assertions                      |
| `webdriverio`        | ^4.12.0   | WebDriver client used to drive the browser |
| `phantomjs-prebuilt` | ^2.1.16   | Headless browser with a built-in WebDriver server |
| `istanbul`           | ^0.4.5    | Code coverage                             |

## Known limitations

- **PhantomJS is discontinued** and its WebKit engine is outdated; modern sites may render incorrectly or fail to load. For new work, consider headless Chrome or Firefox (e.g. via Puppeteer, Playwright, or a current WebdriverIO release).
- **The test depends on a live external site.** If MDN changes its page title or is unreachable, the test fails.

## License

ISC (as declared in `package.json`).
