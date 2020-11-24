import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
		// browser.waitForAngularEnabled(false);
	});

	it('should display app-root', () => {
		page.navigateTo();
		expect(page.getAppRoot().isDisplayed()).toBeTruthy();
	});

	it('should display header title', () => {
		page.navigateTo();
		expect(page.getTitleText()).toEqual('inanity');
	});

	afterEach(async () => {
		// Assert that there are no errors emitted from the browser
		const logs = await browser.manage().logs().get(logging.Type.BROWSER);
		expect(logs).not.toContain(jasmine.objectContaining({
			level: logging.Level.SEVERE,
		} as logging.Entry));
	});
});
