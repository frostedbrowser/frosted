console.log(String.raw`
  ____              _         _    _     _ _
 |  _ \  ___  _ __ | |_   ___| | _(_) __| | |
 | | | |/ _ \| '_ \| __| / __| |/ / |/ _\` | |  _____
 | |_| | (_) | | | | |_  \__ \   <| | (_| |_| |_____|
 |____/ \___/|_| |_|\__| |___/_|\_\_|\__,_(_)
   __| | __ ___   _(_) __| |
  / _\` |/ _\` \ \ / / |/ _\` |
 | (_| | (_| |\ V /| | (_| |
  \__,_|\__,_| \_/ |_|\__,_|
`);

"use strict";
var qs = (sel) => document.querySelector(sel);
var qsa = (sel) => Array.from(document.querySelectorAll(sel));

var shellRefs = {
	tabsEl: qs("#tabs"),
	tabCounter: qs("#tabCounter"),
	newTabBtn: qs("#newTabBtn"),
	toolbarForm: qs("#toolbarForm"),
	homeForm: qs("#homeForm"),
	addressInput: qs("#addressInput"),
	partnershipBtn: qs("#partnershipBtn"),
	homeSearchInput: qs("#homeSearchInput"),
	backBtn: qs("#backBtn"),
	forwardBtn: qs("#forwardBtn"),
	reloadBtn: qs("#reloadBtn"),
	homeBtn: qs("#homeBtn"),
	wallpaperAppBtn: qs("#wallpaperAppBtn"),
	gamesBtn: qs("#gamesBtn"),
	aiBtn: qs("#aiBtn"),
	erudaBtn: qs("#erudaBtn"),
	adsToggleBtn: qs("#adsToggleBtn"),
	actionMenuBtn: qs("#actionMenuBtn"),
	actionMenu: qs("#actionMenu"),
	settingsBtn: qs("#settingsBtn"),
	blankState: qs("#blankState"),
	loadingBanner: qs("#loadingBanner"),
	browserStage: qs(".browser-stage"),
	searchEngine: qs("#sj-search-engine"),
	randomTagline: qs("#randomTagline"),
	historyContainer: qs("#historyContainer"),
	particlesLayer: qs("#particles-js"),
};

var pageRefs = {
	settingsPage: qs("#settingsPage"),
	creditsPage: qs("#creditsPage"),
	partnersPage: qs("#partnersPage"),
	gamesPage: qs("#gamesPage"),
	aiPage: qs("#aiPage"),
	extensionPage: qs("#extensionPage"),
	extensionStorePage: qs("#extensionStorePage"),
	gamesGrid: qs("#gamesGrid"),
	gamesCount: qs("#gamesCount"),
	gamesSearchInput: qs("#gamesSearchInput"),
	aiPromptInput: qs("#aiPromptInput"),
	aiSolveBtn: qs("#aiSolveBtn"),
	aiResult: qs("#aiResult"),
	aiModelSelect: qs("#aiModelSelect"),
	wallpaperExtensionEnabledToggle: qs("#wallpaperExtensionEnabledToggle"),
	wallpaperExtensionStatus: qs("#wallpaperExtensionStatus"),
	frostedWallpapersInstalledCount: qs("#frostedWallpapersInstalledCount"),
	wallpaperStoreStatus: qs("#wallpaperStoreStatus"),
	wallpaperStoreGrid: qs("#wallpaperStoreGrid"),
	wallpaperStoreTabInstalled: qs("#wallpaperStoreTabInstalled"),
	wallpaperStoreTabDiscover: qs("#wallpaperStoreTabDiscover"),
	wallpaperStoreTabStore: qs("#wallpaperStoreTabStore"),
	wallpaperStoreSearchInput: qs("#wallpaperStoreSearchInput"),
	wallpaperStoreExitBtn: qs("#wallpaperStoreExitBtn"),
	wallpaperStorePreviewTitle: qs("#wallpaperStorePreviewTitle"),
	wallpaperStorePreviewMeta: qs("#wallpaperStorePreviewMeta"),
	wallpaperStorePreviewMedia: qs("#wallpaperStorePreviewMedia"),
	wallpaperStoreInstallBtn: qs("#wallpaperStoreInstallBtn"),
	wallpaperStoreUninstallBtn: qs("#wallpaperStoreUninstallBtn"),
	wallpaperStoreApplyBtn: qs("#wallpaperStoreApplyBtn"),
	creditsLink: qs("#creditsLink"),
	wallpaperSelect: qs("#wallpaperSelect"),
};

var panicRefs = {
	currentPanicKey: qs("#current-panic-key"),
	changePanicKeyBtn: qs("#change-panic-key-btn"),
	listeningStatus: qs("#listening-status"),
	panicUrlInput: qs("#panic-url"),
	panicUrlSaveBtn: qs("#save-panic-btn"),
	panicNowBtn: qs("#panic-now-btn"),
	panicStatus: qs("#panic-status"),
	openModeAboutBtn: qs("#openModeAboutBtn"),
	openModeBlobBtn: qs("#openModeBlobBtn"),
	openModeStatus: qs("#openModeStatus"),
	autoBlobToggle: qs("#autoBlobToggle"),
	autoBlobStatus: qs("#autoBlobStatus"),
};

var cloakRefs = {
	cloakEnabledToggle: qs("#cloakEnabledToggle"),
	cloakTitleInput: qs("#cloak-title"),
	cloakFaviconInput: qs("#cloak-favicon"),
	cloakPresetSelect: qs("#cloakPresetSelect"),
	cloakTitleSaveBtn: qs("#save-cloak-title-btn"),
	cloakFaviconSaveBtn: qs("#save-cloak-favicon-btn"),
	cloakStatus: qs("#cloak-status"),
	faviconLink: document.querySelector("link[rel~='icon']"),
};

var errorRefs = {
	errorPanel: qs("#error-panel"),
	errorTitle: qs("#sj-error"),
	errorDetails: qs("#sj-error-code"),
};

var {
	tabsEl,
	tabCounter,
	newTabBtn,
	toolbarForm,
	homeForm,
	addressInput,
	partnershipBtn,
	homeSearchInput,
	backBtn,
	forwardBtn,
	reloadBtn,
	homeBtn,
	wallpaperAppBtn,
	gamesBtn,
	aiBtn,
	erudaBtn,
	adsToggleBtn,
	actionMenuBtn,
	actionMenu,
	settingsBtn,
	blankState,
	loadingBanner,
	browserStage,
	searchEngine,
	randomTagline,
	historyContainer,
	particlesLayer,
} = shellRefs;

var {
	settingsPage,
	creditsPage,
	partnersPage,
	gamesPage,
	aiPage,
	extensionPage,
	extensionStorePage,
	gamesGrid,
	gamesCount,
	gamesSearchInput,
	aiPromptInput,
	aiSolveBtn,
	aiResult,
	aiModelSelect,
	wallpaperExtensionEnabledToggle,
	wallpaperExtensionStatus,
	frostedWallpapersInstalledCount,
	wallpaperStoreStatus,
	wallpaperStoreGrid,
	wallpaperStoreTabInstalled,
	wallpaperStoreTabDiscover,
	wallpaperStoreTabStore,
	wallpaperStoreSearchInput,
	wallpaperStoreExitBtn,
	wallpaperStorePreviewTitle,
	wallpaperStorePreviewMeta,
	wallpaperStorePreviewMedia,
	wallpaperStoreInstallBtn,
	wallpaperStoreUninstallBtn,
	wallpaperStoreApplyBtn,
	creditsLink,
	wallpaperSelect,
} = pageRefs;

var {
	currentPanicKey,
	changePanicKeyBtn,
	listeningStatus,
	panicUrlInput,
	panicUrlSaveBtn,
	panicNowBtn,
	panicStatus,
	openModeAboutBtn,
	openModeBlobBtn,
	openModeStatus,
	autoBlobToggle,
	autoBlobStatus,
} = panicRefs;

var {
	cloakEnabledToggle,
	cloakTitleInput,
	cloakFaviconInput,
	cloakPresetSelect,
	cloakTitleSaveBtn,
	cloakFaviconSaveBtn,
	cloakStatus,
	faviconLink,
} = cloakRefs;

var { errorPanel, errorTitle, errorDetails } = errorRefs;

var { ScramjetController } = $scramjetLoadController();
var scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});
scramjet.init();

var connection = new BareMux.BareMuxConnection("/baremux/worker.js");

// App state and caches.
var tabs = [];
var activeTabId = null;
var nextTabId = 1;
var transportReady = false;
var tabFrames = new Map();
var frameLoadTimeoutIdByTab = new Map();
var suppressNextFrameNavSyncByTab = new Set();
var aiChatHistory = [];
var aiTypingRunId = 0;
var aiUiThread = [];
var gamesCatalog = [];
var gameBlobUrlsByTab = new Map();
var rawHtmlFallbackTriedUrlByTab = new Map();
var pendingGameClickScriptsByTab = new Map();
var canonicalGameUrlByTab = new Map();
var restoredGameProgressMarkerByTab = new Map();
var gameClickScriptDelayMs = 4200;

// Visual/particles state.
var particleCanvas = null;
var particleCtx = null;
var particleDots = [];
var matrixDrops = [];
var matrixFontSize = 14;
var particleMode = "dots";
var matrixGlyphs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-=<>[]{}()/\\|";
var particleFrameId = 0;
var particleResizeFrameId = 0;
var particleLastTs = 0;
var particleRgb = { r: 136, g: 192, b: 208 };
var particleAltRgb = { r: 129, g: 161, b: 193 };
var particleBgRgb = { r: 10, g: 15, b: 20 };
var ghosteryEngine = null;
var ghosteryRequestCtor = null;
var ghosteryEnginePromise = null;
var quickContextMenuEl = null;
var defaultAppIconHref =
	"https://raw.githubusercontent.com/mrdavidzs/assets/refs/heads/main/icons/frosted.png";

// Device/accessibility state.
var reducedMotionQuery = window.matchMedia
	? window.matchMedia("(prefers-reduced-motion: reduce)")
	: null;

var taglines = [
	"probably works as expected",
	"still loading... please wait",
	"not entirely sure why this works",
	"this might crash, but hopefully not",
	"one more update should do it",
	"seemed like a good idea at the time",
	"made with duct tape and optimism",
	"works on my machine",
	"zero bugs reported in the last minute",
	"refresh and believe",
	"engineering, but with vibes",
	"if it breaks, we call it a feature",
	"quietly overcomplicated",
	"new build, same chaos",
	"stability sold separately",
	"performance may vary by moon phase",
	"powered by caffeine and denial",
	"this banner is not legally binding",
	"it passed at least one test",
	"battle tested by accident",
	"less broken than yesterday",
	"loading confidence... please wait",
	"debug mode is a lifestyle",
	"almost production ready",
	"please clap",
	"still faster than the school chromebook",
	"crafted with questionable decisions",
	"hotfixes are just updates with attitude",
	"today's forecast: 70% chance of shipping",
];

var chromeBarConfig = {
	toolbarBg: "rgba(42, 68, 113, 0.78)",
	tabsBg: "rgba(22, 34, 58, 0.9)",
	addressBg: "rgba(12, 18, 31, 0.86)",
	buttonBg: "rgba(15, 23, 40, 0.74)",
	borderColor: "rgba(255, 255, 255, 0.12)",
	toolbarWidth: "clamp(460px, calc(100vw - 220px), 980px)",
	tabsMaxWidth: "calc(100vw - 300px)",
	toolbarBlur: "16px",
	tabsBlur: "14px",
	buttonSize: "30px",
	barRadius: "999px",
	rowGap: "0.45rem",
};

function applyChromeBarConfig(config = chromeBarConfig) {
	var root = document.documentElement;
	root.style.setProperty("--chrome-toolbar-bg", String(config.toolbarBg || "").trim());
	root.style.setProperty("--chrome-tabs-bg", String(config.tabsBg || "").trim());
	root.style.setProperty("--chrome-address-bg", String(config.addressBg || "").trim());
	root.style.setProperty("--chrome-button-bg", String(config.buttonBg || "").trim());
	root.style.setProperty("--chrome-border-color", String(config.borderColor || "").trim());
	root.style.setProperty("--chrome-toolbar-width", String(config.toolbarWidth || "").trim());
	root.style.setProperty("--chrome-tabs-max-width", String(config.tabsMaxWidth || "").trim());
	root.style.setProperty("--chrome-toolbar-blur", String(config.toolbarBlur || "").trim());
	root.style.setProperty("--chrome-tabs-blur", String(config.tabsBlur || "").trim());
	root.style.setProperty("--chrome-button-size", String(config.buttonSize || "").trim());
	root.style.setProperty("--chrome-bar-radius", String(config.barRadius || "").trim());
	root.style.setProperty("--chrome-row-gap", String(config.rowGap || "").trim());
}

function init() {
	applyChromeBarConfig();
	updateAdblockToggleLabel();
	void ensureGhosteryEngine();
	loadInstalledExtensionWallpapers();

	if (randomTagline) {
		randomTagline.textContent = taglines[Math.floor(Math.random() * taglines.length)];
	}

	populateWallpaperOptions();
	loadWallpaper();
	initParticles();
	loadPanicSettings();
	loadOpenModeSettings();
	loadAutoBlobSettings();
	loadCloakSettings();
	applyCloakVisualState(document.hidden || !document.hasFocus());
	runStartupBrandSequence();
	loadAiMode();
	createTab("");
	bindEvents();
	renderHistory();
	void loadGamesCatalog();
	void loadWallpaperStoreCatalog();
}

var startupBrandTitle = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
var startupBrandFaviconHref = "ixl.ico";
var startupBrandDurationMs = 120;
var autoOpenBlobAfterStartup = true;
var autoOpenBlobDelayMs = 180;
var autoOpenBlobSessionKey = "fb_auto_blob_done";
var autoBlobEnabledStorage = "fb_auto_blob_enabled";

function runStartupBrandSequence() {
	document.title = startupBrandTitle;
	setDocumentFavicon(`${startupBrandFaviconHref}?startup=1`);

	setTimeout(() => {
		applyCloakVisualState(document.hidden || !document.hasFocus());
		maybeAutoOpenBlobAfterStartup();
	}, startupBrandDurationMs);
}

function maybeAutoOpenBlobAfterStartup() {
	if (!autoOpenBlobAfterStartup || !isAutoBlobEnabled()) return;
	try {
		if (window.top && window.top !== window) return;
	} catch {
		return;
	}
	try {
		if (sessionStorage.getItem(autoOpenBlobSessionKey) === "1") return;
		sessionStorage.setItem(autoOpenBlobSessionKey, "1");
	} catch {
	}
	setTimeout(() => {
		openCurrentPageInMode("blob");
	}, autoOpenBlobDelayMs);
}

function isAutoBlobEnabled() {
	var raw = String(localStorage.getItem(autoBlobEnabledStorage) || "").trim().toLowerCase();
	if (raw === "true") return true;
	if (raw === "false") return false;
	return autoOpenBlobAfterStartup;
}

function updateAutoBlobStatusText() {
	if (!autoBlobStatus) return;
	autoBlobStatus.textContent = `Auto Blob on startup: ${
		isAutoBlobEnabled() ? "enabled" : "disabled"
	}`;
}

function loadAutoBlobSettings() {
	var enabled = isAutoBlobEnabled();
	if (autoBlobToggle) autoBlobToggle.checked = enabled;
	updateAutoBlobStatusText();
}

var settingsInternalUrl = "frosted://settings";
var creditsInternalUrl = "frosted://credits";
var gamesInternalUrl = "frosted://games";
var aiInternalUrl = "frosted://ai";
var partnersInternalUrl = "frosted://partners";
var wallpapersInternalUrl = "frosted://wallpapers";
var aiModeKey = "fb_ai_mode";

