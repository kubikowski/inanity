import { inject } from '@angular/core';
import { AnalyticsService } from 'src/app/core/browser/services/analytics.service';
import { AnimationFrameService } from 'src/app/core/browser/services/animation-frame.service';
import { FaviconService } from 'src/app/core/browser/services/favicon.service';
import { RouterService } from 'src/app/core/browser/services/router.service';
import { ScreenService } from 'src/app/core/browser/services/screen.service';
import { TitleService } from 'src/app/core/browser/services/title.service';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { DialogService } from 'src/app/core/dialogs/services/dialog.service';
import { FirebaseService } from 'src/app/core/firebase/services/firebase.service';
import { FirestoreService } from 'src/app/core/firebase/services/firestore.service';
import { UserAccountService } from 'src/app/core/firebase/services/user-account.service';
import { UserUpgradeService } from 'src/app/core/firebase/services/user-upgrade.service';
import { FontService } from 'src/app/core/fonts/services/font.service';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { HeaderService } from 'src/app/features/navigation/services/header.service';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

// region Core Services Definition
interface BrowserServices {
	readonly analyticsService: AnalyticsService;
	readonly animationFrameService: AnimationFrameService;
	readonly faviconService: FaviconService;
	readonly routerService: RouterService;
	readonly screenService: ScreenService;
	readonly titleService: TitleService;
}

interface FirebaseServices {
	readonly firebaseService: FirebaseService;
	readonly firestoreService: FirestoreService;
	readonly userAccountService: UserAccountService;
	readonly userUpgradeService: UserUpgradeService;
}

interface StylingServices {
	readonly colorsService: ColorsService;
	readonly fontService: FontService;
	readonly svgIconService: SvgIconService;
}

interface ComponentServices {
	readonly backgroundService: BackgroundService;
	readonly dialogService: DialogService;
	readonly headerService: HeaderService;
	readonly navigationService: NavigationService;
}

export type CoreServices =
	& BrowserServices
	& FirebaseServices
	& StylingServices
	& ComponentServices;
// endregion Core Services Definition


// region Core Services Injection
function injectBrowserServices(): BrowserServices {
	return {
		analyticsService: inject(AnalyticsService),
		animationFrameService: inject(AnimationFrameService),
		faviconService: inject(FaviconService),
		routerService: inject(RouterService),
		screenService: inject(ScreenService),
		titleService: inject(TitleService),
	};
}

function injectFirebaseServices(): FirebaseServices {
	return {
		firebaseService: inject(FirebaseService),
		firestoreService: inject(FirestoreService),
		userAccountService: inject(UserAccountService),
		userUpgradeService: inject(UserUpgradeService),
	};
}

function injectStylingServices(): StylingServices {
	return {
		colorsService: inject(ColorsService),
		fontService: inject(FontService),
		svgIconService: inject(SvgIconService),
	};
}

function injectComponentServices(): ComponentServices {
	return {
		backgroundService: inject(BackgroundService),
		dialogService: inject(DialogService),
		headerService: inject(HeaderService),
		navigationService: inject(NavigationService),
	};
}

export function injectCoreServices(): CoreServices {
	return {
		...injectBrowserServices(),
		...injectFirebaseServices(),
		...injectStylingServices(),
		...injectComponentServices(),
	};
}
// endregion Core Services Injection
