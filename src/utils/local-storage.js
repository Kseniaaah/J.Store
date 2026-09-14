export const getStoredValue = (key, fallback = null) => {
	const value = localStorage.getItem(key);

	if (!value) {
		return fallback;
	}

	try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
};

export const setStoredValue = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const removeStoredValue = (key) => {
	localStorage.removeItem(key);
};
