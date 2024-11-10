import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, OnDestroy, OnInit, signal, ViewEncapsulation } from '@angular/core';
import hljs from 'highlight.js';
import markdownit from 'markdown-it';
import { SubSink } from 'subsink';

const md = markdownit({
	html: true,
	typographer: true,
	highlight: function (str: string, lang: string): string {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch (__) { /* empty */ }
		}

		return ''; // use external default escaping
	},
});

@Component({
	selector: 'markdown',
	template: '',
	styleUrl: 'markdown.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: { '[innerHTML]': 'markdownHtml()' },
	standalone: true,
})
export class MarkdownComponent implements OnInit, OnDestroy {
	private readonly http = inject(HttpClient);
	private readonly subscriptions = new SubSink();

	public readonly url = input.required<string>();
	public readonly markdown = signal<string | null>(null);

	public readonly markdownHtml = computed(() => {
		const markdown = this.markdown();
		return (markdown !== null) ? md.render(markdown) : null;
	});

	public ngOnInit(): void {
		this.subscriptions.sink = this.http.get(this.url(), { responseType: 'text' })
			.subscribe(markdown => this.markdown.set(markdown));
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
