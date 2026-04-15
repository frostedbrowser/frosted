let _CONFIG = {
	WISP_URL: "",
	WISP_FALLBACK_URL: "wss://stellite.games/wisp/",
};

if (typeof window !== "undefined") {
	window._CONFIG = Object.assign({}, _CONFIG, window._CONFIG || {});
}
