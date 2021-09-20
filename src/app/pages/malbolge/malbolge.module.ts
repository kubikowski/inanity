import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { MalbolgeRoutingModule } from 'src/app/pages/malbolge/malbolge-routing.module';
import { MalbolgeSpecificationComponent } from 'src/app/pages/malbolge/malbolge-specification/malbolge-specification.component';
import { MalbolgeComponent } from 'src/app/pages/malbolge/malbolge.component';

@NgModule({
	declarations: [
		MalbolgeSpecificationComponent,
		MalbolgeComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
	],
	exports: [
		MalbolgeRoutingModule,
	]
})
export class MalbolgeModule {
}
