import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, OnDestroy, OnInit, signal, ViewEncapsulation } from '@angular/core';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { baseUrl } from 'marked-base-url';
import { markedHighlight } from 'marked-highlight';
import { markedSmartypants } from 'marked-smartypants';
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
	public readonly marked = computed(() => this.initializeMarked(this.url()));
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

	private initializeMarked(url: string): Marked {
		return new Marked(
			baseUrl(MarkdownComponent.relativeUrl(url)),
			markedHighlight({
				emptyLangClass: 'hljs',
				langPrefix: 'hljs language-',
				highlight(_code: string, _lang: string, _info: string): string {
					const language = hljs.getLanguage(_lang) ? _lang : 'plaintext';
					return hljs.highlight(_code, { language }).value;
				},
			}),
			markedSmartypants(),
		);
	}

	private static relativeUrl(url: string): string {
		return `${ url.split('/').slice(0, -1).join('/') }/`;
	}
}
