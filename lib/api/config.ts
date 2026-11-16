/**
 * Mock data is off unless NEXT_PUBLIC_USE_MOCKS=true, and can never be on in a production build.
 * NEXT_PUBLIC_MOCK_SCENARIO (mock mode only): "ok" (default), "empty" or "error" to see those UI states.
 */
export const mocksEnabled = process.env.NEXT_PUBLIC_USE_MOCKS === "true" && process.env.NODE_ENV !== "production";

export type MockScenario = "ok" | "empty" | "error";
const scenario = process.env.NEXT_PUBLIC_MOCK_SCENARIO;
export const mockScenario: MockScenario = scenario === "empty" || scenario === "error" ? scenario : "ok";

/** Base URL of the real API (not built yet). */
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