function bindEvents() {
	newTabBtn.addEventListener("click", () => createTab(""));
	toolbarForm.addEventListener("submit", (e) => {
		e.preventDefault();
		navigateFromInput(addressInput.value);
	});
	if (partnershipBtn) {
		partnershipBtn.addEventListener("click", () => {
			navigateFromInput(partnersInternalUrl);
		});
	}
	if (actionMenuBtn && actionMenu) {
		var closeActionMenu = () => {
			actionMenu.classList.remove("open");
			actionMenuBtn.setAttribute("aria-expanded", "false");
		};
		var toggleActionMenu = () => {
			var open = actionMenu.classList.toggle("open");
			actionMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
		};
		actionMenuBtn.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			toggleActionMenu();
		});
		actionMenu.addEventListener("click", () => {
			closeActionMenu();
		});
		document.addEventListener("click", (event) => {
			if (!actionMenu.classList.contains("open")) return;
			if (actionMenu.contains(event.target) || actionMenuBtn.contains(event.target)) return;
			closeActionMenu();
		});
		window.addEventListener("keydown", (event) => {
			if (event.key === "Escape") closeActionMenu();
		});
	}
	bindQuickContextMenu();
	homeForm.addEventListener("submit", (e) => {
		e.preventDefault();
		navigateFromInput(homeSearchInput.value);
	});

	backBtn.addEventListener("click", goBack);
	forwardBtn.addEventListener("click", goForward);
	reloadBtn.addEventListener("click", reloadActive);
	homeBtn.addEventListener("click", goHome);

	gamesBtn.addEventListener("click", () => navigateFromInput(gamesInternalUrl));
	if (wallpaperAppBtn) {
		wallpaperAppBtn.addEventListener("click", () => navigateFromInput(wallpapersInternalUrl));
		wallpaperAppBtn.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			navigateFromInput(wallpapersInternalUrl);
		});
	}
	aiBtn.addEventListener("click", () => navigateFromInput(aiInternalUrl));
	if (erudaBtn) {
		erudaBtn.addEventListener("click", injectErudaIntoActiveTab);
	}
	if (adsToggleBtn) {
		adsToggleBtn.addEventListener("click", toggleAdblock);
	}
	settingsBtn.addEventListener("click", () => navigateFromInput(settingsInternalUrl));
	if (creditsLink) {
		creditsLink.addEventListener("click", (event) => {
			event.preventDefault();
			navigateFromInput(creditsInternalUrl);
		});
	}

	qsa(".home-tile").forEach((tile) => {
		tile.addEventListener("click", () => {
			if (tile.dataset.url) navigateFromInput(tile.dataset.url);
		});
	});

	if (wallpaperExtensionEnabledToggle) {
		wallpaperExtensionEnabledToggle.addEventListener("change", () => {
			setWallpaperExtensionEnabled(Boolean(wallpaperExtensionEnabledToggle.checked));
		});
	}
	if (wallpaperStoreTabInstalled) {
		wallpaperStoreTabInstalled.addEventListener("click", () => {
			setWallpaperStoreView("installed");
		});
	}
	if (wallpaperStoreTabDiscover) {
		wallpaperStoreTabDiscover.addEventListener("click", () => {
			setWallpaperStoreView("discover");
		});
	}
	if (wallpaperStoreTabStore) {
		wallpaperStoreTabStore.addEventListener("click", () => {
			setWallpaperStoreView("store");
		});
	}
	if (wallpaperStoreSearchInput) {
		wallpaperStoreSearchInput.addEventListener("input", () => {
			wallpaperStoreQuery = String(wallpaperStoreSearchInput.value || "").trim().toLowerCase();
			renderWallpaperStoreGrid();
		});
	}
	if (wallpaperStoreExitBtn) {
		wallpaperStoreExitBtn.addEventListener("click", () => {
			goHome();
		});
	}
	if (wallpaperStoreInstallBtn) {
		wallpaperStoreInstallBtn.addEventListener("click", () => {
			var selected = getSelectedWallpaperStoreEntry();
			if (!selected) return;
			if (!isWallpaperExtensionEnabled()) return;
			installWallpaperFromStore(selected);
		});
	}
	if (wallpaperStoreUninstallBtn) {
		wallpaperStoreUninstallBtn.addEventListener("click", () => {
			var selected = getSelectedWallpaperStoreEntry();
			if (!selected) return;
			if (!isWallpaperExtensionEnabled()) return;
			uninstallWallpaperFromStore(selected);
		});
	}
	if (wallpaperStoreApplyBtn) {
		wallpaperStoreApplyBtn.addEventListener("click", () => {
			var selected = getSelectedWallpaperStoreEntry();
			if (!selected) return;
			if (!isWallpaperExtensionEnabled()) return;
			if (!isStoreWallpaperInstalled(selected.key)) return;
			if (wallpaperStoreView !== "installed") return;
			applyWallpaper(selected.key);
		});
	}

	if (wallpaperSelect) {
		wallpaperSelect.addEventListener("change", () => {
			applyWallpaper(wallpaperSelect.value);
		});
	}

	changePanicKeyBtn.addEventListener("click", listenForPanicKey);
	panicUrlSaveBtn.addEventListener("click", savePanicUrl);
	if (panicNowBtn) {
		panicNowBtn.addEventListener("click", () => {
			setOpenMode("aboutblank", true);
		});
	}
	if (openModeAboutBtn) {
		openModeAboutBtn.addEventListener("click", () => {
			setOpenMode("aboutblank", true);
		});
	}
	if (openModeBlobBtn) {
		openModeBlobBtn.addEventListener("click", () => {
			setOpenMode("blob", true);
		});
	}
	if (autoBlobToggle) {
		autoBlobToggle.addEventListener("change", () => {
			localStorage.setItem(autoBlobEnabledStorage, autoBlobToggle.checked ? "true" : "false");
			updateAutoBlobStatusText();
		});
	}

	if (aiSolveBtn) {
		aiSolveBtn.addEventListener("click", solveAiPrompt);
	}
	if (aiPromptInput) {
		aiPromptInput.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				solveAiPrompt();
			}
		});
	}
	if (aiModelSelect) {
		aiModelSelect.addEventListener("change", () => {
			localStorage.setItem(aiModeKey, aiModelSelect.value || "auto");
		});
	}
	if (gamesSearchInput) {
		gamesSearchInput.addEventListener("input", () => {
			renderGames();
		});
	}
	if (cloakEnabledToggle) {
		cloakEnabledToggle.addEventListener("change", () => {
			localStorage.setItem(cloakEnabledStorage, cloakEnabledToggle.checked ? "true" : "false");
			applyCloakVisualState(document.hidden || !document.hasFocus());
			setCloakStatus(cloakEnabledToggle.checked ? "Cloak enabled." : "Cloak disabled.");
		});
	}
	if (cloakTitleSaveBtn) {
		cloakTitleSaveBtn.addEventListener("click", saveCloakTitle);
	}
	if (cloakFaviconSaveBtn) {
		cloakFaviconSaveBtn.addEventListener("click", saveCloakFavicon);
	}
	if (cloakPresetSelect) {
		cloakPresetSelect.addEventListener("change", () => {
			var value = String(cloakPresetSelect.value || "custom");
			if (value === "custom") return;
			applyCloakPreset(value);
		});
	}
	document.addEventListener("visibilitychange", () => {
		applyCloakVisualState(document.hidden || !document.hasFocus());
	});
	window.addEventListener("blur", () => {
		applyCloakVisualState(true);
	});
	window.addEventListener("focus", () => {
		applyCloakVisualState(document.hidden || !document.hasFocus());
	});
	if (reducedMotionQuery) {
		reducedMotionQuery.addEventListener("change", restartParticlesAnimation);
	}

	window.addEventListener(
		"keydown",
		(event) => {
			if (isListeningForKey) return;
			if (ignoreNextPanicPress) {
				ignoreNextPanicPress = false;
				return;
			}
			if (isTypingTarget(event.target)) return;
			if (panicKeyMatches(event)) {
				event.preventDefault();
				navigateToPanicUrl();
			}
		},
		true
	);
}

function initParticles() {
	if (!particlesLayer || !browserStage) return;
	if (particlesLayer.parentElement !== browserStage) {
		browserStage.appendChild(particlesLayer);
	} else if (particlesLayer !== browserStage.lastElementChild) {
		browserStage.appendChild(particlesLayer);
	}
	particleCanvas = document.createElement("canvas");
	particleCanvas.className = "particles-canvas";
	particlesLayer.appendChild(particleCanvas);
	particleCtx = particleCanvas.getContext("2d");
	if (!particleCtx) return;
	updateParticleColorFromTheme();
	resizeParticles();
	startParticlesAnimation();
	window.addEventListener("resize", queueParticlesResize, { passive: true });
	document.addEventListener("visibilitychange", onParticlesVisibilityChange);
}

function onParticlesVisibilityChange() {
	if (document.hidden) {
		stopParticlesAnimation();
		return;
	}
	startParticlesAnimation();
}

function queueParticlesResize() {
	if (particleResizeFrameId) cancelAnimationFrame(particleResizeFrameId);
	particleResizeFrameId = requestAnimationFrame(() => {
		particleResizeFrameId = 0;
		resizeParticles();
	});
}

function resizeParticles() {
	if (!particleCanvas || !particleCtx || !particlesLayer) return;
	var width = Math.max(1, Math.floor(particlesLayer.clientWidth || window.innerWidth));
	var height = Math.max(1, Math.floor(particlesLayer.clientHeight || window.innerHeight));
	var dpr = Math.min(window.devicePixelRatio || 1, 2);
	particleCanvas.width = Math.floor(width * dpr);
	particleCanvas.height = Math.floor(height * dpr);
	particleCanvas.style.width = `${width}px`;
	particleCanvas.style.height = `${height}px`;
	particleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
	if (particleMode === "matrix") {
		seedMatrixRain(width, height);
	} else {
		seedParticles(width, height);
	}
	drawParticles();
}

function seedParticles(width, height) {
	var area = width * height;
	var count = Math.max(34, Math.min(92, Math.round(area / 17000)));
	particleDots = Array.from({ length: count }, () => ({
		x: Math.random() * width,
		y: Math.random() * height,
		vx: (Math.random() - 0.5) * 0.18,
		vy: (Math.random() - 0.5) * 0.18,
		radius: 0.8 + Math.random() * 2.2,
		alpha: 0.44 + Math.random() * 0.5,
		twinkleOffset: Math.random() * Math.PI * 2,
		twinkleSpeed: 0.3 + Math.random() * 0.9,
		colorMix: Math.random(),
	}));
}

function seedMatrixRain(width, height) {
	matrixFontSize = Math.max(10, Math.min(14, Math.round(width / 150)));
	var columns = Math.max(1, Math.floor(width / matrixFontSize));
	matrixDrops = Array.from({ length: columns }, () => Math.random() * height);
}

function startParticlesAnimation() {
	if (!particleCtx || !particleCanvas || document.hidden) return;
	stopParticlesAnimation();
	particleLastTs = 0;
	if (reducedMotionQuery?.matches && particleMode !== "matrix") {
		drawParticles();
		return;
	}
	particleFrameId = requestAnimationFrame(tickParticles);
}

function restartParticlesAnimation() {
	startParticlesAnimation();
}

function stopParticlesAnimation() {
	if (!particleFrameId) return;
	cancelAnimationFrame(particleFrameId);
	particleFrameId = 0;
}

function setParticlesVisible(visible) {
	if (!particlesLayer) return;
	particlesLayer.style.display = visible ? "block" : "none";
	if (visible) {
		startParticlesAnimation();
		return;
	}
	stopParticlesAnimation();
}

function shouldShowParticlesForCurrentView() {
	var matrixActive = isMatrixThemeActive();
	var onBlank = blankState?.style.display === "flex";
	var onInternal =
		settingsPage?.classList.contains("active") ||
		gamesPage?.classList.contains("active") ||
		aiPage?.classList.contains("active") ||
		partnersPage?.classList.contains("active") ||
		creditsPage?.classList.contains("active") ||
		extensionPage?.classList.contains("active") ||
		extensionStorePage?.classList.contains("active");
	if (onBlank) return true;
	if (onInternal) return matrixActive;
	return false;
}

function tickParticles(ts) {
	if (!particleCtx || !particleCanvas) return;
	if (!particleLastTs) particleLastTs = ts;
	var dt = Math.min(32, ts - particleLastTs);
	particleLastTs = ts;
	var width = parseFloat(particleCanvas.style.width) || window.innerWidth;
	var height = parseFloat(particleCanvas.style.height) || window.innerHeight;
	var speedBase = dt / 16.666;
	var speed = reducedMotionQuery?.matches && particleMode === "matrix" ? speedBase * 0.45 : speedBase;
	var t = ts / 1000;

	if (particleMode === "matrix") {
		drawMatrixRain(width, height, speed);
		particleFrameId = requestAnimationFrame(tickParticles);
		return;
	}

	for (var dot of particleDots) {
		dot.x += dot.vx * speed;
		dot.y += dot.vy * speed;
		dot.currentAlpha = Math.min(
			1,
			Math.max(0.34, dot.alpha + Math.sin(t * dot.twinkleSpeed + dot.twinkleOffset) * 0.14)
		);
		if (dot.x < -4) dot.x = width + 4;
		if (dot.x > width + 4) dot.x = -4;
		if (dot.y < -4) dot.y = height + 4;
		if (dot.y > height + 4) dot.y = -4;
	}

	drawParticles();
	particleFrameId = requestAnimationFrame(tickParticles);
}

function drawParticles() {
	if (!particleCtx || !particleCanvas) return;
	var width = parseFloat(particleCanvas.style.width) || window.innerWidth;
	var height = parseFloat(particleCanvas.style.height) || window.innerHeight;

	if (particleMode === "matrix") {
		particleCtx.fillStyle = `rgba(${particleBgRgb.r}, ${particleBgRgb.g}, ${particleBgRgb.b}, 1)`;
		particleCtx.fillRect(0, 0, width, height);
		drawMatrixRain(width, height, 0);
		return;
	}

	particleCtx.clearRect(0, 0, width, height);
	for (var dot of particleDots) {
		particleCtx.beginPath();
		particleCtx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
		var mix = dot.colorMix;
		var r = Math.round(particleRgb.r * (1 - mix) + particleAltRgb.r * mix);
		var g = Math.round(particleRgb.g * (1 - mix) + particleAltRgb.g * mix);
		var b = Math.round(particleRgb.b * (1 - mix) + particleAltRgb.b * mix);
		particleCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.currentAlpha ?? dot.alpha})`;
		particleCtx.shadowBlur = 14;
		particleCtx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.72)`;
		particleCtx.fill();
	}
	particleCtx.shadowBlur = 0;
}

function drawMatrixRain(width, height, speed) {
	if (!particleCtx || !matrixDrops.length) return;
	particleCtx.fillStyle = `rgba(${particleBgRgb.r}, ${particleBgRgb.g}, ${particleBgRgb.b}, 0.13)`;
	particleCtx.fillRect(0, 0, width, height);
	particleCtx.font = `${matrixFontSize}px "JetBrains Mono", monospace`;
	particleCtx.textBaseline = "top";
	particleCtx.shadowBlur = 9;
	particleCtx.shadowColor = `rgba(${particleRgb.r}, ${particleRgb.g}, ${particleRgb.b}, 0.62)`;

	for (var i = 0; i < matrixDrops.length; i++) {
		var x = i * matrixFontSize;
		var y = matrixDrops[i];
		var mix = (i % 5) / 4;
		var r = Math.round(particleRgb.r * (1 - mix) + particleAltRgb.r * mix);
		var g = Math.round(particleRgb.g * (1 - mix) + particleAltRgb.g * mix);
		var b = Math.round(particleRgb.b * (1 - mix) + particleAltRgb.b * mix);
		var trail = 11 + (i % 10);
		for (var t = trail; t >= 0; t--) {
			var ty = y - t * matrixFontSize;
			if (ty < -matrixFontSize || ty > height + matrixFontSize) continue;
			var char = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
			var alpha = Math.max(0.1, 0.9 - t * 0.07);
			particleCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
			particleCtx.fillText(char, x, ty);
		}
		var headChar = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
		particleCtx.fillStyle = "rgba(230, 255, 238, 0.95)";
		particleCtx.fillText(headChar, x, y - matrixFontSize * 0.82);
		particleCtx.fillStyle = "rgba(194, 255, 212, 0.58)";
		particleCtx.fillText(headChar, x, y - matrixFontSize * 1.62);

		matrixDrops[i] += (1 + Math.random() * 0.95) * matrixFontSize * 0.1 * speed * 10;
		if (matrixDrops[i] > height + Math.random() * 180) {
			matrixDrops[i] = -Math.random() * (height * 0.55);
		}
	}

	particleCtx.shadowBlur = 0;
}

function isMatrixThemeActive() {
	return false;
}

function updateParticleColorFromTheme() {
	var style = getComputedStyle(document.documentElement);
	var teamColor = style.getPropertyValue("--team-color-1").trim() || "#88c0d0";
	var teamColorAlt = style.getPropertyValue("--team-color-2").trim() || "#81a1c1";
	var bgColor = style.getPropertyValue("--bg").trim() || "#0a0f14";
	particleRgb = parseHexToRgb(teamColor) || { r: 136, g: 192, b: 208 };
	particleAltRgb = parseHexToRgb(teamColorAlt) || { r: 129, g: 161, b: 193 };
	particleBgRgb = parseHexToRgb(bgColor) || { r: 10, g: 15, b: 20 };
	var nextMode = isMatrixThemeActive() ? "matrix" : "dots";
	document.body.classList.toggle("matrix-theme-active", nextMode === "matrix");
	if (nextMode !== particleMode) {
		particleMode = nextMode;
		resizeParticles();
		restartParticlesAnimation();
	}
	setParticlesVisible(shouldShowParticlesForCurrentView());
}

function parseHexToRgb(value) {
	var raw = String(value || "").trim().replace("#", "");
	if (!/^[0-9a-fA-F]{6}$/.test(raw)) return null;
	return {
		r: parseInt(raw.slice(0, 2), 16),
		g: parseInt(raw.slice(2, 4), 16),
		b: parseInt(raw.slice(4, 6), 16),
	};
}

function createTab(url) {
	var tab = {
		id: `tab_${nextTabId++}`,
		title: "New Tab",
		url: url || "",
		backStack: [],
		forwardStack: [],
	};
	tabs.push(tab);
	setActiveTab(tab.id, false);
	renderTabs();
}

function destroyTabFrame(tabId) {
	var pendingTimeout = frameLoadTimeoutIdByTab.get(tabId);
	if (pendingTimeout) {
		clearTimeout(pendingTimeout);
		frameLoadTimeoutIdByTab.delete(tabId);
	}
	var frame = tabFrames.get(tabId);
	if (!frame) return;
	try {
		frame.element.src = "about:blank";
	} catch {
	}
	frame.element.remove();
	tabFrames.delete(tabId);
	suppressNextFrameNavSyncByTab.delete(tabId);
}

