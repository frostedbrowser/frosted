let _CONFIG = {
	ACCOUNT_API_BASE: "https://frosted-account-system.mrdavizss-v1.workers.dev",
	ACCOUNT_API_TIMEOUT_MS: 15000,
};

if (typeof window !== "undefined") {
	window._CONFIG = Object.assign({}, _CONFIG, window._CONFIG || {});
}
