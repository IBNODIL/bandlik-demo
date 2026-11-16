/**
 * Mock data is used when NEXT_PUBLIC_USE_MOCKS=true, and also whenever no real API is configured
 * (NEXT_PUBLIC_API_URL empty) — so a demo deploy works without any environment variables.
 * Set NEXT_PUBLIC_USE_MOCKS=false to turn mocks off explicitly.
 * NEXT_PUBLIC_MOCK_SCENARIO (mock mode only): "ok" (default), "empty" or "error" to see those UI states.
 */
const flag = process.env.NEXT_PUBLIC_USE_MOCKS;

/** Base URL of the real API (not built yet). */
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const mocksEnabled = flag === "true" || (flag !== "false" && !apiUrl);

export type MockScenario = "ok" | "empty" | "error";
const scenario = process.env.NEXT_PUBLIC_MOCK_SCENARIO;
export const mockScenario: MockScenario = scenario === "empty" || scenario === "error" ? scenario : "ok";
