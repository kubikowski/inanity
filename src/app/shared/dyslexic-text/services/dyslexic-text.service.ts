import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DyslexicTextService {

	// Document
	body = document.body;

	constructor() {
		// Get Initial Value
		const enabled = JSON.parse(localStorage.getItem('dyslexic-text')) ?? true;

		// Initialize Enabled Value
		this.setEnabled(enabled);
	}

	getEnabled(): boolean {
		return this.body.classList.contains('dyslexic-text');
	}

	setEnabled(enabled: boolean): void {
		enabled
			? this.enableGlobally()
			: this.disableGlobally();
	}

	enableGlobally(): void {
		this.body.classList.add('dyslexic-text');
		localStorage.setItem('dyslexic-text', 'true');
	}

	disableGlobally(): void {
		this.body.classList.remove('dyslexic-text');
		localStorage.setItem('dyslexic-text', 'false');
	}
}
