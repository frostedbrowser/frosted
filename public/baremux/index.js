import * as BareMuxModule from "./index.mjs?v=3";

if (typeof globalThis !== 'undefined') {
  globalThis.BareMux = BareMuxModule;
  globalThis.BareMuxConnection = BareMuxModule.BareMuxConnection; // Defensive direct export
}

export * from "./index.mjs?v=3";
export default BareMuxModule.default;
