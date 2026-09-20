import { moderatorCredentials } from '../data/moderator-credentials';
import { getStoredValue, removeStoredValue, setStoredValue } from './local-storage';

export const MODERATOR_AUTH_KEY = 'moderator-auth';

export const isModeratorAuthenticated = () =>
	getStoredValue(MODERATOR_AUTH_KEY, null)?.email === moderatorCredentials.email;

export const authenticateModerator = (email, password) => {
	if (
		email !== moderatorCredentials.email ||
		password !== moderatorCredentials.password
	) {
		return false;
	}

	setStoredValue(MODERATOR_AUTH_KEY, { email: moderatorCredentials.email });
	return true;
};

export const logoutModerator = () => removeStoredValue(MODERATOR_AUTH_KEY);
