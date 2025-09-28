import { computed, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogButtonBuilder } from 'src/app/core/dialogs/models/builder/dialog-button.builder';
import { AuthScreen, AuthScreenUtility } from 'src/app/core/firebase/models/auth-screen.enum';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';
import { formValidity } from 'src/app/core/functions/signal/form-validity.function';

@Injectable()
export class FirebaseAuthDialogService {
	private readonly firebaseService = inject(FirebaseService);

	// region Auth Screen
	public readonly authScreen = signal(AuthScreen.AUTH_SELECTION);

	public readonly showBackButton = computed(() => AuthScreenUtility.canGoBack(this.authScreen()));
	public readonly showCancelButton = computed(() => !this.showBackButton());

	public readonly showNextButton = computed(() => AuthScreenUtility.canGoNext(this.authScreen()));
	public readonly showEmailButtons = computed(() => AuthScreenUtility.canSubmit(this.authScreen()));
	public readonly showRecoverButton = computed(() => AuthScreenUtility.canRecover(this.authScreen()));

	public readonly title = computed(() => AuthScreenUtility.getTitle(this.authScreen()));
	// endregion Auth Screen


	// region Form Elements
	public readonly emailControl = new FormControl('', {
		nonNullable: true,
		validators: [
			control => Validators.required(control),
			control => Validators.email(control),
		],
	});
	public readonly passwordControl = new FormControl('', {
		nonNullable: true,
		validators: [
			control => Validators.required(control),
		],
	});
	public readonly confirmPasswordControl = new FormControl('', {
		nonNullable: true,
		validators: [
			control => Validators.required(control),
		],
	});

	public readonly emailForm = new FormGroup({
		email: this.emailControl,
		password: this.passwordControl,
		confirmPassword: this.confirmPasswordControl,
	});

	private readonly validEmail = formValidity(this.emailControl);
	private readonly validPassword = formValidity(this.emailControl);
	// endregion Form Elements


	// region Buttons
	private readonly backButton = DialogButtonBuilder.new()
		.withAction(() => this.goBack())
		.withText('Back')
		.withIcon('arrow_left_alt')
		.withVisible(this.showBackButton)
		.withAlignment('left')
		.build();

	private readonly nextButton = DialogButtonBuilder.new()
		.withAction(() => this.goNext())
		.withText('Next')
		.withIcon('arrow_right_alt')
		.withIconAlignment('right')
		.withVisible(this.showNextButton)
		.withEnabled(this.validEmail)
		.withAlignment('right')
		.build();

	private readonly recoverPasswordButton = DialogButtonBuilder.new()
		.withAction(() => {})
		.withText('Recover Password')
		.withVisible(this.showRecoverButton)
		.withAttribute('flat')
		.withAlignment('right')
		.withColor('primary')
		.build();

	private readonly signUpButton = DialogButtonBuilder.new()
		.withAction(() => {})
		.withText('Sign Up')
		.withVisible(this.showEmailButtons)
		.withAttribute('flat')
		.withAlignment('right')
		.withColor('primary')
		.build();

	private readonly signInButton = DialogButtonBuilder.new()
		.withAction(() => {})
		.withText('Sign In')
		.withVisible(this.showEmailButtons)
		.withAlignment('right')
		.withColor('primary')
		.build();

	public readonly buttons = [
		this.backButton,
		this.nextButton,
		this.recoverPasswordButton,
		this.signUpButton,
		this.signInButton,
	];
	// endregion Buttons


	// region Auth Screen Navigation
	public async selectGoogleSignIn(): Promise<void> {
		this.authScreen.set(AuthScreen.GOOGLE_AUTH);
		await this.firebaseService.googleSignIn();
	}

	public selectEmailSignIn(): void {
		this.authScreen.set(AuthScreen.EMAIL_AUTH);
	}

	public forgotPassword(): void {
		this.authScreen.set(AuthScreen.RECOVER_PASSWORD);
	}

	private goBack(): void {
		const current = this.authScreen();
		const previous = AuthScreenUtility.getBackTarget(current);

		if (previous !== null) {
			this.emailForm.markAsPristine();
			this.emailForm.markAsUntouched();
			this.authScreen.set(previous);
		}
	}

	private goNext(): void {
		const current = this.authScreen();
		const next = AuthScreenUtility.getNextTarget(current);

		if (next !== null) {
			this.emailForm.markAsPristine();
			this.emailForm.markAsUntouched();
			this.authScreen.set(next);
		}
	}
	// endregion Auth Screen Navigation
}
