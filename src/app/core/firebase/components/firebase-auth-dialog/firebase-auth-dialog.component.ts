import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BaseDialogComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/core/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/core/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/core/dialogs/models/configuration/dialog-configuration.model';
import { DialogResolution } from 'src/app/core/dialogs/models/dialog-resolution.enum';
import { EmailInputComponent } from 'src/app/core/firebase/components/email-input/email-input.component';
import { FirebaseAuthDialogService } from 'src/app/core/firebase/components/firebase-auth-dialog/firebase-auth-dialog.service';
import { PasswordInputComponent } from 'src/app/core/firebase/components/password-input/password-input.component';
import { AuthScreen } from 'src/app/core/firebase/models/auth-screen.enum';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';
import { EmptyComponent } from 'src/app/features/empty/empty.component';

@Component({
	selector: 'firebase-auth-dialog',
	templateUrl: 'firebase-auth-dialog.component.html',
	styleUrl: 'firebase-auth-dialog.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [ FirebaseAuthDialogService ],
	imports: [
		BaseDialogComponent, EmptyComponent,
		MatButton, MatIcon, EmailInputComponent, PasswordInputComponent,
	],
})
export class FirebaseAuthDialogComponent extends DialogComponent {
	private readonly firebaseAuthDialogService = inject(FirebaseAuthDialogService);
	private readonly firebaseService = inject(FirebaseService);

	public readonly AuthScreen = AuthScreen;
	public readonly authScreen = this.firebaseAuthDialogService.authScreen;

	public readonly emailControl = this.firebaseAuthDialogService.emailControl;
	public readonly passwordControl = this.firebaseAuthDialogService.passwordControl;
	public readonly confirmPasswordControl = this.firebaseAuthDialogService.confirmPasswordControl;

	public constructor() {
		super();

		effect(() => this.firebaseService.authSuccess() && (() => {
			this.authScreen.set(AuthScreen.SUCCESS);
			setTimeout(() => this.dialogRef.close(DialogResolution.SUCCESS), 2_000);
		})());

		effect(() => this.firebaseService.authFailure() && (() => {
			this.authScreen.set(AuthScreen.FAILURE);
		})());
	}

	public initializeDialogConfiguration(): DialogConfiguration {
		const { title, buttons, showCancelButton } = this.firebaseAuthDialogService;

		return DialogBuilder.new()
			.withHeaderTitle(title)
			.withSubmitVisible(false)
			.withCancelVisible(showCancelButton)
			.withExtraButtons(buttons)
			.build();
	}

	public async selectGoogleSignIn(): Promise<void> {
		await this.firebaseAuthDialogService.selectGoogleSignIn();
	}

	public selectEmailSignIn(): void {
		this.firebaseAuthDialogService.selectEmailSignIn();
	}

	public forgotPassword(): void {
		this.firebaseAuthDialogService.forgotPassword();
	}
}