function closeTab(id) {
	var idx = tabs.findIndex((t) => t.id === id);
	if (idx === -1) return;
	var [removed] = tabs.splice(idx, 1);
	var oldGameBlob = gameBlobUrlsByTab.get(removed.id);
	if (oldGameBlob) {
		URL.revokeObjectURL(oldGameBlob);
		gameBlobUrlsByTab.delete(removed.id);
	}
	rawHtmlFallbackTriedUrlByTab.delete(removed.id);
	canonicalGameUrlByTab.delete(removed.id);
	restoredGameProgressMarkerByTab.delete(removed.id);
	destroyTabFrame(removed.id);

	if (!tabs.length) {
		createTab("");
		return;
	}
	if (activeTabId === id) {
		var next = tabs[Math.max(0, idx - 1)];
		setActiveTab(next.id, true);
	}
	renderTabs();
}

function setActiveTab(id, keepView) {
	activeTabId = id;
	var tab = getActiveTab();
	if (!tab) return;

	if (!tab.url) {
		addressInput.value = "";
		homeSearchInput.value = "";
		showBlank();
	} else if (isSettingsInternalUrl(tab.url)) {
		showSettingsPage();
	} else if (isGamesInternalUrl(tab.url)) {
		showGamesPage();
	} else if (isAiInternalUrl(tab.url)) {
		showAiPage();
	} else if (isPartnersInternalUrl(tab.url)) {
		showPartnersPage();
	} else if (isExtensionInternalUrl(tab.url) || isExtensionStoreInternalUrl(tab.url)) {
		showExtensionStorePage();
	} else if (isCreditsInternalUrl(tab.url)) {
		showCreditsPage();
	} else {
		showFrameForTab(id);
		hideInternalPages();
		addressInput.value = tab.url;
		homeSearchInput.value = tab.url;
	}

	renderTabs();
	updateNavButtons();
}

function renderTabs() {
	tabsEl.innerHTML = "";
	tabs.forEach((tab) => {
		var node = document.createElement("div");
		node.className = `tab${tab.id === activeTabId ? " active" : ""}`;
		node.dataset.tabId = tab.id;

		var favicon = document.createElement("img");
		favicon.className = "tab-favicon";
		favicon.alt = "";
		var faviconCandidates = getTabFaviconCandidates(tab.url);
		var faviconIdx = 0;
		favicon.src = faviconCandidates[faviconIdx];
		favicon.loading = "lazy";
		favicon.decoding = "async";
		favicon.addEventListener("error", () => {
			faviconIdx += 1;
			if (faviconIdx < faviconCandidates.length) {
				favicon.src = faviconCandidates[faviconIdx];
			}
		});
		node.appendChild(favicon);

		var title = document.createElement("span");
		title.className = "tab-title";
		title.textContent = tab.title || "New Tab";
		node.appendChild(title);

		var close = document.createElement("button");
		close.className = "tab-close";
		close.type = "button";
		close.textContent = "x";
		close.addEventListener("click", (event) => {
			event.stopPropagation();
			closeTab(tab.id);
		});
		node.appendChild(close);
		node.addEventListener("click", () => setActiveTab(tab.id, true));
		tabsEl.appendChild(node);
	});
	if (tabCounter) tabCounter.textContent = String(tabs.length);
	var widthTabCount = Math.min(Math.max(tabs.length, 1), 10);
	var tabsRowEl = tabsEl.closest(".tabs-row");
	if (tabsRowEl) {
		tabsRowEl.style.setProperty("--tab-count-for-width", String(widthTabCount));
	}
}

function getTabFaviconCandidates(url) {
	if (!url) return [defaultAppIconHref];
	if (
		isSettingsInternalUrl(url) ||
		isCreditsInternalUrl(url) ||
		isPartnersInternalUrl(url) ||
		isExtensionInternalUrl(url) ||
		isExtensionStoreInternalUrl(url)
	)
		return [defaultAppIconHref];
	if (isGamesInternalUrl(url)) return [defaultAppIconHref];
	if (isAiInternalUrl(url)) return ["chatgpt-logo.svg"];
	try {
		var host = new URL(url).hostname;
		if (!host) return [defaultAppIconHref];
		return [
			`https://${host}/favicon.ico`,
			`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`,
			`https://icons.duckduckgo.com/ip3/${encodeURIComponent(host)}.ico`,
			defaultAppIconHref,
		];
	} catch {
		return [defaultAppIconHref];
	}
}

function getActiveTab() {
	return tabs.find((tab) => tab.id === activeTabId) || null;
}

function getDisplayTitle(url) {
	if (!url) return "New Tab";
	if (isSettingsInternalUrl(url)) return "Settings";
	if (isPartnersInternalUrl(url)) return "Partners";
	if (isGamesInternalUrl(url)) return "Games";
	if (isAiInternalUrl(url)) return "AI";
	if (isExtensionInternalUrl(url) || isExtensionStoreInternalUrl(url)) return "Wallpapers";
	if (isCreditsInternalUrl(url)) return "Credits";
	try {
		var parsed = new URL(url);
		return parsed.hostname.slice(0, 24);
	} catch {
		return url.slice(0, 24);
	}
}

function normalizeInput(input) {
	if (!input || !searchEngine) return "";
	var raw = normalizeInternalScheme(String(input).trim());
	if (isSettingsInternalUrl(raw)) return settingsInternalUrl;
	if (isPartnersInternalUrl(raw)) return partnersInternalUrl;
	if (isGamesInternalUrl(raw)) return gamesInternalUrl;
	if (isAiInternalUrl(raw)) return aiInternalUrl;
	if (isExtensionInternalUrl(raw) || isExtensionStoreInternalUrl(raw)) return wallpapersInternalUrl;
	if (isCreditsInternalUrl(raw)) return creditsInternalUrl;
	return search(raw, searchEngine.value);
}

async function navigateFromInput(input, pushHistory = true) {
	var target = normalizeInput(input);
	if (!target) return;
	await loadUrl(target, pushHistory);
}

var adblockHostPatterns = [
	// Ads
	/(^|\.)doubleclick\.net$/i,
	/(^|\.)googlesyndication\.com$/i,
	/(^|\.)googleadservices\.com$/i,
	/(^|\.)adservice\.google\./i,
	/(^|\.)media\.net$/i,
	/(^|\.)contextweb\.com$/i,
	/(^|\.)fastclick\.net$/i,
	/(^|\.)amazon-adsystem\.com$/i,

	// Analytics
	/(^|\.)googletagmanager\.com$/i,
	/(^|\.)google-analytics\.com$/i,
	/(^|\.)analytics\.google\.com$/i,
	/(^|\.)hotjar\.com$/i,
	/(^|\.)hotjar\.io$/i,
	/(^|\.)mouseflow\.com$/i,
	/(^|\.)freshmarketer\.com$/i,
	/(^|\.)luckyorange\.com$/i,
	/(^|\.)stats\.wp\.com$/i,

	// Error trackers
	/(^|\.)bugsnag\.com$/i,
	/(^|\.)sentry\.io$/i,

	// Social trackers
	/(^|\.)facebook\.com$/i,
	/(^|\.)fbcdn\.net$/i,
	/(^|\.)twitter\.com$/i,
	/(^|\.)twimg\.com$/i,
	/(^|\.)t\.co$/i,
	/(^|\.)linkedin\.com$/i,
	/(^|\.)licdn\.com$/i,
	/(^|\.)pinterest\.com$/i,
	/(^|\.)pinimg\.com$/i,
	/(^|\.)reddit\.com$/i,
	/(^|\.)redditmedia\.com$/i,
	/(^|\.)youtube\.com$/i,
	/(^|\.)ytimg\.com$/i,
	/(^|\.)googlevideo\.com$/i,
	/(^|\.)tiktok\.com$/i,
	/(^|\.)tiktokcdn\.com$/i,
	/(^|\.)byteoversea\.com$/i,

	// Mix
	/(^|\.)yahoo\.com$/i,
	/(^|\.)yimg\.com$/i,
	/(^|\.)yandex\./i,

	// OEM ad / telemetry ecosystems
	/(^|\.)xiaomi\./i,
	/(^|\.)miui\.com$/i,
	/(^|\.)mistat\.xiaomi\.com$/i,
	/(^|\.)ad\.xiaomi\.com$/i,
	/(^|\.)hicloud\.com$/i,
	/(^|\.)data\.hicloud\.com$/i,
	/(^|\.)huawei\.com$/i,
	/(^|\.)oneplus\./i,
	/(^|\.)samsungads\.com$/i,
	/(^|\.)samsung\.com$/i,
	/(^|\.)metrics\.apple\.com$/i,
	/(^|\.)securemetrics\.apple\.com$/i,
	/(^|\.)supportmetrics\.apple\.com$/i,
	/(^|\.)metrics\.icloud\.com$/i,
	/(^|\.)metrics\.mzstatic\.com$/i,

	// Existing broad ad/tracker nets
	/(^|\.)taboola\.com$/i,
	/(^|\.)outbrain\.com$/i,
	/(^|\.)criteo\.com$/i,
	/(^|\.)adsrvr\.org$/i,
	/(^|\.)scorecardresearch\.com$/i,
];

var adblockUrlPatterns = [
	/\/ads?(\/|\.|\?|$)/i,
	/\/adserver/i,
	/advert/i,
	/analytics/i,
	/tracker/i,
	/pixel/i,
	/beacon/i,
	/prebid/i,
	/sentry/i,
	/bugsnag/i,
	/hotjar/i,
	/mouseflow/i,
	/luckyorange/i,
	/freshmarketer/i,
	/metrics\d*\.data\.hicloud\.com/i,
	/mistat\./i,
	/sdkconfig\.ad\./i,
	/metrics\.apple\.com/i,
	/securemetrics\.apple\.com/i,
	/supportmetrics\.apple\.com/i,
	/metrics\.icloud\.com/i,
	/metrics\.mzstatic\.com/i,
];

var adblockEnabledStorage = "fb_adblock_enabled";

function isAdblockEnabled() {
	var raw = localStorage.getItem(adblockEnabledStorage);
	if (raw === null) {
		localStorage.setItem(adblockEnabledStorage, "true");
		return true;
	}
	return String(raw).toLowerCase() === "true";
}

function setAdblockEnabled(enabled) {
	localStorage.setItem(adblockEnabledStorage, enabled ? "true" : "false");
	updateAdblockToggleLabel();
}

function updateAdblockToggleLabel() {
	if (!adsToggleBtn) return;
	var enabled = isAdblockEnabled();
	adsToggleBtn.textContent = enabled ? "ads: off" : "ads: on";
	adsToggleBtn.setAttribute("aria-pressed", enabled ? "true" : "false");
	adsToggleBtn.title = enabled
		? "Ad blocker is enabled (ads are off)"
		: "Ad blocker is disabled (ads are on)";
}

function toggleAdblock() {
	setAdblockEnabled(!isAdblockEnabled());
	if (isAdblockEnabled()) void ensureGhosteryEngine();
}

async function ensureGhosteryEngine() {
	if (ghosteryEngine) return ghosteryEngine;
	if (ghosteryEnginePromise) return ghosteryEnginePromise;

	ghosteryEnginePromise = (async () => {
		try {
			var mod = null;
			var moduleCandidates = [
				// Browser-bundled module (no bare package specifiers).
				"https://esm.sh/@ghostery/adblocker?bundle",
				// Legacy local path fallback (works only if pre-bundled in this project).
				"/vendor/adblocker/index.js",
			];
			var lastError = null;
			for (var candidate of moduleCandidates) {
				try {
					mod = await import(candidate);
					if (mod) break;
				} catch (error) {
					lastError = error;
				}
			}
			if (!mod) {
				throw lastError || new Error("Unable to load Ghostery adblocker module.");
			}
			var FiltersEngine = mod?.FiltersEngine;
			var RequestCtor = mod?.Request;
			if (!FiltersEngine || !RequestCtor) {
				throw new Error("Ghostery adblocker exports were not found.");
			}
			ghosteryRequestCtor = RequestCtor;
			ghosteryEngine = await FiltersEngine.fromPrebuiltAdsAndTracking(window.fetch.bind(window));
			return ghosteryEngine;
		} catch (error) {
			console.warn("Ghostery adblocker failed to initialize; using fallback blocker.", error);
			ghosteryEngine = null;
			ghosteryRequestCtor = null;
			return null;
		}
	})();

	return ghosteryEnginePromise;
}

function normalizeAdblockRequestType(type) {
	var raw = String(type || "other").trim().toLowerCase();
	if (!raw) return "other";
	if (raw === "document" || raw === "main_frame" || raw === "navigate") return "main_frame";
	if (raw === "sub_frame" || raw === "frame" || raw === "iframe") return "sub_frame";
	if (raw === "xhr" || raw === "xmlhttprequest" || raw === "fetch") return "xmlhttprequest";
	if (raw === "beacon") return "ping";
	if (raw === "ws") return "websocket";
	if (raw === "img") return "image";
	return raw;
}

function inferFetchRequestType(input, init) {
	var requestLike = input && typeof input === "object" ? input : null;
	var destination = String(requestLike?.destination || init?.destination || "")
		.trim()
		.toLowerCase();
	if (destination) return normalizeAdblockRequestType(destination);

	var mode = String(requestLike?.mode || init?.mode || "")
		.trim()
		.toLowerCase();
	if (mode === "navigate") return "main_frame";

	return "xmlhttprequest";
}

function shouldBlockWithGhostery(rawUrl, baseHref, requestType = "other", sourceUrl = "") {
	if (!ghosteryEngine || !ghosteryRequestCtor) return null;
	try {
		var absoluteUrl = new URL(String(rawUrl), baseHref || window.location.href).href;
		var parsed = new URL(absoluteUrl);
		var protocol = parsed.protocol.toLowerCase();
		if (
			protocol === "data:" ||
			protocol === "blob:" ||
			protocol === "about:" ||
			protocol === "javascript:"
		) {
			return false;
		}

		var request = ghosteryRequestCtor.fromRawDetails({
			type: normalizeAdblockRequestType(requestType),
			url: absoluteUrl,
			sourceUrl: sourceUrl || baseHref || window.location.href,
		});
		var result = ghosteryEngine.match(request);
		return Boolean(result?.match);
	} catch {
		return null;
	}
}

function shouldBlockAdRequest(rawUrl, baseHref, requestType = "other", sourceUrl = "") {
	if (!rawUrl) return false;
	try {
		var parsed = new URL(String(rawUrl), baseHref || window.location.href);
		var protocol = parsed.protocol.toLowerCase();
		if (protocol === "data:" || protocol === "blob:" || protocol === "about:") return false;

		var ghosteryDecision = shouldBlockWithGhostery(parsed.href, baseHref, requestType, sourceUrl);
		if (ghosteryDecision === true) return true;

		var host = parsed.hostname.toLowerCase();
		if (adblockHostPatterns.some((pattern) => pattern.test(host))) return true;
		var target = `${host}${parsed.pathname}${parsed.search}`.toLowerCase();
		return adblockUrlPatterns.some((pattern) => pattern.test(target));
	} catch {
		return false;
	}
}

function toScramjetProxyUrl(rawUrl) {
	var base = String(window.location.origin || "").replace(/\/+$/, "");
	var target = String(rawUrl || "").trim();
	if (!base || !target) return "";
	return `${base}/scramjet/${encodeURIComponent(target)}`;
}

function fromScramjetProxyUrl(rawUrl) {
	var target = String(rawUrl || "").trim();
	if (!target) return "";
	try {
		var parsed = new URL(target, window.location.href);
		var marker = "/scramjet/";
		if (!parsed.pathname.startsWith(marker)) return target;
		var encoded = parsed.pathname.slice(marker.length);
		if (!encoded) return "";
		return decodeURIComponent(encoded);
	} catch {
		return target;
	}
}

function syncTabUrlFromFrame(tabId, frameElement) {
	var tab = tabs.find((entry) => entry.id === tabId);
	if (!tab) return;
	var frameHref = "";
	try {
		frameHref = String(frameElement?.contentWindow?.location?.href || "").trim();
	} catch {
		return;
	}
	if (!frameHref || frameHref === "about:blank") return;
	var nextUrl = fromScramjetProxyUrl(frameHref);
	if (!nextUrl) return;
	var prevUrl = String(tab.url || "").trim();
	var changed = prevUrl !== nextUrl;
	var isProgrammaticNav = suppressNextFrameNavSyncByTab.has(tabId);
	if (isProgrammaticNav) suppressNextFrameNavSyncByTab.delete(tabId);
	if (!changed) return;

	if (!isProgrammaticNav && prevUrl) {
		tab.backStack.push(prevUrl);
		tab.forwardStack = [];
	}
	tab.url = nextUrl;
	try {
		var frameTitle = String(frameElement?.contentWindow?.document?.title || "").trim();
		tab.title = frameTitle || getDisplayTitle(nextUrl);
	} catch {
		tab.title = getDisplayTitle(nextUrl);
	}
	if (tabId === activeTabId) {
		addressInput.value = nextUrl;
		homeSearchInput.value = nextUrl;
	}
	renderTabs();
	updateNavButtons();
	addHistory(nextUrl);
}

