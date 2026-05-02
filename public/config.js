const defaultConfig = {
	WISP_URL: (location.protocol === "https:" ? "wss://" : "ws://") + location.host + "/wisp/",
};

if (typeof window !== "undefined") {
	var existingConfig = window._CONFIG && typeof window._CONFIG === "object" ? window._CONFIG : {};
	window._CONFIG = Object.assign({}, existingConfig, defaultConfig);
	window._CONFIG.WISP_URL = defaultConfig.WISP_URL;
	window.WISP_URL = defaultConfig.WISP_URL;
}

console.log(
	"%c[frosted]%c loaded config.js",
	[
		"background-color: #c8f3ff",
		"color: #0b6e99",
		"padding: 4px 6px",
		"border-radius: 4px",
		"font-weight: bold",
		"font-family: monospace",
		"font-size: 0.9em",
	].join("; "),
	"color: inherit;"
);
