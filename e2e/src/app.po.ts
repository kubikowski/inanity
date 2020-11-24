import { browser, by, element } from 'protractor';
import { ElementFinder } from 'protractor/built/element';

export class AppPage {
	navigateTo(): Promise<unknown> {
		return browser.get(browser.baseUrl) as Promise<unknown>;
	}

	getAppRoot(): ElementFinder {
		return element(by.css('app-root'));
	}

	getTitleText(): Promise<string> {
		return element(by.css('app-root app-header mat-toolbar dyslexic-text')).getAttribute('ng-reflect-text') as Promise<string>;
	}
}