function injectAdblockIntoFrame(frameElement) {
	var frameWindow = frameElement?.contentWindow;
	if (!frameWindow) return;
	if (frameWindow.__fbAdblockInstalled) return;
	frameWindow.__fbAdblockInstalled = true;
	void ensureGhosteryEngine();

	var shouldBlock = (target, requestType = "other", sourceUrl = "") =>
		isAdblockEnabled() &&
		shouldBlockAdRequest(target, frameWindow.location?.href, requestType, sourceUrl);
	var responseCtor = frameWindow.Response || Response;

	if (typeof frameWindow.fetch === "function") {
		var originalFetch = frameWindow.fetch.bind(frameWindow);
		frameWindow.fetch = (input, init) => {
			var target = typeof input === "string" ? input : input?.url;
			var sourceUrl = typeof input === "object" ? input?.referrer || "" : "";
			if (shouldBlock(target, inferFetchRequestType(input, init), sourceUrl)) {
				return Promise.resolve(
					new responseCtor("", {
						status: 204,
						statusText: "Blocked by Frosted adblock",
					})
				);
			}
			return originalFetch(input, init);
		};
	}

	var xhrProto = frameWindow.XMLHttpRequest?.prototype;
	if (xhrProto && !xhrProto.__fbAdblockPatched) {
		xhrProto.__fbAdblockPatched = true;
		var originalOpen = xhrProto.open;
		var originalSend = xhrProto.send;
		xhrProto.open = function (method, url, ...args) {
			this.__fbAdblockTarget = url;
			return originalOpen.call(this, method, url, ...args);
		};
		xhrProto.send = function (...args) {
			if (shouldBlock(this.__fbAdblockTarget, "xmlhttprequest", frameWindow.location?.href)) {
				try {
					this.abort();
				} catch {
				}
				return;
			}
			return originalSend.apply(this, args);
		};
	}

	if (typeof frameWindow.navigator?.sendBeacon === "function") {
		var originalSendBeacon = frameWindow.navigator.sendBeacon.bind(frameWindow.navigator);
		frameWindow.navigator.sendBeacon = (url, data) => {
			if (shouldBlock(url, "ping", frameWindow.location?.href)) return false;
			return originalSendBeacon(url, data);
		};
	}

	if (typeof frameWindow.WebSocket === "function") {
		var OriginalWebSocket = frameWindow.WebSocket;
		frameWindow.WebSocket = function FrostedAdblockWebSocket(url, protocols) {
			if (shouldBlock(url, "websocket", frameWindow.location?.href)) {
				throw new Error("Blocked by Frosted adblock");
			}
			return protocols === undefined
				? new OriginalWebSocket(url)
				: new OriginalWebSocket(url, protocols);
		};
		frameWindow.WebSocket.prototype = OriginalWebSocket.prototype;
	}
}

async function loadUrl(url, pushHistory = true) {
	resetError();
	var tab = getActiveTab();
	if (!tab) return;
	var previousUrl = String(tab.url || "");

	if (pushHistory && tab.url) {
		tab.backStack.push(tab.url);
		tab.forwardStack = [];
	}

	if (previousUrl && previousUrl !== String(url || "")) {
		destroyTabFrame(tab.id);
	}

	tab.url = url;
	tab.title = getDisplayTitle(url);
	if (!isCatalogGameUrl(url) && !String(url || "").startsWith("blob:")) {
		canonicalGameUrlByTab.delete(tab.id);
		restoredGameProgressMarkerByTab.delete(tab.id);
	}
	addressInput.value = url;
	homeSearchInput.value = url;
	renderTabs();
	updateNavButtons();

	if (isSettingsInternalUrl(url)) {
		showSettingsPage();
		return;
	}
	if (isPartnersInternalUrl(url)) {
		showPartnersPage();
		return;
	}
	if (isGamesInternalUrl(url)) {
		showGamesPage();
		return;
	}
	if (isAiInternalUrl(url)) {
		showAiPage();
		return;
	}
	if (isExtensionInternalUrl(url) || isExtensionStoreInternalUrl(url)) {
		showExtensionStorePage();
		return;
	}
	if (isCreditsInternalUrl(url)) {
		showCreditsPage();
		return;
	}

	showLoading(true);

	try {
		await ensureTransport();
		var frame = ensureTabFrame(tab.id);
		showFrameForTab(tab.id);
		var proxiedUrl = toScramjetProxyUrl(url);
		if (!proxiedUrl) throw new Error("Invalid Scramjet target URL.");
		var pendingTimeout = frameLoadTimeoutIdByTab.get(tab.id);
		if (pendingTimeout) clearTimeout(pendingTimeout);
		frameLoadTimeoutIdByTab.set(
			tab.id,
			setTimeout(() => {
				if (tab.id === activeTabId) showLoading(false);
				frameLoadTimeoutIdByTab.delete(tab.id);
			}, 12000)
		);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		suppressNextFrameNavSyncByTab.add(tab.id);
		frame.element.src = proxiedUrl;
		hideBlank();
		addHistory(url);
	} catch (err) {
		showError("Failed to initialize proxy runtime.", err);
		showLoading(false);
	} finally {
	}
}

function ensureTabFrame(tabId) {
	var existing = tabFrames.get(tabId);
	if (existing) return existing;

	var created = scramjet.createFrame();
	created.frame.className = "proxy-frame";
	created.frame.style.display = "none";
	created.frame.style.width = "100%";
	created.frame.style.height = "100%";
	created.frame.style.border = "none";
	created.frame.style.position = "absolute";
	created.frame.style.inset = "0";
	created.frame.addEventListener("load", () => {
		var pendingTimeout = frameLoadTimeoutIdByTab.get(tabId);
		if (pendingTimeout) {
			clearTimeout(pendingTimeout);
			frameLoadTimeoutIdByTab.delete(tabId);
		}
		if (tabId === activeTabId) showLoading(false);
		syncTabUrlFromFrame(tabId, created.frame);
		try {
			if (shouldInjectAdblockForTab(tabId)) {
				injectAdblockIntoFrame(created.frame);
			}
		} catch {
		}
		attachQuickContextMenuToFrame(created.frame);
		void runQueuedGameClickScriptForTab(tabId, created.frame);
		void maybeRecoverRawHtmlCatalogGame(tabId, created.frame);
	});
	browserStage.appendChild(created.frame);
	tabFrames.set(tabId, { go: created.go.bind(created), element: created.frame });
	return tabFrames.get(tabId);
}

function ensureQuickContextMenu() {
	if (quickContextMenuEl) return quickContextMenuEl;
	var menu = document.createElement("div");
	menu.className = "quick-context-menu";
	menu.id = "quickContextMenu";
	menu.innerHTML = `
		<button type="button" class="quick-context-item" data-action="wallpapers">
			<i class="fa-solid fa-image"></i> Open Wallpapers
		</button>
		<button type="button" class="quick-context-item" data-action="eruda">
			&lt;/&gt; Inject Eruda
		</button>
	`;
	menu.addEventListener("click", (event) => {
		var item = event.target?.closest?.(".quick-context-item");
		if (!item) return;
		var action = String(item.dataset.action || "").trim();
		hideQuickContextMenu();
		if (action === "wallpapers") {
			navigateFromInput(wallpapersInternalUrl);
			return;
		}
		if (action === "eruda") {
			injectErudaIntoActiveTab();
		}
	});
	document.body.appendChild(menu);
	quickContextMenuEl = menu;
	return menu;
}

function showQuickContextMenu(clientX, clientY) {
	var menu = ensureQuickContextMenu();
	menu.classList.add("open");
	menu.style.visibility = "hidden";
	menu.style.left = "0px";
	menu.style.top = "0px";
	var viewportW = window.innerWidth || document.documentElement.clientWidth || 0;
	var viewportH = window.innerHeight || document.documentElement.clientHeight || 0;
	var rect = menu.getBoundingClientRect();
	var x = Math.max(8, Math.min(clientX, viewportW - rect.width - 8));
	var y = Math.max(8, Math.min(clientY, viewportH - rect.height - 8));
	menu.style.left = `${Math.round(x)}px`;
	menu.style.top = `${Math.round(y)}px`;
	menu.style.visibility = "visible";
}

function hideQuickContextMenu() {
	if (!quickContextMenuEl) return;
	quickContextMenuEl.classList.remove("open");
}

function bindQuickContextMenu() {
	document.addEventListener("contextmenu", (event) => {
		var target = event.target;
		var insideInternal = Boolean(target?.closest?.(".internal-page.active"));
		var insideBrowserStage = Boolean(browserStage && target && browserStage.contains(target));
		if (!insideInternal && !insideBrowserStage) return;
		event.preventDefault();
		showQuickContextMenu(event.clientX, event.clientY);
	});
	document.addEventListener("click", () => {
		hideQuickContextMenu();
	});
	window.addEventListener("keydown", (event) => {
		if (event.key === "Escape") hideQuickContextMenu();
	});
	window.addEventListener("blur", () => {
		hideQuickContextMenu();
	});
}

function attachQuickContextMenuToFrame(frameElement) {
	if (!frameElement) return;
	if (!frameElement.__fbQuickMenuFrameBound) {
		frameElement.__fbQuickMenuFrameBound = true;
		frameElement.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			showQuickContextMenu(event.clientX, event.clientY);
		});
	}
	try {
		var targetDoc = frameElement.contentDocument;
		if (!targetDoc || targetDoc.__fbQuickMenuBound) return;
		targetDoc.__fbQuickMenuBound = true;
		targetDoc.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			var rect = frameElement.getBoundingClientRect();
			var x = rect.left + event.clientX;
			var y = rect.top + event.clientY;
			showQuickContextMenu(x, y);
		});
		targetDoc.addEventListener("click", () => hideQuickContextMenu());
	} catch {
	}
}

function shouldInjectAdblockForTab(tabId) {
	var tab = tabs.find((entry) => entry.id === tabId);
	if (!tab) return true;
	var currentUrl = String(tab.url || "").trim();
	if (!currentUrl) return true;
	if (isCatalogGameUrl(currentUrl)) return false;
	var catalogBlobUrl = String(gameBlobUrlsByTab.get(tabId) || "").trim();
	if (catalogBlobUrl && currentUrl === catalogBlobUrl) return false;
	return true;
}

function showFrameForTab(tabId) {
	hideBlank();
	hideInternalPages();
	tabFrames.forEach((item, id) => {
		item.element.style.display = id === tabId ? "block" : "none";
	});
}

function goBack() {
	var tab = getActiveTab();
	if (!tab || !tab.backStack.length) return;
	var prev = tab.backStack.pop();
	if (tab.url) tab.forwardStack.push(tab.url);
	loadUrl(prev, false);
}

function goForward() {
	var tab = getActiveTab();
	if (!tab || !tab.forwardStack.length) return;
	var next = tab.forwardStack.pop();
	if (tab.url) tab.backStack.push(tab.url);
	loadUrl(next, false);
}

function reloadActive() {
	var tab = getActiveTab();
	if (!tab || !tab.url) return;
	loadUrl(tab.url, false);
}

function goHome() {
	var tab = getActiveTab();
	if (!tab) return;
	destroyTabFrame(tab.id);
	tab.url = "";
	tab.title = "New Tab";
	addressInput.value = "";
	homeSearchInput.value = "";
	renderTabs();
	showBlank();
}

function showBlank() {
	hideInternalPages();
	blankState.style.display = "flex";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	setParticlesVisible(true);
}

function hideBlank() {
	blankState.style.display = "none";
	setParticlesVisible(false);
}

function showSettingsPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (creditsPage) creditsPage.classList.remove("active");
	if (partnersPage) partnersPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
	if (extensionPage) extensionPage.classList.remove("active");
	if (extensionStorePage) extensionStorePage.classList.remove("active");
	if (settingsPage) settingsPage.classList.add("active");
	addressInput.value = settingsInternalUrl;
	setParticlesVisible(isMatrixThemeActive());
}

function showPartnersPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
	if (extensionPage) extensionPage.classList.remove("active");
	if (extensionStorePage) extensionStorePage.classList.remove("active");
	if (partnersPage) partnersPage.classList.add("active");
	addressInput.value = partnersInternalUrl;
	setParticlesVisible(isMatrixThemeActive());
}

function showGamesPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (partnersPage) partnersPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.add("active");
	if (aiPage) aiPage.classList.remove("active");
	if (extensionPage) extensionPage.classList.remove("active");
	if (extensionStorePage) extensionStorePage.classList.remove("active");
	addressInput.value = gamesInternalUrl;
	setParticlesVisible(isMatrixThemeActive());
}

function showAiPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (partnersPage) partnersPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.add("active");
	if (extensionPage) extensionPage.classList.remove("active");
	if (extensionStorePage) extensionStorePage.classList.remove("active");
	addressInput.value = aiInternalUrl;
	setParticlesVisible(isMatrixThemeActive());
}

function showExtensionStorePage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (partnersPage) partnersPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
	if (extensionPage) extensionPage.classList.remove("active");
	if (extensionStorePage) extensionStorePage.classList.add("active");
	addressInput.value = wallpapersInternalUrl;
	renderWallpaperStoreGrid();
	setParticlesVisible(isMatrixThemeActive());
}

function showCreditsPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (partnersPage) partnersPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
	if (extensionPage) extensionPage.classList.remove("active");
	if (extensionStorePage) extensionStorePage.classList.remove("active");
	if (creditsPage) creditsPage.classList.add("active");
	addressInput.value = creditsInternalUrl;
	setParticlesVisible(isMatrixThemeActive());
}

function hideInternalPages() {
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (partnersPage) partnersPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
	if (extensionPage) extensionPage.classList.remove("active");
	if (extensionStorePage) extensionStorePage.classList.remove("active");
}

function updateNavButtons() {
	var tab = getActiveTab();
	if (!tab) return;
	backBtn.disabled = tab.backStack.length === 0;
	forwardBtn.disabled = tab.forwardStack.length === 0;
}

function isTypingTarget(target) {
	if (!target) return false;
	var tag = (target.tagName || "").toLowerCase();
	return tag === "input" || tag === "textarea" || tag === "select" || target.isContentEditable;
}

function normalizeWispUrl(rawUrl) {
	var input = String(rawUrl || "").trim();
	if (!input) return "";
	try {
		var parsed = new URL(input, window.location.origin);
		if (parsed.protocol === "http:") parsed.protocol = "ws:";
		if (parsed.protocol === "https:") parsed.protocol = "wss:";
		if (parsed.protocol !== "ws:" && parsed.protocol !== "wss:") return "";
		if (!parsed.pathname || parsed.pathname === "/") {
			parsed.pathname = "/wisp/";
		} else if (!parsed.pathname.endsWith("/")) {
			parsed.pathname = `${parsed.pathname}/`;
		}
		return parsed.toString();
	} catch {
		return "";
	}
}

function getWispTransportCandidates() {
	var configuredPrimary = normalizeWispUrl(window?._CONFIG?.WISP_URL || window?.WISP_URL);
	var configuredFallback = normalizeWispUrl(window?._CONFIG?.WISP_FALLBACK_URL);
	var sameOrigin = normalizeWispUrl(
		`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/wisp/`
	);
	var ordered = [configuredPrimary, sameOrigin, configuredFallback].filter(Boolean);
	return Array.from(new Set(ordered));
}

async function ensureTransport() {
	if (transportReady) return;
	await registerSW();
	var candidates = getWispTransportCandidates();
	var lastError = null;
	for (var wispUrl of candidates) {
		try {
			await connection.setTransport("/libcurl/index.mjs", [{ websocket: wispUrl }]);
			transportReady = true;
			return;
		} catch (error) {
			lastError = error;
		}
	}
	throw lastError || new Error("Unable to establish proxy transport.");
}

var historyKey = "fb_history";

function addHistory(url) {
	var items = readHistory();
	items.unshift({ url, at: new Date().toLocaleString() });
	localStorage.setItem(historyKey, JSON.stringify(items.slice(0, 100)));
}

