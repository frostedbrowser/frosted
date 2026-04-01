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
const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

const tabsEl = qs("#tabs");
const tabCounter = qs("#tabCounter");
const newTabBtn = qs("#newTabBtn");
const toolbarForm = qs("#toolbarForm");
const homeForm = qs("#homeForm");
const addressInput = qs("#addressInput");
const partnershipBtn = qs("#partnershipBtn");
const homeSearchInput = qs("#homeSearchInput");
const backBtn = qs("#backBtn");
const forwardBtn = qs("#forwardBtn");
const reloadBtn = qs("#reloadBtn");
const homeBtn = qs("#homeBtn");
const gamesBtn = qs("#gamesBtn");
const aiBtn = qs("#aiBtn");
const codeBtn = qs("#codeBtn");
const adsToggleBtn = qs("#adsToggleBtn");
const settingsBtn = qs("#settingsBtn");
const blankState = qs("#blankState");
const loadingBanner = qs("#loadingBanner");
const browserStage = qs(".browser-stage");
const searchEngine = qs("#sj-search-engine");
const randomTagline = qs("#randomTagline");
const historyContainer = qs("#historyContainer");
const particlesLayer = qs("#particles-js");

const settingsPage = qs("#settingsPage");
const creditsPage = qs("#creditsPage");
const partnersPage = qs("#partnersPage");
const gamesPage = qs("#gamesPage");
const aiPage = qs("#aiPage");
const gamesGrid = qs("#gamesGrid");
const gamesCount = qs("#gamesCount");
const gamesSearchInput = qs("#gamesSearchInput");
const aiPromptInput = qs("#aiPromptInput");
const aiSolveBtn = qs("#aiSolveBtn");
const aiResult = qs("#aiResult");
const aiModelSelect = qs("#aiModelSelect");
const creditsLink = qs("#creditsLink");
const wallpaperSelect = qs("#wallpaperSelect");

const currentPanicKey = qs("#current-panic-key");
const changePanicKeyBtn = qs("#change-panic-key-btn");
const listeningStatus = qs("#listening-status");
const panicUrlInput = qs("#panic-url");
const panicUrlSaveBtn = qs("#save-panic-btn");
const panicStatus = qs("#panic-status");
const openModeAboutBtn = qs("#openModeAboutBtn");
const openModeBlobBtn = qs("#openModeBlobBtn");
const openModeStatus = qs("#openModeStatus");


const cloakEnabledToggle = qs("#cloakEnabledToggle");
const cloakTitleInput = qs("#cloak-title");
const cloakFaviconInput = qs("#cloak-favicon");
const cloakPresetSelect = qs("#cloakPresetSelect");
const cloakTitleSaveBtn = qs("#save-cloak-title-btn");
const cloakFaviconSaveBtn = qs("#save-cloak-favicon-btn");
const cloakStatus = qs("#cloak-status");
const faviconLink = document.querySelector("link[rel~='icon']");

const errorPanel = qs("#error-panel");
const errorTitle = qs("#sj-error");
const errorDetails = qs("#sj-error-code");

const { ScramjetController } = $scramjetLoadController();
const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});
scramjet.init();

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

let tabs = [];
let activeTabId = null;
let nextTabId = 1;
let transportReady = false;
const tabFrames = new Map();
const aiChatHistory = [];
let aiTypingRunId = 0;
const aiUiThread = [];
let gamesCatalog = [];
const gameBlobUrlsByTab = new Map();
const rawHtmlFallbackTriedUrlByTab = new Map();
const pendingGameClickScriptsByTab = new Map();
const gameClickScriptDelayMs = 4200;
let particleCanvas = null;
let particleCtx = null;
let particleDots = [];
let matrixDrops = [];
let matrixFontSize = 14;
let particleMode = "dots";
const matrixGlyphs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-=<>[]{}()/\\|";
let particleFrameId = 0;
let particleResizeFrameId = 0;
let particleLastTs = 0;
let particleRgb = { r: 136, g: 192, b: 208 };
let particleAltRgb = { r: 129, g: 161, b: 193 };
let particleBgRgb = { r: 10, g: 15, b: 20 };
let ghosteryEngine = null;
let ghosteryRequestCtor = null;
let ghosteryEnginePromise = null;
const reducedMotionQuery = window.matchMedia
	? window.matchMedia("(prefers-reduced-motion: reduce)")
	: null;

const taglines = [
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

const chromeBarConfig = {
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
	const root = document.documentElement;
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

	if (randomTagline) {
		randomTagline.textContent = taglines[Math.floor(Math.random() * taglines.length)];
	}

	populateWallpaperOptions();
	loadWallpaper();
	initParticles();
	loadPanicSettings();
	loadOpenModeSettings();
	loadCloakSettings();
	applyCloakVisualState(document.hidden || !document.hasFocus());
	runStartupBrandSequence();
	loadAiMode();
	createTab("");
	bindEvents();
	renderHistory();
	void loadGamesCatalog();
}

const startupBrandTitle = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
const startupBrandFaviconHref = "ixl.ico";
const startupBrandDurationMs = 120;
const autoOpenAboutBlankAfterStartup = true;
const autoOpenAboutBlankDelayMs = 180;
const autoOpenAboutBlankSessionKey = "fb_auto_aboutblank_done";

function runStartupBrandSequence() {
	document.title = startupBrandTitle;
	setDocumentFavicon(`${startupBrandFaviconHref}?startup=1`);

	setTimeout(() => {
		applyCloakVisualState(document.hidden || !document.hasFocus());
		maybeAutoOpenAboutBlankAfterStartup();
	}, startupBrandDurationMs);
}

function maybeAutoOpenAboutBlankAfterStartup() {
	if (!autoOpenAboutBlankAfterStartup) return;
	try {
		if (window.top && window.top !== window) return;
	} catch {
		return;
	}
	try {
		if (sessionStorage.getItem(autoOpenAboutBlankSessionKey) === "1") return;
		sessionStorage.setItem(autoOpenAboutBlankSessionKey, "1");
	} catch {
	}
	setTimeout(() => {
		openCurrentPageInMode("aboutblank");
	}, autoOpenAboutBlankDelayMs);
}

const gamesInternalUrl = "bypass://games";
const aiInternalUrl = "bypass://ai";
const partnersInternalUrl = "bypass://partners";
const aiModeKey = "fb_ai_mode";

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
	homeForm.addEventListener("submit", (e) => {
		e.preventDefault();
		navigateFromInput(homeSearchInput.value);
	});

	backBtn.addEventListener("click", goBack);
	forwardBtn.addEventListener("click", goForward);
	reloadBtn.addEventListener("click", reloadActive);
	homeBtn.addEventListener("click", goHome);

	gamesBtn.addEventListener("click", () => navigateFromInput(gamesInternalUrl));
	aiBtn.addEventListener("click", () => navigateFromInput(aiInternalUrl));
	if (codeBtn) {
		codeBtn.addEventListener("click", injectErudaIntoActiveTab);
	}
	if (adsToggleBtn) {
		adsToggleBtn.addEventListener("click", toggleAdblock);
	}
	settingsBtn.addEventListener("click", () => navigateFromInput("bypass://settings"));
	if (creditsLink) {
		creditsLink.addEventListener("click", (event) => {
			event.preventDefault();
			navigateFromInput("bypass://credits");
		});
	}

	qsa(".home-tile").forEach((tile) => {
		tile.addEventListener("click", () => {
			if (tile.dataset.url) navigateFromInput(tile.dataset.url);
		});
	});

	if (wallpaperSelect) {
		wallpaperSelect.addEventListener("change", () => {
			applyWallpaper(wallpaperSelect.value);
		});
	}

	changePanicKeyBtn.addEventListener("click", listenForPanicKey);
	panicUrlSaveBtn.addEventListener("click", savePanicUrl);
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
			const value = String(cloakPresetSelect.value || "custom");
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
	const width = Math.max(1, Math.floor(particlesLayer.clientWidth || window.innerWidth));
	const height = Math.max(1, Math.floor(particlesLayer.clientHeight || window.innerHeight));
	const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
	const area = width * height;
	const count = Math.max(34, Math.min(92, Math.round(area / 17000)));
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
	const columns = Math.max(1, Math.floor(width / matrixFontSize));
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
	const matrixActive = isMatrixThemeActive();
	const onBlank = blankState?.style.display === "flex";
	const onInternal =
		settingsPage?.classList.contains("active") ||
		gamesPage?.classList.contains("active") ||
		aiPage?.classList.contains("active") ||
		partnersPage?.classList.contains("active") ||
		creditsPage?.classList.contains("active");
	if (onBlank) return true;
	if (onInternal) return matrixActive;
	return false;
}

