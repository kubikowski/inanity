import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { SnekModule } from 'src/app/features/snek/snek.module';
import { NotFoundRoutingModule } from 'src/app/pages/not-found/not-found-routing.module';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

@NgModule({
	declarations: [
		NotFoundComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
		SnekModule,
	],
	exports: [
		NotFoundRoutingModule,
	],
})
export class NotFoundModule { }
