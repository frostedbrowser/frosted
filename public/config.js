const sameOriginWispUrl =
	typeof window !== "undefined"
		? `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/wisp/`
		: "";
const preferredWispUrl = "wss://cdn.frostedbrowser.cfd/wisp/";

const defaultConfig = {
	WISP_URL: preferredWispUrl,
	WISP_FALLBACK_URL: sameOriginWispUrl,
};

if (typeof window !== "undefined") {
	var existingConfig = window._CONFIG && typeof window._CONFIG === "object" ? window._CONFIG : {};
	window._CONFIG = Object.assign({}, existingConfig, defaultConfig);
	window._CONFIG.WISP_URL = defaultConfig.WISP_URL;
	window._CONFIG.WISP_FALLBACK_URL = defaultConfig.WISP_FALLBACK_URL;
	window.WISP_URL = defaultConfig.WISP_URL;
}
