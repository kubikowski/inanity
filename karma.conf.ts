// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config: any) => {
	const options = {
		autoWatch: true,
		basePath: '',
		browsers: [ 'Chrome' ],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		colors: true,
		concurrency: Infinity,
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, './coverage/inanity'),
			reports: [ 'html', 'lcovonly', 'text-summary' ],
			fixWebpackSourcePaths: true,
		},
		customLaunchers: {
			ChromeHeadlessCI: {
				base: 'ChromeHeadless',
				flags: [
					'--no-sandbox',
					'--no-first-run',
					'--disable-gpu',
					'--disable-translate',
					'--disable-extensions',
				],
			},
		},
		frameworks: [ 'jasmine', 'karma-typescript', '@angular-devkit/build-angular' ],
		karmaTypescriptConfig: {
			tsconfig: './tsconfig.json'
		},
		logLevel: config.LOG_INFO,
		plugins: [
			require('karma-jasmine'),
			require('karma-typescript'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		port: 9876,
		preprocessors: {
			'**/*.ts': [ 'karma-typescript' ],
		},
		reporters: [ 'progress', 'karma-typescript', 'kjhtml' ],
		restartOnFileChange: true,
		singleRun: false,
	};

	config.set(options);
};
