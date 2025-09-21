import { Component, computed, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { BaseDialogComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/core/dialogs/components/dialog.component';
import { DialogButtonBuilder } from 'src/app/core/dialogs/models/builder/dialog-button.builder';
import { DialogBuilder } from 'src/app/core/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/core/dialogs/models/configuration/dialog-configuration.model';
import { DialogResolution } from 'src/app/core/dialogs/models/dialog-resolution.enum';
import { AuthScreen, AuthScreenUtility } from 'src/app/core/firebase/models/auth-screen.enum';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';

@Component({
	selector: 'firebase-auth-dialog',
	templateUrl: 'firebase-auth-dialog.component.html',
	styleUrl: 'firebase-auth-dialog.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [
		BaseDialogComponent,
		MatButton, MatIcon, MatInput,
		MatFormFieldModule, ReactiveFormsModule,
	],
})
export class FirebaseAuthDialogComponent extends DialogComponent {
	public readonly firebaseService = inject(FirebaseService);

	public readonly AuthScreen = AuthScreen;
	public readonly authScreen = signal(AuthScreen.AUTH_SELECTION);

	public readonly canReturnToSelection = computed(() => AuthScreenUtility.returnToSelection(this.authScreen()));
	public readonly hideBackButton = computed(() => !this.canReturnToSelection());
	public readonly hideEmailButtons = computed(() => this.authScreen() !== AuthScreen.EMAIL_AUTH);

	public readonly authSuccess = this.firebaseService.authSuccess;
	public readonly authFailure = this.firebaseService.authFailure;

	private readonly headerTitle = computed(() => {
		if (this.authSuccess()) {
			return 'Signed In';
		} else if (this.authFailure()) {
			return 'Sign In Failed';
		} else {
			return 'Sign In';
		}
	});

	public readonly emailControl = new FormControl('', [
		control => Validators.required(control),
		control => Validators.email(control),
	]);
	public readonly passwordControl = new FormControl('', [
		control => Validators.required(control),
	]);

	public constructor() {
		super();

		effect(() => this.authSuccess() && (() => {
			this.authScreen.set(AuthScreen.SUCCESS);
			setTimeout(() => this.dialogRef.close(DialogResolution.SUCCESS), 2_000);
		})());

		effect(() => this.authFailure() && (() => {
			this.authScreen.set(AuthScreen.FAILURE);
		})());
	}

	public initializeDialogConfiguration(): DialogConfiguration {
		const backButton = DialogButtonBuilder.new()
			.withAction(() => this.returnToAuthenticationSelection())
			.withText('Back')
			.withIcon('arrow_left_alt')
			.withHidden(this.hideBackButton)
			.withAlignment('left')
			.build();

		const signUpButton = DialogButtonBuilder.new()
			.withAction(() => this.returnToAuthenticationSelection())
			.withText('Sign Up')
			.withHidden(this.hideEmailButtons)
			.withAttribute('flat')
			.withAlignment('right')
			.withColor('primary')
			.build();

		const signInButton = DialogButtonBuilder.new()
			.withAction(() => this.returnToAuthenticationSelection())
			.withText('Sign In')
			.withHidden(this.hideEmailButtons)
			.withAlignment('right')
			.withColor('primary')
			.build();

		return DialogBuilder.new()
			.withHeaderTitle(this.headerTitle)
			.withSubmitHidden()
			.withCancelHidden(this.canReturnToSelection)
			.withExtraButton(backButton)
			.withExtraButton(signUpButton)
			.withExtraButton(signInButton)
			.build();
	}

	public async selectGoogleSignIn(): Promise<void> {
		this.authScreen.set(AuthScreen.GOOGLE_AUTH);
		await this.firebaseService.googleSignIn();
	}

	public selectEmailSignIn(): void {
		this.authScreen.set(AuthScreen.EMAIL_AUTH);
	}

	public returnToAuthenticationSelection(): void {
		this.authScreen.set(AuthScreen.AUTH_SELECTION);
	}
}
