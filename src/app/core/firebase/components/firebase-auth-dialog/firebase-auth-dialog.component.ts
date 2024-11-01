import { AfterViewInit, Component, computed, effect, inject, ViewEncapsulation } from '@angular/core';
import { BaseDialogComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/core/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/core/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/core/dialogs/models/configuration/dialog-configuration.model';
import { DialogResolution } from 'src/app/core/dialogs/models/dialog-resolution.enum';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';

@Component({
	selector: 'firebase-auth-dialog',
	templateUrl: 'firebase-auth-dialog.component.html',
	styleUrl: 'firebase-ui-auth-6.0.2.modified.css',
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [ BaseDialogComponent ],
})
export class FirebaseAuthDialogComponent extends DialogComponent implements AfterViewInit {
	public readonly firebaseService = inject(FirebaseService);

	public readonly authSuccess = this.firebaseService.authSuccess;
	public readonly authFailure = this.firebaseService.authFailure;

	private readonly headerTitle = computed(() => {
		if (this.authSuccess()) {
			return 'Signed In';
		} else if (this.authFailure()) {
			return 'Sign In Failed';
		} else {
			return '';
		}
	});

	public constructor() {
		super();

		effect(() => {
			if (this.authSuccess()) {
				setTimeout(() => this.dialogRef.close(DialogResolution.SUCCESS), 2_000);
			}
		});

		effect(() => {
			if (this.authFailure()) {
				setTimeout(() => this.dialogRef.close(DialogResolution.FAILED), 2_000);
			}
		});
	}

	public ngAfterViewInit(): void {
		this.firebaseService.attachAuthUI();
	}

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle(this.headerTitle)
			.withSubmitButtonHidden()
			.withCancelButtonHidden()
			.withContentPaddingOmitted()
			.build();
	}
}
