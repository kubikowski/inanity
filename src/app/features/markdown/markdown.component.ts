import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, OnDestroy, OnInit, signal, ViewEncapsulation } from '@angular/core';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { baseUrl } from 'marked-base-url';
import { markedHighlight } from 'marked-highlight';
import { SubSink } from 'subsink';

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
	public readonly marked = computed(() => this.initializeMarkdown(this.url()));
	public readonly markdown = signal<string | null>(null);

	public readonly markdownHtml = computed(() => {
		const markdown = this.markdown();
		return (markdown !== null) ? this.marked().parse(markdown) : null;
	});

	public ngOnInit(): void {
		this.subscriptions.sink = this.http.get(this.url(), { responseType: 'text' })
			.subscribe(markdown => this.markdown.set(markdown));
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private initializeMarkdown(url: string): Marked {
		return new Marked(
			baseUrl(MarkdownComponent.relativeUrl(url)),
			markedHighlight({
				emptyLangClass: 'hljs',
				langPrefix: 'hljs language-',
				highlight(code: string, lang: string, _info: string) {
					const language = hljs.getLanguage(lang) ? lang : 'plaintext';
					return hljs.highlight(code, { language }).value;
				},
			}),
		);
	}

	private static relativeUrl(url: string): string {
		return `${ url.split('/').slice(0, -1).join('/') }/`;
	}
}
