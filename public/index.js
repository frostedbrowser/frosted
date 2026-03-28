"use strict";

const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

const tabsEl = qs("#tabs");
const tabCounter = qs("#tabCounter");
const newTabBtn = qs("#newTabBtn");
const toolbarForm = qs("#toolbarForm");
const homeForm = qs("#homeForm");
const addressInput = qs("#addressInput");
const homeSearchInput = qs("#homeSearchInput");
const backBtn = qs("#backBtn");
const forwardBtn = qs("#forwardBtn");
const reloadBtn = qs("#reloadBtn");
const homeBtn = qs("#homeBtn");
const gamesBtn = qs("#gamesBtn");
const aiBtn = qs("#aiBtn");
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
const themePresetSelect = qs("#themePresetSelect");
const themeColor1 = qs("#themeColor1");
const themeColor2 = qs("#themeColor2");
const themeBg1 = qs("#themeBg1");
const themeBg2 = qs("#themeBg2");
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

const historyKey = "fb_history";
const themeKey = "fb_theme";
const legacyThemeKey = "fc_theme";
const panicKeyStorage = "fb_panic_key";
const panicUrlStorage = "fb_panic_url";
const openModeStorage = "fb_open_mode";
const cloakEnabledStorage = "fb_cloak_enabled";
const cloakTitleStorage = "fb_cloak_title";
const cloakFaviconStorage = "fb_cloak_favicon";
const panicDefaultKey = "`";
const panicDefaultUrl = "https://google.com";
const gamesInternalUrl = "bypass://games";
const aiInternalUrl = "bypass://ai";
const aiModeKey = "fb_ai_mode";
const visibleAppTitle = "FilterBrowser";
const visibleFaviconHref = "favicon.ico";
const startupBrandTitle = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
const startupBrandFaviconHref = "ixl.ico";
const startupBrandDurationMs = 120;
const defaultCloakTitle = "IXL | Math, Language Arts, Science, Social Studies, and Spanish";
const defaultCloakFaviconHref = "ixl.ico";
const cloakPresets = {
	ixl: { title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish", favicon: "ixl.ico" },
	google: { title: "Google", favicon: "https://www.google.com/favicon.ico" },
	docs: { title: "Google Docs", favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
	drive: { title: "My Drive - Google Drive", favicon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
};
let isListeningForKey = false;
let ignoreNextPanicPress = false;

const taglines = [
	"probably works as expected",
	"still loading... please wait",
	"not entirely sure why this works",
	"this might crash, but hopefully not",
	"one more update should do it",
	"seemed like a good idea at the time",
];

const presets = {
	nord: { team1: "#88c0d0", team2: "#81a1c1", bg1: "#0a0f14", bg2: "#141c24" },
	dracula: { team1: "#bd93f9", team2: "#ff79c6", bg1: "#0d0b16", bg2: "#1b1327" },
	solarized: { team1: "#268bd2", team2: "#2aa198", bg1: "#002b36", bg2: "#073642" },
	graphite: { team1: "#9ca3af", team2: "#6b7280", bg1: "#0b0f14", bg2: "#131a23" },
	midnight: { team1: "#4f46e5", team2: "#0ea5e9", bg1: "#05060d", bg2: "#0b1220" },
	deepsea: { team1: "#22d3ee", team2: "#0ea5e9", bg1: "#04121a", bg2: "#072431" },
	aurora: { team1: "#34d399", team2: "#60a5fa", bg1: "#07170f", bg2: "#0e1d2d" },
	ember: { team1: "#f97316", team2: "#ef4444", bg1: "#140b08", bg2: "#1f0c0b" },
	glacier: { team1: "#93c5fd", team2: "#a7f3d0", bg1: "#0b1220", bg2: "#142036" },
	dusk: { team1: "#f472b6", team2: "#a78bfa", bg1: "#130c16", bg2: "#1e1324" },
	slate: { team1: "#94a3b8", team2: "#64748b", bg1: "#0b0f14", bg2: "#151b23" },
	obsidian: { team1: "#38bdf8", team2: "#0ea5e9", bg1: "#06080b", bg2: "#0f1115" },
	forest: { team1: "#22c55e", team2: "#16a34a", bg1: "#07110b", bg2: "#0e1a13" },
	ocean: { team1: "#06b6d4", team2: "#3b82f6", bg1: "#05131b", bg2: "#0a1e2a" },
	sand: { team1: "#fbbf24", team2: "#f59e0b", bg1: "#1a140a", bg2: "#241b0d" },
	latte: { team1: "#f59e0b", team2: "#f97316", bg1: "#1a120c", bg2: "#23170f" },
	pearl: { team1: "#a5b4fc", team2: "#f472b6", bg1: "#0f1119", bg2: "#171b2a" },
	paper: { team1: "#64748b", team2: "#94a3b8", bg1: "#101216", bg2: "#161a22" },
	sunrise: { team1: "#fb7185", team2: "#f97316", bg1: "#140c0b", bg2: "#1c120c" },
	neon: { team1: "#22d3ee", team2: "#a78bfa", bg1: "#08080f", bg2: "#0f101a" },
	violet: { team1: "#8b5cf6", team2: "#ec4899", bg1: "#0d0a14", bg2: "#160f24" },
	moss: { team1: "#84cc16", team2: "#10b981", bg1: "#0b120c", bg2: "#101a12" },
	steel: { team1: "#9ca3af", team2: "#cbd5f5", bg1: "#0d1117", bg2: "#151b24" },
	daybreak: { team1: "#38bdf8", team2: "#fbbf24", bg1: "#0b1016", bg2: "#111a22" },
	mist: { team1: "#e2e8f0", team2: "#94a3b8", bg1: "#0d1015", bg2: "#151a22" },
	cloud: { team1: "#cbd5f5", team2: "#e2e8f0", bg1: "#0f1219", bg2: "#171e28" },
	ivory: { team1: "#f8fafc", team2: "#e2e8f0", bg1: "#0e1016", bg2: "#141923" },
	alabaster: { team1: "#f1f5f9", team2: "#cbd5f5", bg1: "#0f1117", bg2: "#151b25" },
	mint: { team1: "#6ee7b7", team2: "#34d399", bg1: "#071110", bg2: "#0e1a16" },
	sky: { team1: "#38bdf8", team2: "#0ea5e9", bg1: "#071016", bg2: "#0d1a24" },
	peach: { team1: "#fdba74", team2: "#f97316", bg1: "#120d0b", bg2: "#1b120d" },
	dune: { team1: "#fbbf24", team2: "#eab308", bg1: "#171109", bg2: "#22170d" },
	lavender: { team1: "#c4b5fd", team2: "#a78bfa", bg1: "#0f0d16", bg2: "#181326" },
	crimson: { team1: "#fb7185", team2: "#f43f5e", bg1: "#1a0b12", bg2: "#240f1a" },
	cobalt: { team1: "#60a5fa", team2: "#2563eb", bg1: "#081122", bg2: "#0e1a33" },
	citrus: { team1: "#facc15", team2: "#84cc16", bg1: "#161407", bg2: "#1f210b" },
	arcade: { team1: "#22d3ee", team2: "#f472b6", bg1: "#0b0b1a", bg2: "#16102a" },
	ruby: { team1: "#f87171", team2: "#fb7185", bg1: "#180a0a", bg2: "#261010" },
	lagoon: { team1: "#2dd4bf", team2: "#38bdf8", bg1: "#061418", bg2: "#0d2028" },
	orchid: { team1: "#c084fc", team2: "#f0abfc", bg1: "#120b18", bg2: "#1d1226" },
	copper: { team1: "#fb923c", team2: "#f59e0b", bg1: "#170d07", bg2: "#23140b" },
	storm: { team1: "#94a3b8", team2: "#64748b", bg1: "#0a1118", bg2: "#121b24" },
	matrix: { team1: "#4ade80", team2: "#22c55e", bg1: "#071207", bg2: "#0e1b10" },
	volcano: { team1: "#fb7185", team2: "#f97316", bg1: "#1a0b08", bg2: "#2b120b" },
	sapphire: { team1: "#22d3ee", team2: "#2563eb", bg1: "#07101b", bg2: "#0d1a2f" },
	arctic: { team1: "#bae6fd", team2: "#93c5fd", bg1: "#0b141f", bg2: "#122235" },
	rosewood: { team1: "#fb7185", team2: "#c084fc", bg1: "#180c15", bg2: "#26142a" },
	desert: { team1: "#fbbf24", team2: "#fb923c", bg1: "#171109", bg2: "#2a1a0e" },
	jungle: { team1: "#34d399", team2: "#84cc16", bg1: "#07140f", bg2: "#102317" },
	mono: { team1: "#d1d5db", team2: "#9ca3af", bg1: "#0d1117", bg2: "#1a1f29" },
	candy: { team1: "#ff4fd8", team2: "#ffb347", bg1: "#2a0f28", bg2: "#4a1b45" },
	aurora_night: { team1: "#60a5fa", team2: "#34d399", bg1: "#08101a", bg2: "#0f1e2a" },
	autumn: { team1: "#f59e0b", team2: "#ef4444", bg1: "#160d08", bg2: "#26140f" },
};

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
let isApplyingThemeUpdate = false;
const tabFrames = new Map();
const aiChatHistory = [];
let aiTypingRunId = 0;
const aiUiThread = [];
let gamesCatalog = [];
const gameBlobUrlsByTab = new Map();
let particleCanvas = null;
let particleCtx = null;
let particleDots = [];
let particleFrameId = 0;
let particleResizeFrameId = 0;
let particleLastTs = 0;
let particleRgb = { r: 136, g: 192, b: 208 };
let particleAltRgb = { r: 129, g: 161, b: 193 };
const reducedMotionQuery = window.matchMedia
	? window.matchMedia("(prefers-reduced-motion: reduce)")
	: null;

bootstrapThemeFromStorage();
init();

function init() {
	if (randomTagline) {
		randomTagline.textContent = taglines[Math.floor(Math.random() * taglines.length)];
	}

	populateThemePresetOptions();
	loadTheme();
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

function runStartupBrandSequence() {
	document.title = startupBrandTitle;
	setDocumentFavicon(`${startupBrandFaviconHref}?startup=1`);

	setTimeout(() => {
		applyCloakVisualState(document.hidden || !document.hasFocus());
	}, startupBrandDurationMs);
}

function bindEvents() {
	newTabBtn.addEventListener("click", () => createTab(""));
	toolbarForm.addEventListener("submit", (e) => {
		e.preventDefault();
		navigateFromInput(addressInput.value);
	});
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

	const onThemePresetSelect = () => {
		const rawValue = themePresetSelect?.selectedOptions?.[0]?.value || themePresetSelect.value;
		const selected = normalizePresetKey(rawValue);
		if (selected === "custom") {
			applyCustomTheme();
			return;
		}
		themePresetSelect.value = selected;
		applyPreset(selected);
		setTimeout(() => {
			if (themePresetSelect.value !== "custom") {
				applyPreset(normalizePresetKey(themePresetSelect.value));
			}
		}, 0);
	};
	themePresetSelect.addEventListener("change", onThemePresetSelect);
	themePresetSelect.addEventListener("input", onThemePresetSelect);

	[themeColor1, themeColor2, themeBg1, themeBg2].forEach((el) => {
		el.addEventListener("input", (event) => {
			if (isApplyingThemeUpdate || !event.isTrusted) return;
			themePresetSelect.value = "custom";
			applyCustomTheme();
		});
	});

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
	seedParticles(width, height);
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

function startParticlesAnimation() {
	if (!particleCtx || !particleCanvas || document.hidden) return;
	stopParticlesAnimation();
	particleLastTs = 0;
	if (reducedMotionQuery?.matches) {
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

function tickParticles(ts) {
	if (!particleCtx || !particleCanvas) return;
	if (!particleLastTs) particleLastTs = ts;
	const dt = Math.min(32, ts - particleLastTs);
	particleLastTs = ts;
	const width = parseFloat(particleCanvas.style.width) || window.innerWidth;
	const height = parseFloat(particleCanvas.style.height) || window.innerHeight;
	const speed = dt / 16.666;
	const t = ts / 1000;

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

function updateParticleColorFromTheme() {
	const style = getComputedStyle(document.documentElement);
	const teamColor = style.getPropertyValue("--team-color-1").trim() || "#88c0d0";
	const teamColorAlt = style.getPropertyValue("--team-color-2").trim() || "#81a1c1";
	particleRgb = parseHexToRgb(teamColor) || { r: 136, g: 192, b: 208 };
	particleAltRgb = parseHexToRgb(teamColorAlt) || { r: 129, g: 161, b: 193 };
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
		node.textContent = tab.title || "New Tab";

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
	tabCounter.textContent = `Tabs: ${tabs.length}`;
}

function getActiveTab() {
	return tabs.find((tab) => tab.id === activeTabId) || null;
}

function getDisplayTitle(url) {
	if (!url) return "New Tab";
	if (url === "bypass://settings") return "Settings";
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
	browserStage.appendChild(created.frame);
	tabFrames.set(tabId, { go: created.go.bind(created), element: created.frame });
	return tabFrames.get(tabId);
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
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
	if (settingsPage) settingsPage.classList.add("active");
	addressInput.value = "bypass://settings";
	setParticlesVisible(false);
}

function showGamesPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.add("active");
	if (aiPage) aiPage.classList.remove("active");
	addressInput.value = gamesInternalUrl;
	setParticlesVisible(false);
}

function showAiPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.add("active");
	addressInput.value = aiInternalUrl;
	setParticlesVisible(false);
}

function showCreditsPage() {
	blankState.style.display = "none";
	tabFrames.forEach((item) => {
		item.element.style.display = "none";
	});
	if (settingsPage) settingsPage.classList.remove("active");
	if (gamesPage) gamesPage.classList.remove("active");
	if (aiPage) aiPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.add("active");
	addressInput.value = "bypass://credits";
	setParticlesVisible(false);
}

function hideInternalPages() {
	if (settingsPage) settingsPage.classList.remove("active");
	if (creditsPage) creditsPage.classList.remove("active");
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

		card.addEventListener("click", () => {
			const target = resolveGameUrl(game.url);
			if (target) {
				openGameFromCatalog(target);
			}
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
			}))
			.filter((entry) => entry.title && entry.url);
	} catch {
		gamesCatalog = [];
	}
	renderGames();
}

function isGamesInternalUrl(url) {
	const normalized = String(url || "").trim().toLowerCase();
	return normalized === "bypass://games" || normalized === "bypass://games";
}

function isAiInternalUrl(url) {
	const normalized = String(url || "").trim().toLowerCase();
	return normalized === "bypass://ai" || normalized === "bypass://ai";
}

async function openGameFromCatalog(url) {
	const tab = getActiveTab();
	if (!tab) return;
	let finalUrl = url;
	try {
		finalUrl = await materializeGameBlobUrl(url);
	} catch {
		finalUrl = url;
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

function applyTheme(team1, team2, bg1, bg2) {
	document.documentElement.style.setProperty("--team-color-1", team1);
	document.documentElement.style.setProperty("--team-color-2", team2);
	document.documentElement.style.setProperty("--glow-color-1", hexToRgba(team1, 0.35));
	document.documentElement.style.setProperty("--glow-color-2", hexToRgba(team2, 0.2));
	document.documentElement.style.setProperty("--accent-soft", hexToRgba(team1, 0.45));
	document.documentElement.style.setProperty("--bg", bg1);
	document.documentElement.style.setProperty("--bg-darker", bg2);
	document.documentElement.style.setProperty("--bg-card", hexToRgba(bg1, 0.92));
	document.documentElement.style.setProperty("--bg-input", hexToRgba(bg2, 0.85));
	document.documentElement.style.setProperty("--surface-1", hexToRgba(bg1, 0.92));
	document.documentElement.style.setProperty("--surface-2", hexToRgba(bg2, 0.84));
	document.documentElement.style.setProperty("--surface-3", hexToRgba(bg2, 0.64));
	updateParticleColorFromTheme();
}

function applyPreset(name) {
	const preset = presets[name] || presets.nord;
	isApplyingThemeUpdate = true;
	try {
		themeColor1.value = preset.team1;
		themeColor2.value = preset.team2;
		themeBg1.value = preset.bg1;
		themeBg2.value = preset.bg2;
		applyTheme(preset.team1, preset.team2, preset.bg1, preset.bg2);
		saveTheme(name, preset.team1, preset.team2, preset.bg1, preset.bg2);
	} finally {
		isApplyingThemeUpdate = false;
	}
}

function formatPresetLabel(name) {
	return name
		.replace(/_/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizePresetKey(value) {
	const raw = String(value || "").trim();
	if (!raw) return "nord";
	const lower = raw.toLowerCase();
	if (lower === "custom") return "custom";
	if (presets[lower]) return lower;
	const byLabel = Object.keys(presets).find((key) => formatPresetLabel(key).toLowerCase() === lower);
	return byLabel || "nord";
}

function populateThemePresetOptions() {
	if (!themePresetSelect) return;
	themePresetSelect.innerHTML = "";

	const groups = [
		{
			label: "Core",
			items: ["nord", "dracula", "solarized", "graphite", "slate", "obsidian"],
		},
		{
			label: "Cool",
			items: [
				"midnight",
				"deepsea",
				"aurora",
				"glacier",
				"ocean",
				"lagoon",
				"sapphire",
				"arctic",
				"aurora_night",
				"cobalt",
				"sky",
				"storm",
				"cloud",
				"mist",
				"ivory",
				"alabaster",
			],
		},
		{
			label: "Warm",
			items: [
				"ember",
				"sunrise",
				"sand",
				"latte",
				"peach",
				"dune",
				"copper",
				"desert",
				"autumn",
				"volcano",
				"ruby",
				"crimson",
				"paper",
				"pearl",
			],
		},
		{
			label: "Vibrant",
			items: [
				"dusk",
				"neon",
				"violet",
				"lavender",
				"orchid",
				"arcade",
				"candy",
				"rosewood",
			],
		},
		{
			label: "Natural",
			items: ["forest", "moss", "mint", "jungle", "citrus", "matrix", "daybreak", "steel", "mono"],
		},
	];

	const seen = new Set();
	groups.forEach((group) => {
		const optgroup = document.createElement("optgroup");
		optgroup.label = group.label;
		group.items.forEach((name) => {
			if (!presets[name] || seen.has(name)) return;
			seen.add(name);
			const option = document.createElement("option");
			option.value = name;
			option.textContent = formatPresetLabel(name);
			optgroup.appendChild(option);
		});
		if (optgroup.children.length) {
			themePresetSelect.appendChild(optgroup);
		}
	});

	Object.keys(presets).forEach((name) => {
		if (seen.has(name)) return;
		const option = document.createElement("option");
		option.value = name;
		option.textContent = formatPresetLabel(name);
		themePresetSelect.appendChild(option);
	});

	const customOption = document.createElement("option");
	customOption.value = "custom";
	customOption.textContent = "Custom";
	themePresetSelect.appendChild(customOption);
}

function applyCustomTheme() {
	const team1 = themeColor1.value || presets.nord.team1;
	const team2 = themeColor2.value || presets.nord.team2;
	const bg1 = themeBg1.value || presets.nord.bg1;
	const bg2 = themeBg2.value || presets.nord.bg2;
	applyTheme(team1, team2, bg1, bg2);
	saveTheme("custom", team1, team2, bg1, bg2);
}

function saveTheme(preset, team1, team2, bg1, bg2) {
	const payload = JSON.stringify({ preset, team1, team2, bg1, bg2 });
	localStorage.setItem(themeKey, payload);
	localStorage.setItem(legacyThemeKey, payload);
}

function readStoredThemeRaw() {
	const primary = localStorage.getItem(themeKey);
	if (primary) return primary;
	return localStorage.getItem(legacyThemeKey);
}

function loadTheme() {
	const raw = readStoredThemeRaw();
	if (!raw) {
		themePresetSelect.value = "nord";
		applyPreset("nord");
		return;
	}
	try {
		const data = JSON.parse(raw);
		const preset = normalizePresetKey(data.preset || "nord");
		if (preset !== "custom" && presets[preset]) {
			const p = presets[preset];
			themePresetSelect.value = preset;
			themeColor1.value = p.team1;
			themeColor2.value = p.team2;
			themeBg1.value = p.bg1;
			themeBg2.value = p.bg2;
			applyTheme(p.team1, p.team2, p.bg1, p.bg2);
			return;
		}
		themePresetSelect.value = "custom";
		themeColor1.value = data.team1 || data.teamColor1 || presets.nord.team1;
		themeColor2.value = data.team2 || data.teamColor2 || presets.nord.team2;
		themeBg1.value = data.bg1 || data.background1 || presets.nord.bg1;
		themeBg2.value = data.bg2 || data.background2 || presets.nord.bg2;
		applyTheme(themeColor1.value, themeColor2.value, themeBg1.value, themeBg2.value);
	} catch {
		themePresetSelect.value = "nord";
		applyPreset("nord");
	}
}

function bootstrapThemeFromStorage() {
	const raw = readStoredThemeRaw();
	if (!raw) return;
	try {
		const data = JSON.parse(raw);
		const preset = normalizePresetKey(data.preset || "nord");
		if (preset !== "custom" && presets[preset]) {
			const p = presets[preset];
			applyTheme(p.team1, p.team2, p.bg1, p.bg2);
			return;
		}
		const team1 = data.team1 || data.teamColor1 || presets.nord.team1;
		const team2 = data.team2 || data.teamColor2 || presets.nord.team2;
		const bg1 = data.bg1 || data.background1 || presets.nord.bg1;
		const bg2 = data.bg2 || data.background2 || presets.nord.bg2;
		applyTheme(team1, team2, bg1, bg2);
	} catch {
	}
}

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

function resetError() {
	if (errorTitle) errorTitle.textContent = "";
	if (errorDetails) errorDetails.textContent = "";
	if (errorPanel) errorPanel.classList.remove("show");
}