import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
	selector: 'markdown',
	templateUrl: 'markdown.component.html',
	styleUrl: 'markdown.component.scss',
	standalone: true,
})
export class MarkdownComponent implements OnInit, OnDestroy {
	private readonly http = inject(HttpClient);
	private readonly subscriptions = new SubSink();

	public readonly url = input.required<string>();
	public readonly markdown = signal<string | null>(null);

	public readonly markdownLines = computed(() => {
		const markdown = this.markdown();
		return (markdown !== null) ? markdown.split('\n') : null;
	});

	public ngOnInit(): void {
		this.subscriptions.sink = this.http.get(this.url(), { responseType: 'text' })
			.subscribe(markdown => this.markdown.set(markdown));
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
