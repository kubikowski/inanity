import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, DOCUMENT, effect, inject, Injector, input, OnDestroy, OnInit, signal, untracked, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { baseUrl } from 'marked-base-url';
import { getHeadingList, gfmHeadingId, resetHeadings } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import markedKatex from 'marked-katex-extension';
import { markedSmartypants } from 'marked-smartypants';
import { RouterService } from 'src/app/core/browser/services/router.service';
import { FragmentAnchorComponent } from 'src/app/features/markdown/fragment-anchor.component';
import { SubSink } from 'subsink';

@Component({
	selector: 'markdown',
	template: '',
	styleUrl: 'markdown.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: { '[innerHTML]': 'markdownHtml()' },
})
export class MarkdownComponent implements OnInit, OnDestroy {
	private readonly http = inject(HttpClient);
	private readonly document = inject(DOCUMENT);
	private readonly domSanitizer = inject(DomSanitizer);
	private readonly injector = inject(Injector);
	private readonly routerService = inject(RouterService);
	private readonly subscriptions = new SubSink();

	public readonly url = input.required<string>();
	public readonly marked = computed(() => this.initializeMarked(this.url()));
	public readonly markdown = signal<string | null>(null);

	public readonly markdownHtml = computed(() => {
		const markdown = this.markdown();
		if (markdown === null) return null;

		const parsed = this.marked().parse(markdown) as string;
		return this.domSanitizer.bypassSecurityTrustHtml(parsed);
	});

	public constructor() {
		this.defineAnchors();

		effect(() => this.initializeScrollToHeading());
		effect(() => this.initializeAnchors());
	}

	public ngOnInit(): void {
		// TODO: migrate to httpResource
		this.subscriptions.sink = this.http.get(this.url(), { responseType: 'text' })
			.subscribe(markdown => this.markdown.set(markdown));
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private initializeMarked(url: string): Marked {
		resetHeadings();

		return new Marked({ gfm: true }).use(
			baseUrl(MarkdownComponent.relativeUrl(url)),
			gfmHeadingId({ prefix: 'heading-' }),
			markedHighlight({
				emptyLangClass: 'hljs',
				langPrefix: 'hljs language-',
				highlight(_code: string, _lang: string, _info: string): string {
					const language = hljs.getLanguage(_lang) ? _lang : 'plaintext';
					return hljs.highlight(_code, { language }).value;
				},
			}),
			markedKatex({
				nonStandard: true,
			}),
			markedSmartypants(),
		);
	}

	private static relativeUrl(url: string): string {
		return `${ url.split('/').slice(0, -1).join('/') }/`;
	}

	private initializeScrollToHeading(): void {
		const fragment = this.routerService.currentFragment();

		if (this.markdownHtml() !== null && fragment !== '') {
			setTimeout(() => this.scrollToHeading(fragment));
		}
	}

	private scrollToHeading(fragment: string | null): void {
		const headingIds = new Set(getHeadingList().map(heading => heading.id));
		const headingId = `heading-${ fragment }`;

		if (fragment !== null && headingIds.has(headingId)) {
			this.document.getElementById(headingId)?.scrollIntoView({ behavior: 'smooth' });
		}
	}

	private defineAnchors(): void {
		if (typeof customElements.get('fragment-anchor') === 'undefined') {
			const element = createCustomElement(FragmentAnchorComponent, { injector: this.injector });
			customElements.define('fragment-anchor', element);
		}
	}

	private initializeAnchors(): void {
		if (this.markdownHtml() !== null) {
			setTimeout(() => this.addAnchors());
		}
	}

	private addAnchors(): void {
		const headingIds = getHeadingList().map(heading => heading.id);
		const currentUrl = untracked(this.routerService.currentUrl);

		for (const headingId of headingIds) {
			const fragment = headingId.replace('heading-', '#');

			if (fragment !== '#') {
				const link = currentUrl + fragment;
				const anchor = `<fragment-anchor link="${ link }"/>`;

				this.document.getElementById(headingId)?.insertAdjacentHTML('afterbegin', anchor);
			}
		}
	}
}
