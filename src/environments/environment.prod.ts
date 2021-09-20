import packageInfo from 'package.json';
import { firebaseConfig } from 'src/environments/firebase-config';

export const environment = {
	production: true,
	version: packageInfo.version,
	firebaseConfig,
};