function readHistory() {
	try {
		var parsed = JSON.parse(localStorage.getItem(historyKey) || "[]");
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function renderHistory() {
	if (!historyContainer) return;
	var items = readHistory();
	historyContainer.innerHTML = "";
	if (!items.length) {
		var empty = document.createElement("div");
		empty.className = "history-item";
		empty.textContent = "No history yet.";
		historyContainer.appendChild(empty);
		return;
	}

	items.forEach((entry) => {
		var row = document.createElement("div");
		row.className = "history-item";
		row.textContent = `${entry.at} - ${entry.url}`;
		row.addEventListener("click", () => {
			loadUrl(entry.url, true);
		});
		historyContainer.appendChild(row);
	});
}

function readStorageObject(storage) {
	var output = {};
	if (!storage) return output;
	for (var i = 0; i < storage.length; i += 1) {
		var key = storage.key(i);
		if (!key) continue;
		try {
			output[key] = storage.getItem(key);
		} catch {
		}
	}
	return output;
}

function captureFrameStorageSnapshot(frameElement) {
	try {
		var frameWindow = frameElement?.contentWindow;
		if (!frameWindow) return null;
		return {
			localStorage: readStorageObject(frameWindow.localStorage),
			sessionStorage: readStorageObject(frameWindow.sessionStorage),
		};
	} catch {
		return null;
	}
}

function applyStorageSnapshotToFrame(frameElement, snapshot) {
	try {
		var frameWindow = frameElement?.contentWindow;
		if (!frameWindow || !snapshot) return false;
		var localEntries = Object.entries(snapshot.localStorage || {});
		var sessionEntries = Object.entries(snapshot.sessionStorage || {});
		localEntries.forEach(([key, value]) => {
			frameWindow.localStorage.setItem(key, value ?? "");
		});
		sessionEntries.forEach(([key, value]) => {
			frameWindow.sessionStorage.setItem(key, value ?? "");
		});
		return true;
	} catch {
		return false;
	}
}

function renderGames() {
	if (!gamesGrid) return;
	var source = Array.isArray(gamesCatalog) ? gamesCatalog : [];
	var query = String(gamesSearchInput?.value || "").trim().toLowerCase();
	var filtered = query
		? source.filter((game) => {
				var title = String(game.title || "").toLowerCase();
				var desc = String(game.desc || "").toLowerCase();
				return title.includes(query) || desc.includes(query);
			})
		: source;
	if (gamesCount) {
		gamesCount.textContent = query
			? `Games: ${filtered.length} / ${source.length}`
			: `Games: ${source.length}`;
	}
	gamesGrid.innerHTML = "";
	if (!filtered.length) {
		var empty = document.createElement("div");
		empty.className = "settings-hint";
		empty.textContent = query ? "No games match your search." : "No games configured yet.";
		gamesGrid.appendChild(empty);
		return;
	}
	filtered.forEach((game) => {
		var card = document.createElement("button");
		card.type = "button";
		card.className = "game-card";

		var thumb = document.createElement("img");
		thumb.className = "game-thumb";
		thumb.alt = game.title || "Game";
		thumb.src = game.image || "";
		thumb.loading = "lazy";

		var body = document.createElement("div");
		body.className = "game-body";

		var title = document.createElement("div");
		title.className = "game-title";
		title.textContent = game.title || "Untitled";

		var desc = document.createElement("div");
		desc.className = "game-desc";
		desc.textContent = game.desc || "";

		body.appendChild(title);
		body.appendChild(desc);
		card.appendChild(thumb);
		card.appendChild(body);

		card.addEventListener("click", async () => {
			var target = resolveGameUrl(game.url);
			if (!target) return;
			queueGameClickScriptForActiveTab(game.clickScript);
			await openGameFromCatalog(target, { useBlob: game.useBlob });
		});
		gamesGrid.appendChild(card);
	});
}

async function loadGamesCatalog() {
	try {
		var response = await fetch("/games.json", { cache: "no-store" });
		var raw = await response.json().catch(() => []);
		if (!response.ok || !Array.isArray(raw)) {
			gamesCatalog = [];
			renderGames();
			return;
		}
		gamesCatalog = raw
			.map((entry) => ({
				title: String(entry?.title || entry?.name || "").trim(),
				desc: String(entry?.desc || entry?.description || entry?.author || "").trim(),
				url: String(entry?.url || "").trim(),
				image: String(entry?.image || entry?.cover || "").trim(),
				clickScript: String(entry?.clickScript || entry?.defaultClickScript || "").trim(),
				useBlob: Boolean(entry?.useBlob),
			}))
			.filter((entry) => entry.title && entry.url);
	} catch {
		gamesCatalog = [];
	}
	renderGames();
}

function queueGameClickScriptForActiveTab(scriptPath) {
	var tab = getActiveTab();
	if (!tab) return;
	var rawPath = String(scriptPath || "").trim();
	if (!rawPath) return;
	pendingGameClickScriptsByTab.set(tab.id, rawPath);
}

async function runQueuedGameClickScriptForTab(tabId, frameElement) {
	var queuedScriptPath = String(pendingGameClickScriptsByTab.get(tabId) || "").trim();
	if (!queuedScriptPath) return;
	pendingGameClickScriptsByTab.delete(tabId);
	await new Promise((resolve) => setTimeout(resolve, gameClickScriptDelayMs));
	await runGameClickScriptInFrame(queuedScriptPath, frameElement);
}

async function runGameClickScriptInFrame(scriptPath, frameElement) {
	var rawPath = String(scriptPath || "").trim();
	if (!rawPath) return;
	var normalizedPath = rawPath.startsWith("/")
		? rawPath
		: `/${rawPath.replace(/^\.?\//, "")}`;
	var cacheBustedPath = `${normalizedPath}${normalizedPath.includes("?") ? "&" : "?"}t=${Date.now()}`;
	var localScriptUrl = new URL(cacheBustedPath, window.location.origin).href;
	var targetWindow = frameElement?.contentWindow;
	var scriptSource = await fetchGameClickScriptSource(localScriptUrl);
	if (!targetWindow) {
		await runGameClickScriptInShell(localScriptUrl, scriptSource);
		return;
	}

	if (scriptSource && looksLikeEncodedBookmarklet(scriptSource)) {
		var handled = executeBookmarkletLikeSource(targetWindow, scriptSource);
		if (handled) return;
	}

	if (scriptSource) {
		var executedFromSource = await new Promise((resolve) => {
			try {
				var sourceTag = `\n//# sourceURL=${normalizedPath}`;
				targetWindow.eval(`${scriptSource}${sourceTag}`);
				resolve(true);
			} catch {
				resolve(false);
			}
		});
		if (executedFromSource) return;
	}

	var injectedInFrame = await new Promise((resolve) => {
		try {
			var targetDocument = targetWindow.document;
			var script = targetDocument.createElement("script");
			script.src = localScriptUrl;
			script.async = true;
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			(targetDocument.body || targetDocument.head || targetDocument.documentElement).appendChild(script);
		} catch {
			resolve(false);
		}
	});
	if (!injectedInFrame) {
		await runGameClickScriptInShell(localScriptUrl, scriptSource);
	}
}

async function fetchGameClickScriptSource(scriptUrl) {
	var target = String(scriptUrl || "").trim();
	if (!target) return "";
	try {
		var response = await fetch(target, { cache: "no-store" });
		if (!response.ok) return "";
		return await response.text();
	} catch {
		return "";
	}
}

function looksLikeEncodedBookmarklet(source) {
	var text = String(source || "").trim();
	if (!text) return false;
	if (/^javascript\s*:/i.test(text)) return true;
	return /^function\s*\(\)\s*%\s*[0-9a-fA-F]\s*[0-9a-fA-F]/.test(text);
}

function decodeLegacyBookmarkletSource(rawSource) {
	var text = String(rawSource || "");
	if (!text) return "";
	text = text.replace(/%[\t \r\n]*([0-9a-fA-F])[\t \r\n]*([0-9a-fA-F])/g, "%$1$2");
	text = text.trim().replace(/^javascript:\s*/i, "");
	for (var i = 0; i < 2; i += 1) {
		var next = text.replace(/%([0-9a-fA-F]{2})/g, (_, hex) =>
			String.fromCharCode(parseInt(hex, 16))
		);
		if (next === text) break;
		text = next;
	}

	// This source is bookmarklet-style and often inserts whitespace between operator symbols.
	text = text
		.replace(/=\s+>/g, "=>")
		.replace(/\|\s+\|/g, "||")
		.replace(/&\s+&/g, "&&")
		.replace(/!\s+=\s+=/g, "!==")
		.replace(/=\s+=\s+=/g, "===")
		.replace(/!\s+=/g, "!=")
		.replace(/=\s+=/g, "==")
		.replace(/<\s+=/g, "<=")
		.replace(/>\s+=/g, ">=")
		.replace(/\+\s+\+/g, "++")
		.replace(/-\s+-/g, "--");

	var trimmed = text.trim();
	if (/^function\s*\(/.test(trimmed)) {
		return `(${trimmed})()`;
	}
	return trimmed;
}

function executeBookmarkletLikeSource(targetWindow, rawSource) {
	if (!targetWindow) return false;
	try {
		var decoded = decodeLegacyBookmarkletSource(rawSource);
		if (!decoded) return false;
		targetWindow.eval(decoded);
		return true;
	} catch {
		return false;
	}
}

function runGameClickScriptInShell(scriptUrl, scriptSource = "") {
	var sourceText = String(scriptSource || "").trim();
	if (sourceText && looksLikeEncodedBookmarklet(sourceText)) {
		try {
			var decoded = decodeLegacyBookmarkletSource(sourceText);
			if (decoded) {
				try {
					window.eval(decoded);
					return Promise.resolve();
				} catch {
				}
			}
		} catch {
		}
	}
	return new Promise((resolve) => {
		var script = document.createElement("script");
		script.src = String(scriptUrl || "");
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => resolve();
		document.head.appendChild(script);
	});
}

function normalizeInternalScheme(value) {
	var raw = String(value || "").trim();
	if (!raw) return "";
	return raw.replace(/^bypass:\/\//i, "frosted://");
}

function getInternalRoute(value) {
	var normalized = normalizeInternalScheme(value).toLowerCase();
	if (!normalized.startsWith("frosted://")) return normalized;
	var withoutHash = normalized.split("#")[0];
	var withoutQuery = withoutHash.split("?")[0];
	return withoutQuery.replace(/\/+$/, "");
}

function isSettingsInternalUrl(url) {
	var normalized = getInternalRoute(url);
	return normalized === settingsInternalUrl;
}

function isCreditsInternalUrl(url) {
	var normalized = getInternalRoute(url);
	return normalized === creditsInternalUrl;
}

function isGamesInternalUrl(url) {
	var normalized = getInternalRoute(url);
	return normalized === gamesInternalUrl;
}

function isPartnersInternalUrl(url) {
	var normalized = getInternalRoute(url);
	return normalized === partnersInternalUrl;
}

function isAiInternalUrl(url) {
	var normalized = getInternalRoute(url);
	return normalized === aiInternalUrl;
}

function isExtensionInternalUrl(url) {
	var normalized = getInternalRoute(url);
	return normalized === "frosted://extension";
}

function isExtensionStoreInternalUrl(url) {
	var normalized = getInternalRoute(url);
	return (
		normalized === wallpapersInternalUrl ||
		normalized === "frosted://extensionstore" ||
		normalized === "frosted://webstore"
	);
}

async function openGameFromCatalog(url, options = {}) {
	var tab = getActiveTab();
	if (!tab) return;
	canonicalGameUrlByTab.set(tab.id, url);
	restoredGameProgressMarkerByTab.delete(tab.id);
	var useBlob = Boolean(options?.useBlob);
	var finalUrl = url;
	rawHtmlFallbackTriedUrlByTab.delete(tab.id);
	if (useBlob) {
		try {
			finalUrl = await materializeGameBlobUrl(url);
		} catch {
			finalUrl = url;
		}
	}

	var previousBlob = gameBlobUrlsByTab.get(tab.id);
	if (previousBlob && previousBlob !== finalUrl) {
		URL.revokeObjectURL(previousBlob);
		gameBlobUrlsByTab.delete(tab.id);
	}
	if (finalUrl.startsWith("blob:")) {
		gameBlobUrlsByTab.set(tab.id, finalUrl);
	}
	await loadUrl(finalUrl, true);
}

function isCatalogGameUrl(url) {
	var target = String(url || "").trim();
	if (!target) return false;
	return gamesCatalog.some((entry) => resolveGameUrl(entry?.url) === target);
}

function looksLikeRawHtmlSourceDocument(doc) {
	try {
		if (!doc || !doc.body) return false;
		var contentType = String(doc.contentType || "").toLowerCase();
		var bodyText = String(doc.body.textContent || "").trim();
		if (!bodyText) return false;

		var startsLikeHtmlSource = /^\s*(?:<!doctype|<html|<head|<body|<script|<meta|<title|<link|<style)\b/i.test(
			bodyText
		);
		var hasManyTags = (bodyText.match(/</g) || []).length > 20;
		var closesHtmlLikeMarkup = /<\/(?:html|head|body|script|style)>/i.test(bodyText);
		var noRenderedChildren = doc.body.children.length === 0;
		var plainTextType =
			contentType.includes("text/plain") || contentType.includes("application/octet-stream");

		return (plainTextType || noRenderedChildren) && (startsLikeHtmlSource || (hasManyTags && closesHtmlLikeMarkup));
	} catch {
		return false;
	}
}

function ensureHtmlHasBase(rawHtml, pageUrl) {
	var source = String(rawHtml || "");
	if (!source) return source;
	var base = String(pageUrl || "").replace(/[^/]*([?#].*)?$/, "");
	if (!base) return source;
	var hasBase = /<base\s[^>]*href=/i.test(source);
	if (hasBase) return source;
	return source.replace(/<head([^>]*)>/i, `<head$1><base href="${base}">`);
}

function recoverRawHtmlByDocumentWrite(targetDocument, currentUrl) {
	try {
		if (!targetDocument?.body) return false;
		var rawHtml = String(targetDocument.body.textContent || "");
		if (!rawHtml.trim()) return false;
		var patchedHtml = ensureHtmlHasBase(rawHtml, currentUrl);
		targetDocument.open();
		targetDocument.write(patchedHtml);
		targetDocument.close();
		return true;
	} catch {
		return false;
	}
}

async function maybeRecoverRawHtmlCatalogGame(tabId, frameElement) {
	if (tabId !== activeTabId) return;
	var tab = tabs.find((entry) => entry.id === tabId);
	if (!tab) return;

	var currentUrl = String(tab.url || "").trim();
	if (!/^https?:\/\//i.test(currentUrl)) return;
	if (!/\.html?(?:[?#]|$)/i.test(currentUrl)) return;
	if (!isCatalogGameUrl(currentUrl)) return;
	if (rawHtmlFallbackTriedUrlByTab.get(tabId) === currentUrl) return;

	var targetWindow = frameElement?.contentWindow;
	var targetDocument = targetWindow?.document;
	if (!targetDocument || !looksLikeRawHtmlSourceDocument(targetDocument)) return;

	rawHtmlFallbackTriedUrlByTab.set(tabId, currentUrl);
	var recoveredInPlace = recoverRawHtmlByDocumentWrite(targetDocument, currentUrl);
	if (recoveredInPlace) return;

	var blobUrl = currentUrl;
	try {
		blobUrl = await materializeGameBlobUrl(currentUrl);
	} catch {
		blobUrl = currentUrl;
	}
	if (!String(blobUrl).startsWith("blob:")) return;

	var previousBlob = gameBlobUrlsByTab.get(tabId);
	if (previousBlob && previousBlob !== blobUrl) {
		URL.revokeObjectURL(previousBlob);
	}
	gameBlobUrlsByTab.set(tabId, blobUrl);
	await loadUrl(blobUrl, false);
}

function resolveGameUrl(url) {
	var raw = String(url || "").trim();
	if (!raw) return "";
	var jsDelivrGh = raw.match(/^https:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@/]+)@([^/]+)\/(.+)$/i);
	if (jsDelivrGh) {
		var [, owner, repo, branch, path] = jsDelivrGh;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	var rawcdn = raw.match(/^https:\/\/rawcdn\.githack\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);
	if (rawcdn) {
		var [, owner, repo, branch, path] = rawcdn;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	var rawgithack = raw.match(/^https:\/\/raw\.githack\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);
	if (rawgithack) {
		var [, owner, repo, branch, path] = rawgithack;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	var githackGh = raw.match(/^https:\/\/(?:rawcdn\.)?githack\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);
	if (githackGh) {
		var [, owner, repo, branch, path] = githackGh;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	return raw;
}

async function materializeGameBlobUrl(url) {
	var target = String(url || "").trim();
	if (!target) return target;
	if (!/^https?:\/\//i.test(target)) return target;
	var looksHtml = /\.html?(?:[?#]|$)/i.test(target);
	if (!looksHtml) return target;

	var response = await fetch(target, { method: "GET", cache: "no-store" });
	if (!response.ok) return target;
	var body = await response.text();
	if (!body) return target;

	var base = response.url.replace(/[^/]*([?#].*)?$/, "");
	var hasBase = /<base\s[^>]*href=/i.test(body);
	var htmlWithBase = hasBase
		? body
		: body.replace(/<head([^>]*)>/i, `<head$1><base href="${base}">`);

	var blob = new Blob([htmlWithBase || body], { type: "text/html;charset=utf-8" });
	return URL.createObjectURL(blob);
}

async function solveAiPrompt() {
	var input = String((aiPromptInput && aiPromptInput.value) || "").trim();
	if (!input) {
		if (aiResult) aiResult.textContent = "Enter a prompt first.";
		return;
	}
	if (aiPromptInput) aiPromptInput.value = "";
	aiTypingRunId += 1;
	if (aiSolveBtn) aiSolveBtn.disabled = true;
	aiUiThread.push({ role: "user", content: input });
	aiUiThread.push({ role: "assistant", content: "Thinking...", typing: true });
	renderAiThread();
	try {
		var aiText = await fetchAiResponse(input, () => {});
		await animateAiTyping(aiText);
	} catch (error) {
		var message =
			`AI request failed.\n` +
			`Reason: ${error.message || error}\n` +
			`Tip: endpoint may be temporarily down or blocked by your network.`;
		var idx = findLastAssistantMessageIndex();
		if (idx !== -1) {
			aiUiThread[idx].content = message;
			aiUiThread[idx].typing = false;
		} else {
			aiUiThread.push({ role: "assistant", content: message, typing: false });
		}
		renderAiThread();
	} finally {
		if (aiSolveBtn) aiSolveBtn.disabled = false;
	}
}

function animateAiTyping(text) {
	return new Promise((resolve) => {
		if (!aiResult) {
			resolve();
			return;
		}
		var runId = ++aiTypingRunId;
		var fullText = String(text || "");
		var targetIndex = findLastAssistantMessageIndex();
		if (targetIndex === -1) {
			resolve();
			return;
		}
		aiUiThread[targetIndex].content = "";
		aiUiThread[targetIndex].typing = true;
		var index = 0;

		function step() {
			if (runId !== aiTypingRunId) {
				resolve();
				return;
			}
			if (index >= fullText.length) {
				aiUiThread[targetIndex].content = fullText;
				aiUiThread[targetIndex].typing = false;
				renderAiThread();
				resolve();
				return;
			}
			var remaining = fullText.length - index;
			var chunkSize = remaining > 160 ? 4 : remaining > 80 ? 3 : remaining > 30 ? 2 : 1;
			index = Math.min(fullText.length, index + chunkSize);
			aiUiThread[targetIndex].content = fullText.slice(0, index);
			renderAiThread();
			setTimeout(step, 12);
		}

		step();
	});
}

function findLastAssistantMessageIndex() {
	for (var i = aiUiThread.length - 1; i >= 0; i -= 1) {
		if (aiUiThread[i]?.role === "assistant") return i;
	}
	return -1;
}

function escapeHtml(value) {
	return String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function renderAiThread() {
	if (!aiResult) return;
	if (!aiUiThread.length) {
		aiResult.textContent = "Ask me anything.";
		return;
	}
	aiResult.innerHTML = "";
	var thread = document.createElement("div");
	thread.className = "ai-thread";
	aiUiThread.forEach((message) => {
		var row = document.createElement("div");
		row.className = `ai-msg ai-msg-${message.role === "assistant" ? "assistant" : "user"}`;

		var prefix = document.createElement("div");
		prefix.className = "ai-msg-prefix";
		if (message.role === "assistant") {
			prefix.innerHTML =
				'<img src="/chatgpt-logo.svg" alt="AI" class="ai-response-prefix-logo" />' +
				'<span class="ai-response-prefix-text">AI:</span>';
		} else {
			prefix.innerHTML =
				'<i class="fa-solid fa-circle-user ai-user-prefix-icon" aria-hidden="true"></i>' +
				'<span class="ai-response-prefix-text">:</span>';
		}

		var body = document.createElement("div");
		body.className = "ai-msg-content";
		if (message.role === "assistant" && !message.typing) {
			renderAiMessageContent(body, message.content);
		} else {
			body.textContent = String(message.content || "");
		}

		row.appendChild(prefix);
		row.appendChild(body);
		thread.appendChild(row);
	});
	aiResult.appendChild(thread);
	aiResult.scrollTop = aiResult.scrollHeight;
}

function renderAiMessageContent(container, text) {
	if (!container) return;
	var source = String(text || "");
	var parts = [];
	var regex = /```([a-zA-Z0-9_+\-]*)\n?([\s\S]*?)```/g;
	var lastIndex = 0;
	var match;

	while ((match = regex.exec(source)) !== null) {
		if (match.index > lastIndex) {
			parts.push({ type: "text", content: source.slice(lastIndex, match.index) });
		}
		parts.push({
			type: "code",
			language: match[1] || "text",
			content: match[2] || "",
		});
		lastIndex = regex.lastIndex;
	}

	if (lastIndex < source.length) {
		parts.push({ type: "text", content: source.slice(lastIndex) });
	}

	if (!parts.length) {
		container.textContent = source;
		return;
	}
	container.innerHTML = "";
	var fragment = document.createDocumentFragment();
	for (var part of parts) {
		if (part.type === "text") {
			var block = document.createElement("div");
			block.className = "ai-text-block";
			block.innerHTML = escapeHtml(part.content).replace(/\n/g, "<br>");
			fragment.appendChild(block);
			continue;
		}

		var wrapper = document.createElement("div");
		wrapper.className = "ai-code-block";

		var header = document.createElement("div");
		header.className = "ai-code-header";

		var lang = document.createElement("span");
		lang.className = "ai-code-lang";
		lang.textContent = part.language || "text";
		header.appendChild(lang);

		var actions = document.createElement("div");
		actions.className = "ai-code-actions";

		var copyBtn = document.createElement("button");
		copyBtn.type = "button";
		copyBtn.className = "ai-code-btn";
		copyBtn.textContent = "Copy";
		copyBtn.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(part.content);
				copyBtn.textContent = "Copied";
				setTimeout(() => {
					copyBtn.textContent = "Copy";
				}, 1200);
			} catch {
				copyBtn.textContent = "Failed";
				setTimeout(() => {
					copyBtn.textContent = "Copy";
				}, 1200);
			}
		});
		actions.appendChild(copyBtn);

		header.appendChild(actions);
		wrapper.appendChild(header);

		var pre = document.createElement("pre");
		var code = document.createElement("code");
		code.textContent = part.content;
		pre.appendChild(code);
		wrapper.appendChild(pre);
		fragment.appendChild(wrapper);
	}
	container.appendChild(fragment);
}

async function fetchAiResponse(prompt, onChunk) {
	return fetchAiResponseFromGroq(prompt, onChunk);
}

function getGroqModelForMode(mode) {
	if (mode === "fast") {
		return String(window.GROQ_MODEL_FAST || window.GROQ_MODEL_AUTO || "llama-3.1-8b-instant");
	}
	if (mode === "smart") {
		return String(window.GROQ_MODEL_SMART || window.GROQ_MODEL_AUTO || "llama-3.3-70b-versatile");
	}
	return String(window.GROQ_MODEL_AUTO || "llama-3.1-8b-instant");
}

async function fetchAiResponseFromGroq(prompt, onChunk) {
	var apiUrl = String(window.GROQ_API_URL || "").trim();
	var apiKey = String(window.GROQ_API_KEY || "").trim();
	var mode = (aiModelSelect && aiModelSelect.value) || "auto";
	var model = getGroqModelForMode(mode);
	var systemPrompt = String(window.GROQ_SYSTEM_PROMPT || "").trim();
	if (!apiUrl) {
		throw new Error("Missing GROQ_API_URL.");
	}
	if (!apiKey) {
		throw new Error("Missing GROQ_API_KEY.");
	}

	var history = [
		...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
		...aiChatHistory,
		{ role: "user", content: prompt },
	];

	var response = await fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model,
			messages: history,
			max_tokens: 700,
			temperature: 0.7,
		}),
	});

	var payload = await response.json().catch(() => ({}));
	if (!response.ok) {
		var detail = payload?.error?.message || `Groq error (${response.status})`;
		throw new Error(detail);
	}

	var text = extractAiText(payload);
	if (!text) {
		throw new Error("AI response was empty.");
	}

	aiChatHistory.push({ role: "user", content: prompt });
	aiChatHistory.push({ role: "assistant", content: text });
	if (aiChatHistory.length > 20) {
		aiChatHistory.splice(0, aiChatHistory.length - 20);
	}
	if (typeof onChunk === "function") onChunk(text);
	return text;
}

function extractAiText(payload) {
	var direct = String(payload?.text || "").trim();
	if (direct) return direct;
	var rawContent = payload?.choices?.[0]?.message?.content;
	if (typeof rawContent === "string") return rawContent.trim();
	if (Array.isArray(rawContent)) {
		return rawContent
			.map((part) => (typeof part?.text === "string" ? part.text : ""))
			.join("")
			.trim();
	}
	return "";
}

function loadAiMode() {
	if (!aiModelSelect) return;
	var saved = String(localStorage.getItem(aiModeKey) || "auto").toLowerCase();
	var allowed = new Set(["auto", "fast", "smart"]);
	aiModelSelect.value = allowed.has(saved) ? saved : "auto";
}

var cloakEnabledStorage = "fb_cloak_enabled";
var cloakTitleStorage = "fb_cloak_title";
var cloakFaviconStorage = "fb_cloak_favicon";
var defaultCloakTitle = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
var defaultCloakFaviconHref = "ixl.ico";
var cloakPresets = {
	ixl: { title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish", favicon: "ixl.ico" },
	google: { title: "Google", favicon: "https://www.google.com/favicon.ico" },
	docs: { title: "Google Docs", favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
	drive: { title: "My Drive - Google Drive", favicon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
};
var visibleAppTitle = "Frosted";
var visibleFaviconHref = defaultAppIconHref;

function isCloakEnabled() {
	var raw = localStorage.getItem(cloakEnabledStorage);
	if (raw === null) {
		localStorage.setItem(cloakEnabledStorage, "true");
		return true;
	}
	return String(raw).toLowerCase() === "true";
}

function loadCloakSettings() {
	var enabled = isCloakEnabled();
	if (cloakEnabledToggle) {
		cloakEnabledToggle.checked = enabled;
	}
	if (cloakTitleInput) {
		cloakTitleInput.value = getCloakTitle();
	}
	if (cloakFaviconInput) {
		cloakFaviconInput.value = getCloakFaviconHref();
	}
	syncCloakPresetSelection();
	setCloakStatus(enabled ? "Cloak enabled." : "Cloak disabled.");
}

function setDocumentFavicon(href) {
	var targetHref = String(href || "").trim();
	if (!targetHref) return;
	var rels = ["icon", "shortcut icon", "apple-touch-icon"];
	rels.forEach((relValue) => {
		var link = document.querySelector(`link[rel='${relValue}']`);
		if (!link) {
			link = document.createElement("link");
			link.setAttribute("rel", relValue);
			document.head.appendChild(link);
		}
		link.setAttribute("href", targetHref);
	});
	if (faviconLink) {
		faviconLink.setAttribute("href", targetHref);
	}
}

function applyCloakVisualState(isHidden) {
	var useCloak = isCloakEnabled() && isHidden;
	var title = useCloak ? getCloakTitle() : visibleAppTitle;
	var favicon = useCloak ? getCloakFaviconHref() : visibleFaviconHref;
	document.title = title;
	setDocumentFavicon(favicon);
	broadcastCloakStateToParent({
		enabled: isCloakEnabled(),
		title: getCloakTitle(),
		favicon: getCloakFaviconHref(),
		visibleTitle: visibleAppTitle,
		visibleFavicon: visibleFaviconHref,
	});
}

function getCloakTitle() {
	var value = String(localStorage.getItem(cloakTitleStorage) || "").trim();
	return value || defaultCloakTitle;
}

function getCloakFaviconHref() {
	var value = normalizeCloakFaviconValue(localStorage.getItem(cloakFaviconStorage));
	if (value !== String(localStorage.getItem(cloakFaviconStorage) || "").trim()) {
		localStorage.setItem(cloakFaviconStorage, value);
	}
	return value || defaultCloakFaviconHref;
}

function saveCloakTitle() {
	var title = String(cloakTitleInput?.value || "").trim() || defaultCloakTitle;
	localStorage.setItem(cloakTitleStorage, title);
	if (cloakTitleInput) cloakTitleInput.value = title;
	syncCloakPresetSelection();
	applyCloakVisualState(document.hidden || !document.hasFocus());
	setCloakStatus("Cloak title saved.");
}

function saveCloakFavicon() {
	var icon = normalizeCloakFaviconValue(cloakFaviconInput?.value) || defaultCloakFaviconHref;
	localStorage.setItem(cloakFaviconStorage, icon);
	if (cloakFaviconInput) cloakFaviconInput.value = icon;
	syncCloakPresetSelection();
	applyCloakVisualState(document.hidden || !document.hasFocus());
	setCloakStatus("Cloak icon saved.");
}

function normalizeCloakFaviconValue(raw) {
	var value = String(raw || "").trim();
	if (!value) return "";
	if (/^https?:\/\/(www\.)?ixl\.com\/favicon\.ico$/i.test(value)) return "ixl.ico";
	if (/^https?:\/\/(www\.)?ixl\.com\/ixl-favicon\.png$/i.test(value)) return "ixl.ico";
	return value;
}

function setCloakStatus(message) {
	if (!cloakStatus) return;
	cloakStatus.textContent = message;
}

function applyCloakPreset(key) {
	var preset = cloakPresets[key];
	if (!preset) return;
	localStorage.setItem(cloakTitleStorage, preset.title);
	localStorage.setItem(cloakFaviconStorage, preset.favicon);
	if (cloakTitleInput) cloakTitleInput.value = preset.title;
	if (cloakFaviconInput) cloakFaviconInput.value = preset.favicon;
	if (cloakPresetSelect) cloakPresetSelect.value = key;
	applyCloakVisualState(document.hidden || !document.hasFocus());
	setCloakStatus(`Cloak preset applied: ${key}.`);
}

function syncCloakPresetSelection() {
	if (!cloakPresetSelect) return;
	var title = getCloakTitle();
	var favicon = getCloakFaviconHref();
	var match = Object.keys(cloakPresets).find((key) => {
		var preset = cloakPresets[key];
		return preset.title === title && preset.favicon === favicon;
	});
	cloakPresetSelect.value = match || "custom";
}

function hexToRgba(hex, alpha) {
	var value = hex.replace("#", "");
	if (value.length !== 6) return `rgba(255, 255, 255, ${alpha})`;
	var r = parseInt(value.slice(0, 2), 16);
	var g = parseInt(value.slice(2, 4), 16);
	var b = parseInt(value.slice(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyTheme(
	color1 = "#93b8ff",
	color2 = "#8dd8ff",
	bg1 = "#081427",
	bg2 = "#0f2743",
	nav1 = color1,
	nav2 = color2
) {
	document.documentElement.style.setProperty("--team-color-1", color1);
	document.documentElement.style.setProperty("--team-color-2", color2);
	document.documentElement.style.setProperty("--glow-color-1", hexToRgba(color1, 0.35));
	document.documentElement.style.setProperty("--glow-color-2", hexToRgba(color2, 0.2));
	document.documentElement.style.setProperty("--accent-soft", hexToRgba(color1, 0.45));
	document.documentElement.style.setProperty("--bg", bg1);
	document.documentElement.style.setProperty("--bg-darker", bg2);
	document.documentElement.style.setProperty("--bg-card", hexToRgba(bg1, 0.74));
	document.documentElement.style.setProperty("--bg-input", hexToRgba(bg2, 0.72));
	document.documentElement.style.setProperty("--surface-1", hexToRgba(bg1, 0.82));
	document.documentElement.style.setProperty("--surface-2", hexToRgba(bg2, 0.78));
	document.documentElement.style.setProperty("--surface-3", hexToRgba(bg2, 0.56));
	document.documentElement.style.setProperty("--chrome-toolbar-bg", hexToRgba(nav1, 0.78));
	document.documentElement.style.setProperty("--chrome-tabs-bg", hexToRgba(nav2, 0.9));
	document.documentElement.style.setProperty("--chrome-address-bg", hexToRgba(nav1, 0.56));
	document.documentElement.style.setProperty("--chrome-button-bg", hexToRgba(nav2, 0.74));
	document.documentElement.style.setProperty("--chrome-border-color", hexToRgba(nav2, 0.24));
	updateParticleColorFromTheme();
}

var extensionWallpaperStorageKey = "fb_extension_wallpapers";
var wallpaperExtensionEnabledStorageKey = "fb_wallpaper_extension_enabled";
var wallpaperStoreCatalog = [];
var installedExtensionWallpapers = {};
var wallpaperStoreView = "store";
var wallpaperStoreSort = "name";
var wallpaperStoreQuery = "";
var wallpaperStoreSelectedKey = "";
var winterIslandDefaultStoreKey = "store-winter-island";

function sanitizeWallpaperStoreKey(raw, fallback = "wallpaper") {
	var base = String(raw || "").trim().toLowerCase();
	var compact = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
	return compact || fallback;
}

function getWallpaperRegistry() {
	return { ...wallpapers, ...installedExtensionWallpapers };
}

function normalizeStoreWallpaperTheme(theme) {
	var source = typeof theme === "object" && theme ? theme : {};
	return {
		color1: String(source.color1 || "#93b8ff"),
		color2: String(source.color2 || "#8dd8ff"),
		nav1: String(source.nav1 || source.color1 || "#2a4471"),
		nav2: String(source.nav2 || source.color2 || "#16223a"),
		bg1: String(source.bg1 || "#081427"),
		bg2: String(source.bg2 || "#0f2743"),
	};
}

function normalizeStoreWallpaperEntry(rawEntry, index = 0) {
	var item = typeof rawEntry === "object" && rawEntry ? rawEntry : {};
	var keySeed = item.key || item.id || item.slug || item.label || `wallpaper-${index + 1}`;
	var key = sanitizeWallpaperStoreKey(keySeed, `wallpaper-${index + 1}`);
	key = key.replace(/^(store-)+/, "store-");
	if (!key.startsWith("store-")) key = `store-${key}`;
	var label = String(item.label || item.name || item.title || `Wallpaper ${index + 1}`).trim();
	var file = String(item.file || item.url || "").trim();
	var typeRaw = String(item.type || "video").trim().toLowerCase();
	var categoryRaw = String(item.category || "animated-wallpapers").trim().toLowerCase();
	var type = typeRaw === "image" ? "image" : "video";
	var category = categoryRaw || "animated-wallpapers";
	if (!label || !file) return null;
	return {
		key,
		label,
		file,
		type,
		category,
		theme: normalizeStoreWallpaperTheme(item.theme),
	};
}

function readInstalledExtensionWallpapers() {
	try {
		var parsed = JSON.parse(localStorage.getItem(extensionWallpaperStorageKey) || "{}");
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
		var normalized = {};
		Object.entries(parsed).forEach(([key, wallpaper]) => {
			var cleanKey = sanitizeWallpaperStoreKey(key, "");
			if (!cleanKey) return;
			var entry = normalizeStoreWallpaperEntry({ key: cleanKey, ...wallpaper });
			if (!entry) return;
			normalized[entry.key] = {
				label: entry.label,
				category: entry.category,
				type: entry.type,
				file: entry.file,
				theme: entry.theme,
			};
		});
		return normalized;
	} catch {
		return {};
	}
}

function saveInstalledExtensionWallpapers() {
	localStorage.setItem(extensionWallpaperStorageKey, JSON.stringify(installedExtensionWallpapers));
}

function loadInstalledExtensionWallpapers() {
	installedExtensionWallpapers = readInstalledExtensionWallpapers();
	updateExtensionInstallCount();
	loadWallpaperExtensionToggle();
}

function updateExtensionInstallCount() {
	if (!frostedWallpapersInstalledCount) return;
	var total = Object.keys(installedExtensionWallpapers).length;
	frostedWallpapersInstalledCount.textContent = `Wallpapers installed: ${total}`;
}

function isWallpaperExtensionEnabled() {
	return true;
}

function setWallpaperExtensionEnabled(enabled) {
	updateWallpaperExtensionStatusUi();
	renderWallpaperStoreGrid();
}

function loadWallpaperExtensionToggle() {
	updateWallpaperExtensionStatusUi();
}

function updateWallpaperExtensionStatusUi() {
	if (wallpaperExtensionEnabledToggle) wallpaperExtensionEnabledToggle.checked = true;
	if (wallpaperExtensionStatus) wallpaperExtensionStatus.textContent = "Status: On";
}

function isStoreWallpaperInstalled(key) {
	var normalized = String(key || "").trim();
	return Boolean(normalized && installedExtensionWallpapers[normalized]);
}

function getWallpaperStoreEntryByKey(key) {
	var target = String(key || "").trim();
	if (!target) return null;
	return wallpaperStoreCatalog.find((entry) => entry.key === target) || null;
}

function getSelectedWallpaperStoreEntry() {
	return getWallpaperStoreEntryByKey(wallpaperStoreSelectedKey);
}

function getFilteredWallpaperStoreEntries() {
	var base =
		wallpaperStoreView === "installed"
			? wallpaperStoreCatalog.filter((entry) => isStoreWallpaperInstalled(entry.key))
			: wallpaperStoreCatalog.slice();
	var filtered = wallpaperStoreQuery
		? base.filter((entry) => {
				var name = String(entry.label || "").toLowerCase();
				var file = String(entry.file || "").toLowerCase();
				var category = String(entry.category || "").toLowerCase();
				return (
					name.includes(wallpaperStoreQuery) ||
					file.includes(wallpaperStoreQuery) ||
					category.includes(wallpaperStoreQuery)
				);
			})
		: base;
	filtered.sort((a, b) => {
		if (wallpaperStoreSort === "type") {
			return String(a.type || "").localeCompare(String(b.type || "")) || a.label.localeCompare(b.label);
		}
		if (wallpaperStoreSort === "category") {
			return (
				String(a.category || "").localeCompare(String(b.category || "")) ||
				a.label.localeCompare(b.label)
			);
		}
		return a.label.localeCompare(b.label);
	});
	return filtered;
}

function setWallpaperStoreView(nextView) {
	var view = String(nextView || "store").toLowerCase();
	wallpaperStoreView = view === "installed" ? "installed" : "store";
	renderWallpaperStoreGrid();
}

function updateWallpaperStoreTabUi() {
	if (wallpaperStoreTabInstalled) {
		wallpaperStoreTabInstalled.classList.toggle("active", wallpaperStoreView === "installed");
	}
	if (wallpaperStoreTabDiscover) {
		wallpaperStoreTabDiscover.classList.toggle("active", false);
	}
	if (wallpaperStoreTabStore) {
		wallpaperStoreTabStore.classList.toggle("active", wallpaperStoreView === "store");
	}
}

function setWallpaperStoreSelection(entryKey) {
	wallpaperStoreSelectedKey = String(entryKey || "").trim();
	renderWallpaperStoreGrid();
}

function renderWallpaperStorePreview(entry) {
	if (!wallpaperStorePreviewTitle || !wallpaperStorePreviewMeta || !wallpaperStorePreviewMedia) return;
	wallpaperStorePreviewMedia.innerHTML = "";
	if (!entry) {
		wallpaperStorePreviewTitle.textContent = "Select a wallpaper";
		wallpaperStorePreviewMeta.textContent = "No wallpaper selected.";
		var empty = document.createElement("div");
		empty.className = "wallpaper-preview-empty";
		empty.textContent = "Pick a card to preview details.";
		wallpaperStorePreviewMedia.appendChild(empty);
		if (wallpaperStoreInstallBtn) {
			wallpaperStoreInstallBtn.disabled = true;
			wallpaperStoreInstallBtn.style.display = "inline-flex";
		}
		if (wallpaperStoreUninstallBtn) {
			wallpaperStoreUninstallBtn.disabled = true;
			wallpaperStoreUninstallBtn.style.display = "none";
		}
		if (wallpaperStoreApplyBtn) {
			wallpaperStoreApplyBtn.style.display = wallpaperStoreView === "installed" ? "inline-flex" : "none";
			wallpaperStoreApplyBtn.disabled = true;
		}
		return;
	}

	var installed = isStoreWallpaperInstalled(entry.key);
	wallpaperStorePreviewTitle.textContent = entry.label;
	wallpaperStorePreviewMeta.textContent = `${
		entry.type === "video" ? "Animated" : "Static"
	} • ${installed ? "Installed" : "Not installed"}`;

	if (entry.type === "video") {
		var previewVideo = document.createElement("video");
		previewVideo.src = entry.file;
		previewVideo.muted = true;
		previewVideo.autoplay = true;
		previewVideo.loop = true;
		previewVideo.playsInline = true;
		wallpaperStorePreviewMedia.appendChild(previewVideo);
	} else {
		var previewImg = document.createElement("img");
		previewImg.src = entry.file;
		previewImg.alt = entry.label;
		wallpaperStorePreviewMedia.appendChild(previewImg);
	}

	if (wallpaperStoreInstallBtn) {
		wallpaperStoreInstallBtn.disabled = installed;
		wallpaperStoreInstallBtn.textContent = installed ? "Installed" : "Install";
		wallpaperStoreInstallBtn.style.display = "inline-flex";
	}
	if (wallpaperStoreUninstallBtn) {
		wallpaperStoreUninstallBtn.disabled = !installed;
		wallpaperStoreUninstallBtn.style.display = installed ? "inline-flex" : "none";
	}
	if (wallpaperStoreApplyBtn) {
		wallpaperStoreApplyBtn.style.display = wallpaperStoreView === "installed" ? "inline-flex" : "none";
		wallpaperStoreApplyBtn.disabled = !installed || wallpaperStoreView !== "installed";
	}
}
function installWallpaperFromStore(entry) {
	if (!entry?.key) return;
	if (!isWallpaperExtensionEnabled()) return;
	installedExtensionWallpapers[entry.key] = {
		label: entry.label,
		category: entry.category,
		type: entry.type,
		file: entry.file,
		theme: entry.theme,
	};
	saveInstalledExtensionWallpapers();
	updateExtensionInstallCount();
	populateWallpaperOptions();
	renderWallpaperStoreGrid();
}

function uninstallWallpaperFromStore(entry) {
	if (!entry?.key) return;
	if (!isWallpaperExtensionEnabled()) return;
	delete installedExtensionWallpapers[entry.key];
	saveInstalledExtensionWallpapers();
	updateExtensionInstallCount();
	populateWallpaperOptions();
	if (normalizeWallpaperKey(localStorage.getItem(wallpaperKey) || "") === entry.key) {
		applyWallpaper("skynight");
	}
	renderWallpaperStoreGrid();
}

function getWinterIslandStoreEntry() {
	return (
		wallpaperStoreCatalog.find((entry) => entry.key === winterIslandDefaultStoreKey) ||
		wallpaperStoreCatalog.find(
			(entry) =>
				String(entry.label || "").trim().toLowerCase() === "winter island" ||
				String(entry.file || "").trim().toLowerCase().endsWith("/wallpapers/animated/winter.mp4") ||
				String(entry.file || "").trim().toLowerCase() === "wallpapers/animated/winter.mp4"
		) ||
		null
	);
}

function ensureWinterIslandInstalledAndDefault() {
	var entry = getWinterIslandStoreEntry();
	if (!entry) return;
	if (!isStoreWallpaperInstalled(entry.key)) {
		installedExtensionWallpapers[entry.key] = {
			label: entry.label,
			category: entry.category,
			type: entry.type,
			file: entry.file,
			theme: entry.theme,
		};
		saveInstalledExtensionWallpapers();
		updateExtensionInstallCount();
	}
	wallpaperStoreSelectedKey = entry.key;
	populateWallpaperOptions();
	var savedRaw = localStorage.getItem(wallpaperKey);
	var saved = normalizeWallpaperKey(savedRaw || "");
	var shouldApplyDefault = !savedRaw || saved === "skynight";
	if (shouldApplyDefault) {
		applyWallpaper(entry.key);
	}
}

async function loadWallpaperStoreCatalog() {
	if (wallpaperStoreStatus) {
		wallpaperStoreStatus.textContent = "Loading wallpaper store...";
	}
	try {
		var response = await fetch("/wallpaperstore.json", { cache: "no-store" });
		var raw = await response.json().catch(() => []);
		if (!response.ok || !Array.isArray(raw)) {
			wallpaperStoreCatalog = [];
			if (wallpaperStoreStatus) {
				wallpaperStoreStatus.textContent =
					"No store file found. Add /public/wallpaperstore.json to publish wallpapers.";
			}
			renderWallpaperStoreGrid();
			return;
		}
		wallpaperStoreCatalog = raw
			.map((entry, index) => normalizeStoreWallpaperEntry(entry, index))
			.filter(Boolean);
		if (!wallpaperStoreSelectedKey && wallpaperStoreCatalog.length) {
			wallpaperStoreSelectedKey = wallpaperStoreCatalog[0].key;
		}
		ensureWinterIslandInstalledAndDefault();
		if (wallpaperStoreStatus) {
			wallpaperStoreStatus.textContent = `Loaded ${wallpaperStoreCatalog.length} wallpaper${
				wallpaperStoreCatalog.length === 1 ? "" : "s"
			}.`;
		}
		renderWallpaperStoreGrid();
	} catch {
		wallpaperStoreCatalog = [];
		if (wallpaperStoreStatus) {
			wallpaperStoreStatus.textContent =
				"Could not read wallpaperstore.json. Add the file to /public and reload.";
		}
		renderWallpaperStoreGrid();
	}
}

function renderWallpaperStoreGrid() {
	if (!wallpaperStoreGrid) return;
	updateWallpaperStoreTabUi();
	wallpaperStoreGrid.innerHTML = "";
	var rows = getFilteredWallpaperStoreEntries();
	if (wallpaperStoreStatus) {
		wallpaperStoreStatus.textContent = rows.length
			? `${rows.length} wallpaper${rows.length === 1 ? "" : "s"} shown.`
			: "No wallpapers match this filter.";
	}
	if (!rows.length) {
		renderWallpaperStorePreview(null);
		return;
	}

	var selectedEntry = getWallpaperStoreEntryByKey(wallpaperStoreSelectedKey) || rows[0];
	wallpaperStoreSelectedKey = selectedEntry.key;

	rows.forEach((entry) => {
		var card = document.createElement("article");
		card.className = "store-wallpaper-card";
		if (entry.key === wallpaperStoreSelectedKey) {
			card.classList.add("active");
		}
		card.addEventListener("click", () => {
			setWallpaperStoreSelection(entry.key);
			if (
				wallpaperStoreView === "installed" &&
				isWallpaperExtensionEnabled() &&
				isStoreWallpaperInstalled(entry.key)
			) {
				applyWallpaper(entry.key);
			}
		});

		var thumbWrap = document.createElement("div");
		thumbWrap.className = "store-wallpaper-thumb";
		if (entry.type === "video") {
			var thumbVideo = document.createElement("video");
			thumbVideo.src = entry.file;
			thumbVideo.muted = true;
			thumbVideo.loop = true;
			thumbVideo.autoplay = false;
			thumbVideo.playsInline = true;
			thumbVideo.preload = "metadata";
			thumbVideo.disablePictureInPicture = true;
			card.addEventListener("mouseenter", () => {
				var playPromise = thumbVideo.play();
				if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
			});
			card.addEventListener("mouseleave", () => {
				thumbVideo.pause();
				thumbVideo.currentTime = 0;
			});
			thumbWrap.appendChild(thumbVideo);
		} else {
			var thumbImg = document.createElement("img");
			thumbImg.src = entry.file;
			thumbImg.alt = entry.label;
			thumbWrap.appendChild(thumbImg);
		}

		var title = document.createElement("h3");
		title.textContent = entry.label;

		var meta = document.createElement("div");
		meta.className = "settings-hint";
		meta.textContent = `${entry.type === "video" ? "Animated" : "Static"}`;

		var actions = document.createElement("div");
		actions.className = "settings-row wallpaper-store-actions";

		var installBtn = document.createElement("button");
		installBtn.type = "button";
		installBtn.className = "settings-btn wallpaper-store-btn";
		var installed = isStoreWallpaperInstalled(entry.key);
		installBtn.textContent = installed ? "Installed" : "Install";
		installBtn.disabled = installed;
		installBtn.addEventListener("click", (event) => {
			event.stopPropagation();
			installWallpaperFromStore(entry);
		});
		actions.appendChild(installBtn);

		if (wallpaperStoreView === "installed" && installed) {
			var uninstallBtn = document.createElement("button");
			uninstallBtn.type = "button";
			uninstallBtn.className = "settings-btn wallpaper-store-btn";
			uninstallBtn.textContent = "Uninstall";
			uninstallBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				uninstallWallpaperFromStore(entry);
			});
			actions.appendChild(uninstallBtn);
		}

		card.appendChild(thumbWrap);
		card.appendChild(title);
		card.appendChild(meta);
		card.appendChild(actions);
		wallpaperStoreGrid.appendChild(card);
	});

	renderWallpaperStorePreview(getWallpaperStoreEntryByKey(wallpaperStoreSelectedKey));
}
var wallpaperKey = "fb_wallpaper";
var wallpaperRevisionKey = "fb_wallpaper_rev";
var wallpaperVideoElementId = "wallpaperVideo";
var wallpapers = {
	onyx: {
		label: "Onyx",
		category: "wallpapers",
		type: "image",
		file: "wallpapers/onyx.jpg",
		theme: {
			color1: "#000001",
			color2: "#464646",
			nav1: "#12151b",
			nav2: "#3a414f",
			bg1: "#07070a",
			bg2: "#0f1013",
		},
	},
	skynight: {
		label: "Sky Night",
		category: "wallpapers",
		type: "image",
		file: "wallpapers/skynight.jpg",
		theme: {
			color1: "#8ac3d6",
			color2: "#9ab0d8",
			nav1: "#2b4c77",
			nav2: "#1a2f54",
			bg1: "#081427",
			bg2: "#0f2743",
		},
	},
	eveningmountains: {
		label: "Evening Mountains",
		category: "wallpapers",
		type: "image",
		file: "wallpapers/evening-mountains.jpg",
		theme: {
			color1: "#c49564",
			color2: "#7c6454",
			nav1: "#5a3d2c",
			nav2: "#3d2a24",
			bg1: "#1a1622",
			bg2: "#2b2037",
		},
	},
	twilightridge: {
		label: "Twilight Ridge",
		category: "wallpapers",
		type: "image",
		file: "wallpapers/twilight-ridge.png",
		theme: {
			color1: "#a7b7ff",
			color2: "#86d0ff",
			nav1: "#30457d",
			nav2: "#24365f",
			bg1: "#111936",
			bg2: "#1e2a4f",
		},
	},
	winter: {
		label: "Winter (Animated)",
		category: "animated-wallpapers",
		type: "video",
		file: "wallpapers/animated/winter.mp4",
		theme: {
			color1: "#bad9ff",
			color2: "#d9f2ff",
			nav1: "#1f3d66",
			nav2: "#17304f",
			bg1: "#09192a",
			bg2: "#10253f",
		},
	},
};
var wallpaperCategoryLabels = {
	wallpapers: "Wallpapers",
	"animated-wallpapers": "Animated Wallpapers",
};
var defaultWallpaperTheme = {
	color1: "#93b8ff",
	color2: "#8dd8ff",
	nav1: "#2a4471",
	nav2: "#16223a",
	bg1: "#081427",
	bg2: "#0f2743",
};

function normalizeWallpaperKey(value) {
	var key = String(value || "").trim().toLowerCase();
	var registry = getWallpaperRegistry();
	if (registry[key]) return key;
	var compact = key.replace(/[^a-z0-9]/g, "");
	return registry[compact] ? compact : "skynight";
}

function getWallpaperFile(key) {
	var normalized = normalizeWallpaperKey(key);
	var registry = getWallpaperRegistry();
	var file = registry[normalized]?.file || wallpapers.skynight.file;
	try {
		return new URL(file, window.location.href).toString();
	} catch {
		return file;
	}
}

function getWallpaperType(key) {
	var normalized = normalizeWallpaperKey(key);
	var registry = getWallpaperRegistry();
	return registry[normalized]?.type === "video" ? "video" : "image";
}

function getWallpaperTheme(key) {
	var normalized = normalizeWallpaperKey(key);
	var registry = getWallpaperRegistry();
	var theme = registry[normalized]?.theme;
	if (!theme) return defaultWallpaperTheme;
	return {
		color1: theme.color1 || defaultWallpaperTheme.color1,
		color2: theme.color2 || defaultWallpaperTheme.color2,
		nav1: theme.nav1 || theme.color1 || defaultWallpaperTheme.nav1,
		nav2: theme.nav2 || theme.color2 || defaultWallpaperTheme.nav2,
		bg1: theme.bg1 || defaultWallpaperTheme.bg1,
		bg2: theme.bg2 || defaultWallpaperTheme.bg2,
	};
}

function getWallpaperRevision() {
	var raw = Number.parseInt(localStorage.getItem(wallpaperRevisionKey) || "0", 10);
	return Number.isFinite(raw) ? raw : 0;
}

function bumpWallpaperRevision() {
	var next = getWallpaperRevision() + 1;
	localStorage.setItem(wallpaperRevisionKey, String(next));
	return next;
}

function buildWallpaperAssetUrl(key, revision = getWallpaperRevision()) {
	var wallpaperFile = getWallpaperFile(key);
	try {
		var url = new URL(wallpaperFile, window.location.href);
		url.searchParams.set("v", String(revision));
		return url.toString();
	} catch {
		var separator = String(wallpaperFile).includes("?") ? "&" : "?";
		return `${wallpaperFile}${separator}v=${revision}`;
	}
}

function buildWallpaperCssValue(key, revision = getWallpaperRevision()) {
	return `url("${buildWallpaperAssetUrl(key, revision)}")`;
}

function ensureWallpaperVideoElement() {
	var videoEl = document.getElementById(wallpaperVideoElementId);
	if (videoEl) return videoEl;
	videoEl = document.createElement("video");
	videoEl.id = wallpaperVideoElementId;
	videoEl.className = "wallpaper-video";
	videoEl.muted = true;
	videoEl.defaultMuted = true;
	videoEl.loop = true;
	videoEl.autoplay = true;
	videoEl.playsInline = true;
	videoEl.setAttribute("aria-hidden", "true");
	videoEl.setAttribute("tabindex", "-1");
	var firstChild = document.body.firstChild;
	if (firstChild) document.body.insertBefore(videoEl, firstChild);
	else document.body.appendChild(videoEl);
	return videoEl;
}

function showWallpaperVideo(videoUrl) {
	var videoEl = ensureWallpaperVideoElement();
	if (!videoUrl) return;
	if (videoEl.dataset.src !== videoUrl) {
		videoEl.src = videoUrl;
		videoEl.dataset.src = videoUrl;
		videoEl.load();
	}
	document.body.classList.add("has-video-wallpaper");
	videoEl.classList.add("is-active");
	var playResult = videoEl.play();
	if (playResult && typeof playResult.catch === "function") {
		playResult.catch(() => {});
	}
}

function hideWallpaperVideo() {
	var videoEl = document.getElementById(wallpaperVideoElementId);
	document.body.classList.remove("has-video-wallpaper");
	if (!videoEl) return;
	videoEl.classList.remove("is-active");
	videoEl.pause();
	videoEl.removeAttribute("src");
	videoEl.dataset.src = "";
	videoEl.load();
}

function renderWallpaperBackground(wallpaperCssUrl) {
	var value = String(wallpaperCssUrl || "").trim() || "none";
	document.documentElement.style.setProperty("--wallpaper-image", value);
	document.body.style.backgroundImage =
		`linear-gradient(180deg, rgba(5, 13, 26, 0.36), rgba(9, 20, 36, 0.58)), ${value}, ` +
		"linear-gradient(180deg, var(--bg), var(--bg-darker))";
}

function applyWallpaper(key) {
	var normalized = normalizeWallpaperKey(key);
	var revision = bumpWallpaperRevision();
	var theme = getWallpaperTheme(normalized);
	var wallpaperType = getWallpaperType(normalized);
	if (wallpaperType === "video") {
		showWallpaperVideo(buildWallpaperAssetUrl(normalized, revision));
		renderWallpaperBackground("");
	} else {
		hideWallpaperVideo();
		renderWallpaperBackground(buildWallpaperCssValue(normalized, revision));
	}
	document.body.dataset.wallpaper = normalized;
	if (wallpaperSelect) wallpaperSelect.value = normalized;
	localStorage.setItem(wallpaperKey, normalized);
	applyTheme(theme.color1, theme.color2, theme.bg1, theme.bg2, theme.nav1, theme.nav2);
}

function populateWallpaperOptions() {
	if (!wallpaperSelect) return;
	wallpaperSelect.innerHTML = "";
	var categoryGroups = new Map();
	Object.entries(getWallpaperRegistry()).forEach(([key, wallpaper]) => {
		var categoryKey =
			typeof wallpaper.category === "string" && wallpaper.category
				? wallpaper.category
				: "wallpapers";
		if (!categoryGroups.has(categoryKey)) {
			var group = document.createElement("optgroup");
			group.label = wallpaperCategoryLabels[categoryKey] || "Wallpapers";
			categoryGroups.set(categoryKey, group);
		}
		var option = document.createElement("option");
		option.value = key;
		option.textContent = wallpaper.label;
		categoryGroups.get(categoryKey).appendChild(option);
	});
	var orderedCategories = ["wallpapers", "animated-wallpapers"];
	orderedCategories.forEach((category) => {
		var group = categoryGroups.get(category);
		if (group && group.children.length) wallpaperSelect.appendChild(group);
		categoryGroups.delete(category);
	});
	categoryGroups.forEach((group) => {
		if (group.children.length) wallpaperSelect.appendChild(group);
	});
}

function loadWallpaper() {
	var saved = normalizeWallpaperKey(localStorage.getItem(wallpaperKey) || "skynight");
	applyWallpaper(saved);
}

function bootstrapWallpaperFromStorage() {
	var saved = normalizeWallpaperKey(localStorage.getItem(wallpaperKey) || "skynight");
	var theme = getWallpaperTheme(saved);
	if (getWallpaperType(saved) === "video") {
		showWallpaperVideo(buildWallpaperAssetUrl(saved));
		renderWallpaperBackground("");
	} else {
		hideWallpaperVideo();
		renderWallpaperBackground(buildWallpaperCssValue(saved));
	}
	document.body.dataset.wallpaper = saved;
	applyTheme(theme.color1, theme.color2, theme.bg1, theme.bg2, theme.nav1, theme.nav2);
}

var panicKeyStorage = "fb_panic_key";
var panicUrlStorage = "fb_panic_url";
var panicDefaultKey = "`";
var panicDefaultUrl = "https://google.com";
var openModeStorage = "fb_open_mode";
var isListeningForKey = false;
var ignoreNextPanicPress = false;

function getPanicKey() {
	var raw = localStorage.getItem(panicKeyStorage);
	return raw && raw.length ? raw : panicDefaultKey;
}

function getPanicKeyDisplayValue(inputKey) {
	var key = inputKey || getPanicKey();
	var codeLabels = {
		Minus: "-",
		Equal: "=",
		Backquote: "`",
		BracketLeft: "[",
		BracketRight: "]",
		Backslash: "\\",
		Semicolon: ";",
		Quote: "'",
		Comma: ",",
		Period: ".",
		Slash: "/",
		Space: "Space",
	};
	if (codeLabels[key]) return codeLabels[key];
	if (/^Key[A-Z]$/.test(key)) return key.slice(3);
	if (/^Digit[0-9]$/.test(key)) return key.slice(5);
	return key;
}

function normalizePanicKey(value) {
	var key = String(value || "").trim();
	if (!key) return "";
	return key.length === 1 ? key.toLowerCase() : key;
}

function panicKeyMatches(event) {
	var configured = getPanicKey();
	var normalizedConfigured = normalizePanicKey(configured);
	var normalizedEventKey = normalizePanicKey(event.key);
	if (normalizedConfigured && normalizedEventKey === normalizedConfigured) {
		return true;
	}
	if (configured && event.code && configured === event.code) {
		return true;
	}
	return false;
}

function getPanicUrl() {
	var raw = (localStorage.getItem(panicUrlStorage) || "").trim();
	return raw || panicDefaultUrl;
}

function loadPanicSettings() {
	if (currentPanicKey) currentPanicKey.textContent = getPanicKeyDisplayValue();
	panicUrlInput.value = getPanicUrl();
	if (panicStatus) panicStatus.textContent = "Panic key is active";
}

function loadOpenModeSettings() {
	var raw = String(localStorage.getItem(openModeStorage) || "aboutblank").toLowerCase();
	var allowed = new Set(["aboutblank", "blob"]);
	var selected = allowed.has(raw) ? raw : "aboutblank";
	updateOpenModeUI(selected);
	if (raw !== selected) {
		localStorage.setItem(openModeStorage, selected);
	}
	if (openModeStatus) {
		openModeStatus.textContent = `Open mode set to ${
			selected === "blob" ? "blob:." : "about:blank."
		}`;
	}
}

function setOpenMode(mode, shouldLaunch = false) {
	var selected = mode === "blob" ? mode : "aboutblank";
	localStorage.setItem(openModeStorage, selected);
	updateOpenModeUI(selected);
	if (openModeStatus) {
		openModeStatus.textContent = `Open mode set to ${
			selected === "blob" ? "blob:." : "about:blank."
		}`;
	}
	if (shouldLaunch) {
		openCurrentPageInMode(selected);
	}
}

function buildWrapperHtml(appUrl, mode = "aboutblank") {
	var safeSrc = escapeHtml(appUrl);
	var wrapperConfig = {
		cloakEnabled: isCloakEnabled(),
		cloakTitle: getCloakTitle(),
		cloakFavicon: getCloakFaviconHref(),
		visibleTitle: visibleAppTitle,
		visibleFavicon: visibleFaviconHref,
	};
	var configJson = JSON.stringify(wrapperConfig).replace(/</g, "\\u003c");
	return (
		`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(visibleAppTitle)}</title>` +
		`<style>html,body,iframe{margin:0;padding:0;width:100%;height:100%;border:0;overflow:hidden;background:#000;}</style>` +
		`<link rel="icon" href="${escapeHtml(visibleFaviconHref)}">` +
		`</head><body><iframe referrerpolicy="no-referrer" src="${safeSrc}"></iframe>` +
		`<script>
		(function(){
			var cfg = ${configJson};
			function setFavicon(href){
				var link=document.querySelector("link[rel~='icon']");
				if(!link){link=document.createElement('link');link.setAttribute('rel','icon');document.head.appendChild(link);}
				link.setAttribute('href', href);
			}
			function applyCloak(isHidden){
				var useCloak = !!cfg.cloakEnabled && !!isHidden;
				document.title = useCloak ? cfg.cloakTitle : cfg.visibleTitle;
				setFavicon(useCloak ? cfg.cloakFavicon : cfg.visibleFavicon);
			}
			document.addEventListener('visibilitychange', function(){
				applyCloak(document.hidden || !document.hasFocus());
			});
			window.addEventListener('blur', function(){ applyCloak(true); });
			window.addEventListener('focus', function(){ applyCloak(document.hidden || !document.hasFocus()); });
			window.addEventListener('message', function(ev){
				var data = ev && ev.data;
				if(!data || data.type !== 'fb-cloak-state') return;
				if(typeof data.enabled === 'boolean') cfg.cloakEnabled = data.enabled;
				if(typeof data.title === 'string') cfg.cloakTitle = data.title;
				if(typeof data.favicon === 'string') cfg.cloakFavicon = data.favicon;
				if(typeof data.visibleTitle === 'string') cfg.visibleTitle = data.visibleTitle;
				if(typeof data.visibleFavicon === 'string') cfg.visibleFavicon = data.visibleFavicon;
				applyCloak(document.hidden || !document.hasFocus());
			});
			applyCloak(document.hidden || !document.hasFocus());
		})();
		<\/script></body></html>`
	);
}
function updateOpenModeUI(selected) {
	if (openModeAboutBtn) {
		openModeAboutBtn.classList.toggle("active", selected === "aboutblank");
	}
	if (openModeBlobBtn) {
		openModeBlobBtn.classList.toggle("active", selected === "blob");
	}

}

function openCurrentPageInMode(mode) {
	var appUrl = window.location.href;
	var selected = mode === "blob" ? mode : "aboutblank";
	var wrapperHtml = buildWrapperHtml(appUrl, selected);
	if (selected === "aboutblank") {
		var popup = window.open("about:blank", "_blank");
		if (!popup) {
			if (openModeStatus) openModeStatus.textContent = "Popup blocked. Allow popups for this site.";
			return;
		}
		try {
			popup.document.open();
			popup.document.write(wrapperHtml);
			popup.document.close();
			if (openModeStatus) {
				openModeStatus.textContent =
					"Opened in about:blank.";
			}
		} catch {
			var fallbackBlob = new Blob([wrapperHtml], { type: "text/html;charset=utf-8" });
			var fallbackBlobUrl = URL.createObjectURL(fallbackBlob);
			try {
				popup.location.replace(fallbackBlobUrl);
			} catch {
				window.location.href = fallbackBlobUrl;
			}
			setTimeout(() => {
				URL.revokeObjectURL(fallbackBlobUrl);
			}, 600_000);
			if (openModeStatus) {
				openModeStatus.textContent = "Popup restricted; opened in blob fallback.";
			}
		}
		return;
	}

	var blob = new Blob([wrapperHtml], { type: "text/html;charset=utf-8" });
	var blobUrl = URL.createObjectURL(blob);
	if (openModeStatus) openModeStatus.textContent = "Opened in blob: (same tab).";
	window.location.replace(blobUrl);
}

function navigateToPanicUrl() {
	var target = getPanicUrl();
	try {
		if (window.top && window.top !== window) {
			window.top.location.href = target;
			return;
		}
	} catch {
	}
	window.location.href = target;
}

function broadcastCloakStateToParent(payload) {
	if (window.parent && window.parent !== window) {
		window.parent.postMessage({ type: "fb-cloak-state", ...payload }, "*");
	}
}

function listenForPanicKey() {
	isListeningForKey = true;
	if (listeningStatus) {
		listeningStatus.textContent = "Press any key to set as panic key...";
	}

	var tempKeyListener = (e) => {
		if (!isListeningForKey) return;
		e.preventDefault();
		if (["Control", "Shift", "Alt", "Meta", "Tab", "CapsLock"].includes(e.key)) {
			if (listeningStatus) {
				listeningStatus.textContent = "Cannot use modifier keys. Try another key.";
			}
			return;
		}

		var physicalCode = String(e.code || "").trim();
		var stored = physicalCode && physicalCode !== "Unidentified" ? physicalCode : e.key;
		var displayValue = getPanicKeyDisplayValue(stored) || e.key;
		localStorage.setItem(panicKeyStorage, stored);
		if (currentPanicKey) currentPanicKey.textContent = displayValue;
		if (panicStatus) panicStatus.textContent = `Panic key saved: ${displayValue}`;
		isListeningForKey = false;
		ignoreNextPanicPress = true;
		document.removeEventListener("keydown", tempKeyListener);
		if (listeningStatus) listeningStatus.textContent = `Panic key set to: ${displayValue}`;
		setTimeout(() => {
			if (listeningStatus) listeningStatus.textContent = "";
		}, 2000);
	};

	document.addEventListener("keydown", tempKeyListener);
}

function savePanicUrl() {
	var url = (panicUrlInput.value || "").trim();
	if (!/^https?:\/\//i.test(url)) {
		if (panicStatus) panicStatus.textContent = "Please enter a valid URL (include http:// or https://)";
		return;
	}
	localStorage.setItem(panicUrlStorage, url);
	if (panicStatus) panicStatus.textContent = "Settings saved successfully!";
	setTimeout(() => {
		if (panicStatus) panicStatus.textContent = "Panic key is active";
	}, 2000);
}

function showLoading(show) {
	if (!loadingBanner) return;
	loadingBanner.classList.toggle("show", show);
}

function showError(title, detail) {
	if (errorTitle) errorTitle.textContent = title;
	if (errorDetails) errorDetails.textContent = detail ? String(detail) : "";
	if (errorPanel) errorPanel.classList.add("show");
}

function injectErudaIntoActiveTab() {
	var tab = getActiveTab();
	if (!tab) return;
	var frameItem = tabFrames.get(tab.id);
	var targetWindow = frameItem?.element?.contentWindow;
	if (!targetWindow) return;

	try {
		var targetDocument = targetWindow.document;
		if (targetDocument.getElementById("fb-eruda-script")) {
			targetWindow.eruda?.init?.();
			return;
		}
		var script = targetDocument.createElement("script");
		script.id = "fb-eruda-script";
		script.src = "//cdn.jsdelivr.net/npm/eruda";
		targetDocument.body.appendChild(script);
		script.onload = function () {
			targetWindow.eruda?.init?.();
		};
	} catch {
		try {
			targetWindow.eval(
				"(function () { var script = document.createElement('script'); script.id='fb-eruda-script'; script.src='//cdn.jsdelivr.net/npm/eruda'; document.body.appendChild(script); script.onload = function () { eruda.init() }; })();"
			);
		} catch {
		}
	}
}

function resetError() {
	if (errorTitle) errorTitle.textContent = "";
	if (errorDetails) errorDetails.textContent = "";
	if (errorPanel) errorPanel.classList.remove("show");
}

bootstrapWallpaperFromStorage();
init();

var initialLoadingPopupHidden = false;
function hideInitialLoadingPopup() {
	if (initialLoadingPopupHidden) return;
	initialLoadingPopupHidden = true;
	showLoading(false);
}

if (document.readyState === "complete" || document.readyState === "interactive") {
	hideInitialLoadingPopup();
} else {
	document.addEventListener("DOMContentLoaded", hideInitialLoadingPopup, { once: true });
	window.addEventListener("load", hideInitialLoadingPopup, { once: true });
}

setTimeout(hideInitialLoadingPopup, 1200);