import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogButtonBuilder } from 'src/app/core/dialogs/models/builder/dialog-button.builder';
import { AuthProvider } from 'src/app/core/firebase/models/auth-provider.enum';
import { AuthScreen, AuthScreenUtility } from 'src/app/core/firebase/models/auth-screen.enum';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';
import { formValidity } from 'src/app/core/functions/signal/form-validity.function';

@Injectable()
export class FirebaseAuthDialogService {
	private readonly firebaseService = inject(FirebaseService);


	// region Auth Provider
	public readonly authProvider = signal<AuthProvider | null>(null);
	// endregion Auth Provider

	// region Auth Screen
	public readonly authScreen = signal(AuthScreen.AUTH_SELECTION);

	public readonly showBackButton = computed(() => AuthScreenUtility.canGoBack(this.authScreen()));
	public readonly showCancelButton = computed(() => !this.showBackButton());

	public readonly showSignInButton = computed(() => AuthScreenUtility.canSignIn(this.authScreen()));
	public readonly showSignUpButton = computed(() => AuthScreenUtility.canSignUp(this.authScreen()));
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

	public readonly emailAccountForm = new FormGroup({
		email: this.emailControl,
		password: this.passwordControl,
		confirmPassword: this.confirmPasswordControl,
	});

	private readonly validEmail = formValidity(this.emailControl);
	private readonly validPassword = formValidity(this.passwordControl);
	private readonly validEmailAuth = computed(() => this.validEmail() && this.validPassword());
	private readonly validCreateAccountForm = formValidity(this.emailAccountForm);
	// endregion Form Elements


	// region Buttons
	private readonly backButton = DialogButtonBuilder.new()
		.withAction(() => this.goBack())
		.withText('Back')
		.withIcon('arrow_left_alt')
		.withVisible(this.showBackButton)
		.withAlignment('left')
		.build();

	// private readonly nextButton = DialogButtonBuilder.new()
	// 	.withAction(() => this.goNext())
	// 	.withText('Next')
	// 	.withIcon('arrow_right_alt')
	// 	.withIconAlignment('right')
	// 	.withVisible(this.showNextButton)
	// 	.withEnabled(this.validEmail)
	// 	.withAlignment('right')
	// 	.build();

	private readonly recoverPasswordButton = DialogButtonBuilder.new()
		.withAction(() => {})
		.withText('Recover Password')
		.withVisible(this.showRecoverButton)
		.withEnabled(this.validEmail)
		.withAttribute('flat')
		.withAlignment('right')
		.withColor('primary')
		.build();

	private readonly signUpButton = DialogButtonBuilder.new()
		.withAction(() => {})
		.withText('Sign Up')
		.withVisible(this.showSignUpButton)
		.withEnabled(this.validCreateAccountForm)
		.withAttribute('flat')
		.withAlignment('right')
		.withColor('primary')
		.build();

	private readonly signInButton = DialogButtonBuilder.new()
		.withAction(() => this.submitEmailAuthentication())
		.withText('Sign In')
		.withVisible(this.showSignInButton)
		.withEnabled(this.validEmailAuth)
		.withAttribute('flat')
		.withAlignment('right')
		.withColor('primary')
		.build();

	public readonly buttons = [
		this.backButton,
		this.recoverPasswordButton,
		this.signUpButton,
		this.signInButton,
	];
	// endregion Buttons


	public constructor() {
		effect(() => this.firebaseService.authSuccess() && (() => {
			this.authScreen.set(AuthScreen.SUCCESS);
		})());

		effect(() => this.firebaseService.authFailure() && (() => {
			this.authScreen.set(AuthScreenUtility.getFailureMode(untracked(this.authProvider)));
		})());
	}


	// region Auth Screen Navigation
	public async selectGoogleSignIn(): Promise<void> {
		this.authProvider.set(AuthProvider.GOOGLE);
		this.authScreen.set(AuthScreen.GOOGLE_AUTH);
		await this.firebaseService.googleSignIn();
	}

	public selectEmailSignIn(): void {
		this.authProvider.set(AuthProvider.EMAIL);
		this.authScreen.set(AuthScreen.EMAIL_AUTH);
	}

	public createAccount(): void {
		this.authScreen.set(AuthScreen.CREATE_ACCOUNT);
	}

	public forgotPassword(): void {
		this.authScreen.set(AuthScreen.RECOVER_PASSWORD);
	}

	private goBack(): void {
		const current = this.authScreen();
		const previous = AuthScreenUtility.getBackTarget(current);

		if (previous !== null) {
			this.emailAccountForm.markAsPristine();
			this.emailAccountForm.markAsUntouched();
			this.authScreen.set(previous);

			if (previous === AuthScreen.AUTH_SELECTION) {
				this.authProvider.set(null);
			}
		}
	}
	// endregion Auth Screen Navigation


	// region Email Auth Submission
	private submitEmailAuthentication(): void {
		const email = this.emailControl.value;
		const password = this.passwordControl.value;

		this.firebaseService.emailSignIn(email, password)
			.catch(console.error);
	}
	// endregion Email Auth Submission
}