function tickParticles(ts) {
	if (!particleCtx || !particleCanvas) return;
	if (!particleLastTs) particleLastTs = ts;
	const dt = Math.min(32, ts - particleLastTs);
	particleLastTs = ts;
	const width = parseFloat(particleCanvas.style.width) || window.innerWidth;
	const height = parseFloat(particleCanvas.style.height) || window.innerHeight;
	const speedBase = dt / 16.666;
	const speed = reducedMotionQuery?.matches && particleMode === "matrix" ? speedBase * 0.45 : speedBase;
	const t = ts / 1000;

	if (particleMode === "matrix") {
		drawMatrixRain(width, height, speed);
		particleFrameId = requestAnimationFrame(tickParticles);
		return;
	}

	for (const dot of particleDots) {
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
	const width = parseFloat(particleCanvas.style.width) || window.innerWidth;
	const height = parseFloat(particleCanvas.style.height) || window.innerHeight;

	if (particleMode === "matrix") {
		particleCtx.fillStyle = `rgba(${particleBgRgb.r}, ${particleBgRgb.g}, ${particleBgRgb.b}, 1)`;
		particleCtx.fillRect(0, 0, width, height);
		drawMatrixRain(width, height, 0);
		return;
	}

	particleCtx.clearRect(0, 0, width, height);
	for (const dot of particleDots) {
		particleCtx.beginPath();
		particleCtx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
		const mix = dot.colorMix;
		const r = Math.round(particleRgb.r * (1 - mix) + particleAltRgb.r * mix);
		const g = Math.round(particleRgb.g * (1 - mix) + particleAltRgb.g * mix);
		const b = Math.round(particleRgb.b * (1 - mix) + particleAltRgb.b * mix);
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

	for (let i = 0; i < matrixDrops.length; i++) {
		const x = i * matrixFontSize;
		const y = matrixDrops[i];
		const mix = (i % 5) / 4;
		const r = Math.round(particleRgb.r * (1 - mix) + particleAltRgb.r * mix);
		const g = Math.round(particleRgb.g * (1 - mix) + particleAltRgb.g * mix);
		const b = Math.round(particleRgb.b * (1 - mix) + particleAltRgb.b * mix);
		const trail = 11 + (i % 10);
		for (let t = trail; t >= 0; t--) {
			const ty = y - t * matrixFontSize;
			if (ty < -matrixFontSize || ty > height + matrixFontSize) continue;
			const char = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
			const alpha = Math.max(0.1, 0.9 - t * 0.07);
			particleCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
			particleCtx.fillText(char, x, ty);
		}
		const headChar = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
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
	const style = getComputedStyle(document.documentElement);
	const teamColor = style.getPropertyValue("--team-color-1").trim() || "#88c0d0";
	const teamColorAlt = style.getPropertyValue("--team-color-2").trim() || "#81a1c1";
	const bgColor = style.getPropertyValue("--bg").trim() || "#0a0f14";
	particleRgb = parseHexToRgb(teamColor) || { r: 136, g: 192, b: 208 };
	particleAltRgb = parseHexToRgb(teamColorAlt) || { r: 129, g: 161, b: 193 };
	particleBgRgb = parseHexToRgb(bgColor) || { r: 10, g: 15, b: 20 };
	const nextMode = isMatrixThemeActive() ? "matrix" : "dots";
	document.body.classList.toggle("matrix-theme-active", nextMode === "matrix");
	if (nextMode !== particleMode) {
		particleMode = nextMode;
		resizeParticles();
		restartParticlesAnimation();
	}
	setParticlesVisible(shouldShowParticlesForCurrentView());
}

function parseHexToRgb(value) {
	const raw = String(value || "").trim().replace("#", "");
	if (!/^[0-9a-fA-F]{6}$/.test(raw)) return null;
	return {
		r: parseInt(raw.slice(0, 2), 16),
		g: parseInt(raw.slice(2, 4), 16),
		b: parseInt(raw.slice(4, 6), 16),
	};
}

function createTab(url) {
	const tab = {
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

function closeTab(id) {
	const idx = tabs.findIndex((t) => t.id === id);
	if (idx === -1) return;
	const [removed] = tabs.splice(idx, 1);
	const oldGameBlob = gameBlobUrlsByTab.get(removed.id);
	if (oldGameBlob) {
		URL.revokeObjectURL(oldGameBlob);
		gameBlobUrlsByTab.delete(removed.id);
	}
	rawHtmlFallbackTriedUrlByTab.delete(removed.id);
	const frame = tabFrames.get(removed.id);
	if (frame) {
		frame.element.remove();
		tabFrames.delete(removed.id);
	}

	if (!tabs.length) {
		createTab("");
		return;
	}
	if (activeTabId === id) {
		const next = tabs[Math.max(0, idx - 1)];
		setActiveTab(next.id, true);
	}
	renderTabs();
}

function setActiveTab(id, keepView) {
	activeTabId = id;
	const tab = getActiveTab();
	if (!tab) return;

	if (!tab.url) {
		addressInput.value = "";
		homeSearchInput.value = "";
		showBlank();
	} else if (tab.url === "bypass://settings") {
		showSettingsPage();
	} else if (isGamesInternalUrl(tab.url)) {
		showGamesPage();
	} else if (isAiInternalUrl(tab.url)) {
		showAiPage();
	} else if (tab.url === "bypass://credits") {
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
		const node = document.createElement("div");
		node.className = `tab${tab.id === activeTabId ? " active" : ""}`;
		node.dataset.tabId = tab.id;

		const favicon = document.createElement("img");
		favicon.className = "tab-favicon";
		favicon.alt = "";
		const faviconCandidates = getTabFaviconCandidates(tab.url);
		let faviconIdx = 0;
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

		const title = document.createElement("span");
		title.className = "tab-title";
		title.textContent = tab.title || "New Tab";
		node.appendChild(title);

		const close = document.createElement("button");
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
	const widthTabCount = Math.min(Math.max(tabs.length, 1), 10);
	const tabsRowEl = tabsEl.closest(".tabs-row");
	if (tabsRowEl) {
		tabsRowEl.style.setProperty("--tab-count-for-width", String(widthTabCount));
	}
}

function getTabFaviconCandidates(url) {
	if (!url) return ["favicon.ico"];
	if (url === "bypass://settings" || url === "bypass://credits" || isPartnersInternalUrl(url)) return ["favicon.ico"];
	if (isGamesInternalUrl(url)) return ["favicon.ico"];
	if (isAiInternalUrl(url)) return ["chatgpt-logo.svg"];
	try {
		const host = new URL(url).hostname;
		if (!host) return ["favicon.ico"];
		return [
			`https://${host}/favicon.ico`,
			`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`,
			`https://icons.duckduckgo.com/ip3/${encodeURIComponent(host)}.ico`,
			"favicon.ico",
		];
	} catch {
		return ["favicon.ico"];
	}
}

function getActiveTab() {
	return tabs.find((tab) => tab.id === activeTabId) || null;
}

function getDisplayTitle(url) {
	if (!url) return "New Tab";
	if (url === "bypass://settings") return "Settings";
	if (isPartnersInternalUrl(url)) return "Partners";
	if (isGamesInternalUrl(url)) return "Games";
	if (isAiInternalUrl(url)) return "AI";
	if (url === "bypass://credits") return "Credits";
	try {
		const parsed = new URL(url);
		return parsed.hostname.slice(0, 24);
	} catch {
		return url.slice(0, 24);
	}
}

function normalizeInput(input) {
	if (!input || !searchEngine) return "";
	const raw = String(input).trim();
	if (raw.toLowerCase() === "bypass://settings") return "bypass://settings";
	if (isPartnersInternalUrl(raw)) return partnersInternalUrl;
	if (isGamesInternalUrl(raw)) return gamesInternalUrl;
	if (isAiInternalUrl(raw)) return aiInternalUrl;
	if (raw.toLowerCase() === "bypass://credits") return "bypass://credits";
	return search(raw, searchEngine.value);
}

async function navigateFromInput(input, pushHistory = true) {
	const target = normalizeInput(input);
	if (!target) return;
	await loadUrl(target, pushHistory);
}

const adblockHostPatterns = [
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

const adblockUrlPatterns = [
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

const adblockEnabledStorage = "fb_adblock_enabled";

function isAdblockEnabled() {
	const raw = localStorage.getItem(adblockEnabledStorage);
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
	const enabled = isAdblockEnabled();
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
			let mod = null;
			const moduleCandidates = [
				// Browser-bundled module (no bare package specifiers).
				"https://esm.sh/@ghostery/adblocker?bundle",
				// Legacy local path fallback (works only if pre-bundled in this project).
				"/vendor/adblocker/index.js",
			];
			let lastError = null;
			for (const candidate of moduleCandidates) {
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
			const FiltersEngine = mod?.FiltersEngine;
			const RequestCtor = mod?.Request;
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
	const raw = String(type || "other").trim().toLowerCase();
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
	const requestLike = input && typeof input === "object" ? input : null;
	const destination = String(requestLike?.destination || init?.destination || "")
		.trim()
		.toLowerCase();
	if (destination) return normalizeAdblockRequestType(destination);

	const mode = String(requestLike?.mode || init?.mode || "")
		.trim()
		.toLowerCase();
	if (mode === "navigate") return "main_frame";

	return "xmlhttprequest";
}

function shouldBlockWithGhostery(rawUrl, baseHref, requestType = "other", sourceUrl = "") {
	if (!ghosteryEngine || !ghosteryRequestCtor) return null;
	try {
		const absoluteUrl = new URL(String(rawUrl), baseHref || window.location.href).href;
		const parsed = new URL(absoluteUrl);
		const protocol = parsed.protocol.toLowerCase();
		if (
			protocol === "data:" ||
			protocol === "blob:" ||
			protocol === "about:" ||
			protocol === "javascript:"
		) {
			return false;
		}

		const request = ghosteryRequestCtor.fromRawDetails({
			type: normalizeAdblockRequestType(requestType),
			url: absoluteUrl,
			sourceUrl: sourceUrl || baseHref || window.location.href,
		});
		const result = ghosteryEngine.match(request);
		return Boolean(result?.match);
	} catch {
		return null;
	}
}

function shouldBlockAdRequest(rawUrl, baseHref, requestType = "other", sourceUrl = "") {
	if (!rawUrl) return false;
	try {
		const parsed = new URL(String(rawUrl), baseHref || window.location.href);
		const protocol = parsed.protocol.toLowerCase();
		if (protocol === "data:" || protocol === "blob:" || protocol === "about:") return false;

		const ghosteryDecision = shouldBlockWithGhostery(parsed.href, baseHref, requestType, sourceUrl);
		if (ghosteryDecision === true) return true;

		const host = parsed.hostname.toLowerCase();
		if (adblockHostPatterns.some((pattern) => pattern.test(host))) return true;
		const target = `${host}${parsed.pathname}${parsed.search}`.toLowerCase();
		return adblockUrlPatterns.some((pattern) => pattern.test(target));
	} catch {
		return false;
	}
}

function injectAdblockIntoFrame(frameElement) {
	const frameWindow = frameElement?.contentWindow;
	if (!frameWindow) return;
	if (frameWindow.__fbAdblockInstalled) return;
	frameWindow.__fbAdblockInstalled = true;
	void ensureGhosteryEngine();

	const shouldBlock = (target, requestType = "other", sourceUrl = "") =>
		isAdblockEnabled() &&
		shouldBlockAdRequest(target, frameWindow.location?.href, requestType, sourceUrl);
	const responseCtor = frameWindow.Response || Response;

	if (typeof frameWindow.fetch === "function") {
		const originalFetch = frameWindow.fetch.bind(frameWindow);
		frameWindow.fetch = (input, init) => {
			const target = typeof input === "string" ? input : input?.url;
			const sourceUrl = typeof input === "object" ? input?.referrer || "" : "";
			if (shouldBlock(target, inferFetchRequestType(input, init), sourceUrl)) {
				return Promise.resolve(
					new responseCtor("", {
						status: 204,
						statusText: "Blocked by FilterBrowser adblock",
					})
				);
			}
			return originalFetch(input, init);
		};
	}

	const xhrProto = frameWindow.XMLHttpRequest?.prototype;
	if (xhrProto && !xhrProto.__fbAdblockPatched) {
		xhrProto.__fbAdblockPatched = true;
		const originalOpen = xhrProto.open;
		const originalSend = xhrProto.send;
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
		const originalSendBeacon = frameWindow.navigator.sendBeacon.bind(frameWindow.navigator);
		frameWindow.navigator.sendBeacon = (url, data) => {
			if (shouldBlock(url, "ping", frameWindow.location?.href)) return false;
			return originalSendBeacon(url, data);
		};
	}

	if (typeof frameWindow.WebSocket === "function") {
		const OriginalWebSocket = frameWindow.WebSocket;
		frameWindow.WebSocket = function FilterBrowserAdblockWebSocket(url, protocols) {
			if (shouldBlock(url, "websocket", frameWindow.location?.href)) {
				throw new Error("Blocked by FilterBrowser adblock");
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
	const tab = getActiveTab();
	if (!tab) return;

	if (pushHistory && tab.url) {
		tab.backStack.push(tab.url);
		tab.forwardStack = [];
	}

	tab.url = url;
	tab.title = getDisplayTitle(url);
	addressInput.value = url;
	homeSearchInput.value = url;
	renderTabs();
	updateNavButtons();

	if (url === "bypass://settings") {
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
	if (url === "bypass://credits") {
		showCreditsPage();
		return;
	}

	showLoading(true);

	try {
		await ensureTransport();
		const frame = ensureTabFrame(tab.id);
		showFrameForTab(tab.id);
		frame.go(url);
		hideBlank();
		addHistory(url);
	} catch (err) {
		showError("Failed to initialize proxy runtime.", err);
	} finally {
		showLoading(false);
	}
}

function ensureTabFrame(tabId) {
	const existing = tabFrames.get(tabId);
	if (existing) return existing;

	const created = scramjet.createFrame();
	created.frame.className = "proxy-frame";
	created.frame.style.display = "none";
	created.frame.style.width = "100%";
	created.frame.style.height = "100%";
	created.frame.style.border = "none";
	created.frame.style.position = "absolute";
	created.frame.style.inset = "0";
	created.frame.addEventListener("load", () => {
		try {
			if (shouldInjectAdblockForTab(tabId)) {
				injectAdblockIntoFrame(created.frame);
			}
		} catch {
		}
		void runQueuedGameClickScriptForTab(tabId, created.frame);
		void maybeRecoverRawHtmlCatalogGame(tabId, created.frame);
	});
	browserStage.appendChild(created.frame);
	tabFrames.set(tabId, { go: created.go.bind(created), element: created.frame });
	return tabFrames.get(tabId);
}

function shouldInjectAdblockForTab(tabId) {
	const tab = tabs.find((entry) => entry.id === tabId);
	if (!tab) return true;
	const currentUrl = String(tab.url || "").trim();
	if (!currentUrl) return true;
	if (isCatalogGameUrl(currentUrl)) return false;
	const catalogBlobUrl = String(gameBlobUrlsByTab.get(tabId) || "").trim();
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
	const tab = getActiveTab();
	if (!tab || !tab.backStack.length) return;
	const prev = tab.backStack.pop();
	if (tab.url) tab.forwardStack.push(tab.url);
	loadUrl(prev, false);
}

function goForward() {
	const tab = getActiveTab();
	if (!tab || !tab.forwardStack.length) return;
	const next = tab.forwardStack.pop();
	if (tab.url) tab.backStack.push(tab.url);
	loadUrl(next, false);
}

function reloadActive() {
	const tab = getActiveTab();
	if (!tab || !tab.url) return;
	loadUrl(tab.url, false);
}

function goHome() {
	const tab = getActiveTab();
	if (!tab) return;
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
	if (settingsPage) settingsPage.classList.add("active");
	addressInput.value = "bypass://settings";
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
	addressInput.value = aiInternalUrl;
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
	if (creditsPage) creditsPage.classList.add("active");
	addressInput.value = "bypass://credits";
	setParticlesVisible(isMatrixThemeActive());
}

function hideInternalPages() {
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (partnersPage) partnersPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
}

function updateNavButtons() {
	const tab = getActiveTab();
	if (!tab) return;
	backBtn.disabled = tab.backStack.length === 0;
	forwardBtn.disabled = tab.forwardStack.length === 0;
}

function isTypingTarget(target) {
	if (!target) return false;
	const tag = (target.tagName || "").toLowerCase();
	return tag === "input" || tag === "textarea" || tag === "select" || target.isContentEditable;
}

async function ensureTransport() {
	if (transportReady) return;
	await registerSW();
	const wispUrl =
		(location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
	await connection.setTransport("/libcurl/index.mjs", [{ websocket: wispUrl }]);
	transportReady = true;
}

const historyKey = "fb_history";

function addHistory(url) {
	const items = readHistory();
	items.unshift({ url, at: new Date().toLocaleString() });
	localStorage.setItem(historyKey, JSON.stringify(items.slice(0, 100)));
}

function readHistory() {
	try {
		const parsed = JSON.parse(localStorage.getItem(historyKey) || "[]");
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function renderHistory() {
	if (!historyContainer) return;
	const items = readHistory();
	historyContainer.innerHTML = "";
	if (!items.length) {
		const empty = document.createElement("div");
		empty.className = "history-item";
		empty.textContent = "No history yet.";
		historyContainer.appendChild(empty);
		return;
	}

	items.forEach((entry) => {
		const row = document.createElement("div");
		row.className = "history-item";
		row.textContent = `${entry.at} - ${entry.url}`;
		row.addEventListener("click", () => {
			loadUrl(entry.url, true);
		});
		historyContainer.appendChild(row);
	});
}

function renderGames() {
	if (!gamesGrid) return;
	const source = Array.isArray(gamesCatalog) ? gamesCatalog : [];
	const query = String(gamesSearchInput?.value || "").trim().toLowerCase();
	const filtered = query
		? source.filter((game) => {
				const title = String(game.title || "").toLowerCase();
				const desc = String(game.desc || "").toLowerCase();
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
		const empty = document.createElement("div");
		empty.className = "settings-hint";
		empty.textContent = query ? "No games match your search." : "No games configured yet.";
		gamesGrid.appendChild(empty);
		return;
	}
	filtered.forEach((game) => {
		const card = document.createElement("button");
		card.type = "button";
		card.className = "game-card";

		const thumb = document.createElement("img");
		thumb.className = "game-thumb";
		thumb.alt = game.title || "Game";
		thumb.src = game.image || "";
		thumb.loading = "lazy";

		const body = document.createElement("div");
		body.className = "game-body";

		const title = document.createElement("div");
		title.className = "game-title";
		title.textContent = game.title || "Untitled";

		const desc = document.createElement("div");
		desc.className = "game-desc";
		desc.textContent = game.desc || "";

		body.appendChild(title);
		body.appendChild(desc);
		card.appendChild(thumb);
		card.appendChild(body);

		card.addEventListener("click", async () => {
			const target = resolveGameUrl(game.url);
			if (!target) return;
			queueGameClickScriptForActiveTab(game.clickScript);
			await openGameFromCatalog(target, { useBlob: game.useBlob });
		});
		gamesGrid.appendChild(card);
	});
}

async function loadGamesCatalog() {
	try {
		const response = await fetch("/games.json", { cache: "no-store" });
		const raw = await response.json().catch(() => []);
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
	const tab = getActiveTab();
	if (!tab) return;
	const rawPath = String(scriptPath || "").trim();
	if (!rawPath) return;
	pendingGameClickScriptsByTab.set(tab.id, rawPath);
}

async function runQueuedGameClickScriptForTab(tabId, frameElement) {
	const queuedScriptPath = String(pendingGameClickScriptsByTab.get(tabId) || "").trim();
	if (!queuedScriptPath) return;
	pendingGameClickScriptsByTab.delete(tabId);
	await new Promise((resolve) => setTimeout(resolve, gameClickScriptDelayMs));
	await runGameClickScriptInFrame(queuedScriptPath, frameElement);
}

async function runGameClickScriptInFrame(scriptPath, frameElement) {
	const rawPath = String(scriptPath || "").trim();
	if (!rawPath) return;
	const normalizedPath = rawPath.startsWith("/")
		? rawPath
		: `/${rawPath.replace(/^\.?\//, "")}`;
	const cacheBustedPath = `${normalizedPath}${normalizedPath.includes("?") ? "&" : "?"}t=${Date.now()}`;
	const localScriptUrl = new URL(cacheBustedPath, window.location.origin).href;
	const targetWindow = frameElement?.contentWindow;
	const scriptSource = await fetchGameClickScriptSource(localScriptUrl);
	if (!targetWindow) {
		await runGameClickScriptInShell(localScriptUrl, scriptSource);
		return;
	}

	if (scriptSource && looksLikeEncodedBookmarklet(scriptSource)) {
		const handled = executeBookmarkletLikeSource(targetWindow, scriptSource);
		if (handled) return;
	}

	if (scriptSource) {
		const executedFromSource = await new Promise((resolve) => {
			try {
				const sourceTag = `\n//# sourceURL=${normalizedPath}`;
				targetWindow.eval(`${scriptSource}${sourceTag}`);
				resolve(true);
			} catch {
				resolve(false);
			}
		});
		if (executedFromSource) return;
	}

	const injectedInFrame = await new Promise((resolve) => {
		try {
			const targetDocument = targetWindow.document;
			const script = targetDocument.createElement("script");
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
	const target = String(scriptUrl || "").trim();
	if (!target) return "";
	try {
		const response = await fetch(target, { cache: "no-store" });
		if (!response.ok) return "";
		return await response.text();
	} catch {
		return "";
	}
}

function looksLikeEncodedBookmarklet(source) {
	const text = String(source || "").trim();
	if (!text) return false;
	if (/^javascript\s*:/i.test(text)) return true;
	return /^function\s*\(\)\s*%\s*[0-9a-fA-F]\s*[0-9a-fA-F]/.test(text);
}

function decodeLegacyBookmarkletSource(rawSource) {
	let text = String(rawSource || "");
	if (!text) return "";
	text = text.replace(/%[\t \r\n]*([0-9a-fA-F])[\t \r\n]*([0-9a-fA-F])/g, "%$1$2");
	text = text.trim().replace(/^javascript:\s*/i, "");
	for (let i = 0; i < 2; i += 1) {
		const next = text.replace(/%([0-9a-fA-F]{2})/g, (_, hex) =>
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

	const trimmed = text.trim();
	if (/^function\s*\(/.test(trimmed)) {
		return `(${trimmed})()`;
	}
	return trimmed;
}

function executeBookmarkletLikeSource(targetWindow, rawSource) {
	if (!targetWindow) return false;
	try {
		const decoded = decodeLegacyBookmarkletSource(rawSource);
		if (!decoded) return false;
		targetWindow.eval(decoded);
		return true;
	} catch {
		return false;
	}
}

function runGameClickScriptInShell(scriptUrl, scriptSource = "") {
	const sourceText = String(scriptSource || "").trim();
	if (sourceText && looksLikeEncodedBookmarklet(sourceText)) {
		try {
			const decoded = decodeLegacyBookmarkletSource(sourceText);
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
		const script = document.createElement("script");
		script.src = String(scriptUrl || "");
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => resolve();
		document.head.appendChild(script);
	});
}

function isGamesInternalUrl(url) {
	const normalized = String(url || "").trim().toLowerCase();
	return normalized === "bypass://games" || normalized === "bypass://games";
}

function isPartnersInternalUrl(url) {
	const normalized = String(url || "").trim().toLowerCase();
	return normalized === "bypass://partners";
}

function isAiInternalUrl(url) {
	const normalized = String(url || "").trim().toLowerCase();
	return normalized === "bypass://ai" || normalized === "bypass://ai";
}

async function openGameFromCatalog(url, options = {}) {
	const tab = getActiveTab();
	if (!tab) return;
	const useBlob = Boolean(options?.useBlob);
	let finalUrl = url;
	rawHtmlFallbackTriedUrlByTab.delete(tab.id);
	if (useBlob) {
		try {
			finalUrl = await materializeGameBlobUrl(url);
		} catch {
			finalUrl = url;
		}
	}

	const previousBlob = gameBlobUrlsByTab.get(tab.id);
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
	const target = String(url || "").trim();
	if (!target) return false;
	return gamesCatalog.some((entry) => resolveGameUrl(entry?.url) === target);
}

function looksLikeRawHtmlSourceDocument(doc) {
	try {
		if (!doc || !doc.body) return false;
		const contentType = String(doc.contentType || "").toLowerCase();
		const bodyText = String(doc.body.textContent || "").trim();
		if (!bodyText) return false;

		const startsLikeHtmlSource = /^\s*(?:<!doctype|<html|<head|<body|<script|<meta|<title|<link|<style)\b/i.test(
			bodyText
		);
		const hasManyTags = (bodyText.match(/</g) || []).length > 20;
		const closesHtmlLikeMarkup = /<\/(?:html|head|body|script|style)>/i.test(bodyText);
		const noRenderedChildren = doc.body.children.length === 0;
		const plainTextType =
			contentType.includes("text/plain") || contentType.includes("application/octet-stream");

		return (plainTextType || noRenderedChildren) && (startsLikeHtmlSource || (hasManyTags && closesHtmlLikeMarkup));
	} catch {
		return false;
	}
}

function ensureHtmlHasBase(rawHtml, pageUrl) {
	const source = String(rawHtml || "");
	if (!source) return source;
	const base = String(pageUrl || "").replace(/[^/]*([?#].*)?$/, "");
	if (!base) return source;
	const hasBase = /<base\s[^>]*href=/i.test(source);
	if (hasBase) return source;
	return source.replace(/<head([^>]*)>/i, `<head$1><base href="${base}">`);
}

function recoverRawHtmlByDocumentWrite(targetDocument, currentUrl) {
	try {
		if (!targetDocument?.body) return false;
		const rawHtml = String(targetDocument.body.textContent || "");
		if (!rawHtml.trim()) return false;
		const patchedHtml = ensureHtmlHasBase(rawHtml, currentUrl);
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
	const tab = tabs.find((entry) => entry.id === tabId);
	if (!tab) return;

	const currentUrl = String(tab.url || "").trim();
	if (!/^https?:\/\//i.test(currentUrl)) return;
	if (!/\.html?(?:[?#]|$)/i.test(currentUrl)) return;
	if (!isCatalogGameUrl(currentUrl)) return;
	if (rawHtmlFallbackTriedUrlByTab.get(tabId) === currentUrl) return;

	const targetWindow = frameElement?.contentWindow;
	const targetDocument = targetWindow?.document;
	if (!targetDocument || !looksLikeRawHtmlSourceDocument(targetDocument)) return;

	rawHtmlFallbackTriedUrlByTab.set(tabId, currentUrl);
	const recoveredInPlace = recoverRawHtmlByDocumentWrite(targetDocument, currentUrl);
	if (recoveredInPlace) return;

	let blobUrl = currentUrl;
	try {
		blobUrl = await materializeGameBlobUrl(currentUrl);
	} catch {
		blobUrl = currentUrl;
	}
	if (!String(blobUrl).startsWith("blob:")) return;

	const previousBlob = gameBlobUrlsByTab.get(tabId);
	if (previousBlob && previousBlob !== blobUrl) {
		URL.revokeObjectURL(previousBlob);
	}
	gameBlobUrlsByTab.set(tabId, blobUrl);
	await loadUrl(blobUrl, false);
}

function resolveGameUrl(url) {
	const raw = String(url || "").trim();
	if (!raw) return "";
	const jsDelivrGh = raw.match(/^https:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@/]+)@([^/]+)\/(.+)$/i);
	if (jsDelivrGh) {
		const [, owner, repo, branch, path] = jsDelivrGh;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	const rawcdn = raw.match(/^https:\/\/rawcdn\.githack\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);
	if (rawcdn) {
		const [, owner, repo, branch, path] = rawcdn;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	const rawgithack = raw.match(/^https:\/\/raw\.githack\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);
	if (rawgithack) {
		const [, owner, repo, branch, path] = rawgithack;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	const githackGh = raw.match(/^https:\/\/(?:rawcdn\.)?githack\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);
	if (githackGh) {
		const [, owner, repo, branch, path] = githackGh;
		return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
	}
	return raw;
}

async function materializeGameBlobUrl(url) {
	const target = String(url || "").trim();
	if (!target) return target;
	if (!/^https?:\/\//i.test(target)) return target;
	const looksHtml = /\.html?(?:[?#]|$)/i.test(target);
	if (!looksHtml) return target;

	const response = await fetch(target, { method: "GET", cache: "no-store" });
	if (!response.ok) return target;
	const body = await response.text();
	if (!body) return target;

	const base = response.url.replace(/[^/]*([?#].*)?$/, "");
	const hasBase = /<base\s[^>]*href=/i.test(body);
	const htmlWithBase = hasBase
		? body
		: body.replace(/<head([^>]*)>/i, `<head$1><base href="${base}">`);

	const blob = new Blob([htmlWithBase || body], { type: "text/html;charset=utf-8" });
	return URL.createObjectURL(blob);
}

async function solveAiPrompt() {
	const input = String((aiPromptInput && aiPromptInput.value) || "").trim();
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
		const aiText = await fetchAiResponse(input, () => {});
		await animateAiTyping(aiText);
	} catch (error) {
		const message =
			`AI request failed.\n` +
			`Reason: ${error.message || error}\n` +
			`Tip: endpoint may be temporarily down or blocked by your network.`;
		const idx = findLastAssistantMessageIndex();
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
		const runId = ++aiTypingRunId;
		const fullText = String(text || "");
		const targetIndex = findLastAssistantMessageIndex();
		if (targetIndex === -1) {
			resolve();
			return;
		}
		aiUiThread[targetIndex].content = "";
		aiUiThread[targetIndex].typing = true;
		let index = 0;

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
			const remaining = fullText.length - index;
			const chunkSize = remaining > 160 ? 4 : remaining > 80 ? 3 : remaining > 30 ? 2 : 1;
			index = Math.min(fullText.length, index + chunkSize);
			aiUiThread[targetIndex].content = fullText.slice(0, index);
			renderAiThread();
			setTimeout(step, 12);
		}

		step();
	});
}

function findLastAssistantMessageIndex() {
	for (let i = aiUiThread.length - 1; i >= 0; i -= 1) {
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
	const thread = document.createElement("div");
	thread.className = "ai-thread";
	aiUiThread.forEach((message) => {
		const row = document.createElement("div");
		row.className = `ai-msg ai-msg-${message.role === "assistant" ? "assistant" : "user"}`;

		const prefix = document.createElement("div");
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

		const body = document.createElement("div");
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
	const source = String(text || "");
	const parts = [];
	const regex = /```([a-zA-Z0-9_+\-]*)\n?([\s\S]*?)```/g;
	let lastIndex = 0;
	let match;

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
	const fragment = document.createDocumentFragment();
	for (const part of parts) {
		if (part.type === "text") {
			const block = document.createElement("div");
			block.className = "ai-text-block";
			block.innerHTML = escapeHtml(part.content).replace(/\n/g, "<br>");
			fragment.appendChild(block);
			continue;
		}

		const wrapper = document.createElement("div");
		wrapper.className = "ai-code-block";

		const header = document.createElement("div");
		header.className = "ai-code-header";

		const lang = document.createElement("span");
		lang.className = "ai-code-lang";
		lang.textContent = part.language || "text";
		header.appendChild(lang);

		const actions = document.createElement("div");
		actions.className = "ai-code-actions";

		const copyBtn = document.createElement("button");
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

		const pre = document.createElement("pre");
		const code = document.createElement("code");
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
	const apiUrl = String(window.GROQ_API_URL || "").trim();
	const apiKey = String(window.GROQ_API_KEY || "").trim();
	const mode = (aiModelSelect && aiModelSelect.value) || "auto";
	const model = getGroqModelForMode(mode);
	const systemPrompt = String(window.GROQ_SYSTEM_PROMPT || "").trim();
	if (!apiUrl) {
		throw new Error("Missing GROQ_API_URL.");
	}
	if (!apiKey) {
		throw new Error("Missing GROQ_API_KEY.");
	}

	const history = [
		...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
		...aiChatHistory,
		{ role: "user", content: prompt },
	];

	const response = await fetch(apiUrl, {
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

	const payload = await response.json().catch(() => ({}));
	if (!response.ok) {
		const detail = payload?.error?.message || `Groq error (${response.status})`;
		throw new Error(detail);
	}

	const text = extractAiText(payload);
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
	const direct = String(payload?.text || "").trim();
	if (direct) return direct;
	const rawContent = payload?.choices?.[0]?.message?.content;
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
	const saved = String(localStorage.getItem(aiModeKey) || "auto").toLowerCase();
	const allowed = new Set(["auto", "fast", "smart"]);
	aiModelSelect.value = allowed.has(saved) ? saved : "auto";
}

const cloakEnabledStorage = "fb_cloak_enabled";
const cloakTitleStorage = "fb_cloak_title";
const cloakFaviconStorage = "fb_cloak_favicon";
const defaultCloakTitle = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
const defaultCloakFaviconHref = "ixl.ico";
const cloakPresets = {
	ixl: { title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish", favicon: "ixl.ico" },
	google: { title: "Google", favicon: "https://www.google.com/favicon.ico" },
	docs: { title: "Google Docs", favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
	drive: { title: "My Drive - Google Drive", favicon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
};
const visibleAppTitle = "FilterBrowser";
const visibleFaviconHref = "favicon.ico";

function isCloakEnabled() {
	const raw = localStorage.getItem(cloakEnabledStorage);
	if (raw === null) {
		localStorage.setItem(cloakEnabledStorage, "true");
		return true;
	}
	return String(raw).toLowerCase() === "true";
}

function loadCloakSettings() {
	const enabled = isCloakEnabled();
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
	const targetHref = String(href || "").trim();
	if (!targetHref) return;
	const rels = ["icon", "shortcut icon", "apple-touch-icon"];
	rels.forEach((relValue) => {
		let link = document.querySelector(`link[rel='${relValue}']`);
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
	const useCloak = isCloakEnabled() && isHidden;
	const title = useCloak ? getCloakTitle() : visibleAppTitle;
	const favicon = useCloak ? getCloakFaviconHref() : visibleFaviconHref;
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
	const value = String(localStorage.getItem(cloakTitleStorage) || "").trim();
	return value || defaultCloakTitle;
}

function getCloakFaviconHref() {
	const value = normalizeCloakFaviconValue(localStorage.getItem(cloakFaviconStorage));
	if (value !== String(localStorage.getItem(cloakFaviconStorage) || "").trim()) {
		localStorage.setItem(cloakFaviconStorage, value);
	}
	return value || defaultCloakFaviconHref;
}

function saveCloakTitle() {
	const title = String(cloakTitleInput?.value || "").trim() || defaultCloakTitle;
	localStorage.setItem(cloakTitleStorage, title);
	if (cloakTitleInput) cloakTitleInput.value = title;
	syncCloakPresetSelection();
	applyCloakVisualState(document.hidden || !document.hasFocus());
	setCloakStatus("Cloak title saved.");
}

function saveCloakFavicon() {
	const icon = normalizeCloakFaviconValue(cloakFaviconInput?.value) || defaultCloakFaviconHref;
	localStorage.setItem(cloakFaviconStorage, icon);
	if (cloakFaviconInput) cloakFaviconInput.value = icon;
	syncCloakPresetSelection();
	applyCloakVisualState(document.hidden || !document.hasFocus());
	setCloakStatus("Cloak icon saved.");
}

function normalizeCloakFaviconValue(raw) {
	const value = String(raw || "").trim();
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
	const preset = cloakPresets[key];
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
	const title = getCloakTitle();
	const favicon = getCloakFaviconHref();
	const match = Object.keys(cloakPresets).find((key) => {
		const preset = cloakPresets[key];
		return preset.title === title && preset.favicon === favicon;
	});
	cloakPresetSelect.value = match || "custom";
}

function hexToRgba(hex, alpha) {
	const value = hex.replace("#", "");
	if (value.length !== 6) return `rgba(255, 255, 255, ${alpha})`;
	const r = parseInt(value.slice(0, 2), 16);
	const g = parseInt(value.slice(2, 4), 16);
	const b = parseInt(value.slice(4, 6), 16);
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

const wallpaperKey = "fb_wallpaper";
const wallpaperRevisionKey = "fb_wallpaper_rev";
const wallpapers = {
	onyx: {
		label: "Onyx",
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
};
const defaultWallpaperTheme = {
	color1: "#93b8ff",
	color2: "#8dd8ff",
	nav1: "#2a4471",
	nav2: "#16223a",
	bg1: "#081427",
	bg2: "#0f2743",
};

function normalizeWallpaperKey(value) {
	const key = String(value || "").trim().toLowerCase();
	if (wallpapers[key]) return key;
	const compact = key.replace(/[^a-z0-9]/g, "");
	return wallpapers[compact] ? compact : "skynight";
}

function getWallpaperFile(key) {
	const normalized = normalizeWallpaperKey(key);
	const file = wallpapers[normalized].file;
	try {
		return new URL(file, window.location.href).toString();
	} catch {
		return file;
	}
}

function getWallpaperTheme(key) {
	const normalized = normalizeWallpaperKey(key);
	const theme = wallpapers[normalized]?.theme;
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
	const raw = Number.parseInt(localStorage.getItem(wallpaperRevisionKey) || "0", 10);
	return Number.isFinite(raw) ? raw : 0;
}

function bumpWallpaperRevision() {
	const next = getWallpaperRevision() + 1;
	localStorage.setItem(wallpaperRevisionKey, String(next));
	return next;
}

function buildWallpaperCssValue(key, revision = getWallpaperRevision()) {
	const wallpaperFile = getWallpaperFile(key);
	try {
		const url = new URL(wallpaperFile, window.location.href);
		url.searchParams.set("v", String(revision));
		return `url("${url.toString()}")`;
	} catch {
		const separator = String(wallpaperFile).includes("?") ? "&" : "?";
		return `url("${wallpaperFile}${separator}v=${revision}")`;
	}
}

function renderWallpaperBackground(wallpaperCssUrl) {
	const value = String(wallpaperCssUrl || "").trim();
	if (!value) return;
	document.documentElement.style.setProperty("--wallpaper-image", value);
	document.body.style.backgroundImage =
		`linear-gradient(180deg, rgba(5, 13, 26, 0.36), rgba(9, 20, 36, 0.58)), ${value}, ` +
		"linear-gradient(180deg, var(--bg), var(--bg-darker))";
}

function applyWallpaper(key) {
	const normalized = normalizeWallpaperKey(key);
	const revision = bumpWallpaperRevision();
	const theme = getWallpaperTheme(normalized);
	renderWallpaperBackground(buildWallpaperCssValue(normalized, revision));
	document.body.dataset.wallpaper = normalized;
	if (wallpaperSelect) wallpaperSelect.value = normalized;
	localStorage.setItem(wallpaperKey, normalized);
	applyTheme(theme.color1, theme.color2, theme.bg1, theme.bg2, theme.nav1, theme.nav2);
}

function populateWallpaperOptions() {
	if (!wallpaperSelect) return;
	wallpaperSelect.innerHTML = "";
	Object.entries(wallpapers).forEach(([key, wallpaper]) => {
		const option = document.createElement("option");
		option.value = key;
		option.textContent = wallpaper.label;
		wallpaperSelect.appendChild(option);
	});
}

function loadWallpaper() {
	const saved = normalizeWallpaperKey(localStorage.getItem(wallpaperKey) || "skynight");
	applyWallpaper(saved);
}

function bootstrapWallpaperFromStorage() {
	const saved = normalizeWallpaperKey(localStorage.getItem(wallpaperKey) || "skynight");
	const theme = getWallpaperTheme(saved);
	renderWallpaperBackground(buildWallpaperCssValue(saved));
	document.body.dataset.wallpaper = saved;
	applyTheme(theme.color1, theme.color2, theme.bg1, theme.bg2, theme.nav1, theme.nav2);
}

const panicKeyStorage = "fb_panic_key";
const panicUrlStorage = "fb_panic_url";
const panicDefaultKey = "`";
const panicDefaultUrl = "https://google.com";
const openModeStorage = "fb_open_mode";
let isListeningForKey = false;
let ignoreNextPanicPress = false;

function getPanicKey() {
	const raw = localStorage.getItem(panicKeyStorage);
	return raw && raw.length ? raw : panicDefaultKey;
}

function getPanicKeyDisplayValue() {
	const key = getPanicKey();
	if (/^Key[A-Z]$/.test(key)) return key.slice(3);
	if (/^Digit[0-9]$/.test(key)) return key.slice(5);
	return key;
}

function normalizePanicKey(value) {
	const key = String(value || "").trim();
	if (!key) return "";
	return key.length === 1 ? key.toLowerCase() : key;
}

function panicKeyMatches(event) {
	const configured = getPanicKey();
	const normalizedConfigured = normalizePanicKey(configured);
	const normalizedEventKey = normalizePanicKey(event.key);
	if (normalizedConfigured && normalizedEventKey === normalizedConfigured) {
		return true;
	}
	if (configured && event.code && configured === event.code) {
		return true;
	}
	return false;
}

function getPanicUrl() {
	const raw = (localStorage.getItem(panicUrlStorage) || "").trim();
	return raw || panicDefaultUrl;
}

function loadPanicSettings() {
	if (currentPanicKey) currentPanicKey.textContent = getPanicKeyDisplayValue();
	panicUrlInput.value = getPanicUrl();
	if (panicStatus) panicStatus.textContent = "Panic key is active";
}

function loadOpenModeSettings() {
	const raw = String(localStorage.getItem(openModeStorage) || "aboutblank").toLowerCase();
	const allowed = new Set(["aboutblank", "blob"]);
	const selected = allowed.has(raw) ? raw : "aboutblank";
	updateOpenModeUI(selected);
	if (raw !== selected) {
		localStorage.setItem(openModeStorage, selected);
	}
	if (openModeStatus) {
		openModeStatus.textContent =
			selected === "blob" ? "Open mode set to blob:." : "Open mode set to about:blank.";
	}
}

function setOpenMode(mode, shouldLaunch = false) {
	const selected = mode === "blob" ? "blob" : "aboutblank";
	localStorage.setItem(openModeStorage, selected);
	updateOpenModeUI(selected);
	if (openModeStatus) {
		openModeStatus.textContent =
			selected === "blob" ? "Open mode set to blob:." : "Open mode set to about:blank.";
	}
	if (shouldLaunch) {
		openCurrentPageInMode(selected);
	}
}

function buildWrapperHtml(appUrl) {
	const safeSrc = escapeHtml(appUrl);
	const wrapperConfig = {
		cloakEnabled: isCloakEnabled(),
		cloakTitle: getCloakTitle(),
		cloakFavicon: getCloakFaviconHref(),
		visibleTitle: visibleAppTitle,
		visibleFavicon: visibleFaviconHref,
	};
	const configJson = JSON.stringify(wrapperConfig).replace(/</g, "\\u003c");
	return (
		`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(visibleAppTitle)}</title>` +
		`<style>html,body,iframe{margin:0;padding:0;width:100%;height:100%;border:0;overflow:hidden;background:#000;}</style>` +
		`<link rel="icon" href="${escapeHtml(visibleFaviconHref)}">` +
		`</head><body><iframe referrerpolicy="no-referrer" src="${safeSrc}"></iframe>` +
		`<script>
		(function(){
			var cfg = ${configJson};
			function setFavicon(href){
				let link=document.querySelector("link[rel~='icon']");
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
	const appUrl = window.location.href;
	const wrapperHtml = buildWrapperHtml(appUrl);
	if (mode === "aboutblank") {
		const popup = window.open("about:blank", "_blank");
		if (!popup) {
			if (openModeStatus) openModeStatus.textContent = "Popup blocked. Allow popups for this site.";
			return;
		}
		popup.document.open();
		popup.document.write(wrapperHtml);
		popup.document.close();
		if (openModeStatus) openModeStatus.textContent = "Opened in about:blank.";
		return;
	}

	const blob = new Blob([wrapperHtml], { type: "text/html;charset=utf-8" });
	const blobUrl = URL.createObjectURL(blob);
	const popup = window.open("about:blank", "_blank");
	if (!popup) {
		URL.revokeObjectURL(blobUrl);
		if (openModeStatus) openModeStatus.textContent = "Popup blocked. Allow popups for this site.";
		return;
	}
	try {
		popup.location.replace(blobUrl);
	} catch {
		popup.document.open();
		popup.document.write(wrapperHtml);
		popup.document.close();
	}
	setTimeout(() => {
		URL.revokeObjectURL(blobUrl);
	}, 600_000);
	if (openModeStatus) openModeStatus.textContent = "Opened in blob:.";
}

function navigateToPanicUrl() {
	const target = getPanicUrl();
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

	const tempKeyListener = (e) => {
		if (!isListeningForKey) return;
		e.preventDefault();
		if (["Control", "Shift", "Alt", "Meta", "Tab", "CapsLock"].includes(e.key)) {
			if (listeningStatus) {
				listeningStatus.textContent = "Cannot use modifier keys. Try another key.";
			}
			return;
		}

		const physicalCode = String(e.code || "");
		const isSimplePhysical = /^Key[A-Z]$/.test(physicalCode) || /^Digit[0-9]$/.test(physicalCode);
		const stored = isSimplePhysical ? physicalCode : e.key;
		localStorage.setItem(panicKeyStorage, stored);
		if (currentPanicKey) currentPanicKey.textContent = e.key;
		if (panicStatus) panicStatus.textContent = `Panic key saved: ${e.key}`;
		isListeningForKey = false;
		ignoreNextPanicPress = true;
		document.removeEventListener("keydown", tempKeyListener);
		if (listeningStatus) listeningStatus.textContent = `Panic key set to: ${e.key}`;
		setTimeout(() => {
			if (listeningStatus) listeningStatus.textContent = "";
		}, 2000);
	};

	document.addEventListener("keydown", tempKeyListener);
}

function savePanicUrl() {
	const url = (panicUrlInput.value || "").trim();
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
	const tab = getActiveTab();
	if (!tab) return;
	const frameItem = tabFrames.get(tab.id);
	const targetWindow = frameItem?.element?.contentWindow;
	if (!targetWindow) return;

	try {
		const targetDocument = targetWindow.document;
		if (targetDocument.getElementById("fb-eruda-script")) {
			targetWindow.eruda?.init?.();
			return;
		}
		const script = targetDocument.createElement("script");
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