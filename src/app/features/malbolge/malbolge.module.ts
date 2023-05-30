import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DyslexicTextModule } from 'src/app/features/dyslexic-text/dyslexic-text.module';
import { MalbolgeSpecificationComponent } from 'src/app/features/malbolge/components/malbolge-specification/malbolge-specification.component';
import { MalbolgeWarningComponent } from 'src/app/features/malbolge/components/malbolge-warning/malbolge-warning.component';

@NgModule({
	declarations: [
		MalbolgeSpecificationComponent,
		MalbolgeWarningComponent,
	],
	imports: [
		CoreModule,
		DyslexicTextModule,
	],
	exports: [
		MalbolgeSpecificationComponent,
		MalbolgeWarningComponent,
	],
})
export class MalbolgeModule { }
