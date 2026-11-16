import { apiUrl, mockScenario, mocksEnabled } from "./config";
import type { Course, Vacancy } from "./types";

async function fromApi<T>(path: string): Promise<T[]> {
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");
  const res = await fetch(`${apiUrl}${path}`);
  if (!res.ok) throw new Error(`${path} responded with ${res.status}`);
  return res.json();
}

/** Mock responses are loaded lazily, so the fake data never ends up in a build that does not use it. */
async function fromMock<T>(load: () => Promise<T[]>): Promise<T[]> {
  await new Promise((r) => setTimeout(r, 400));
  if (mockScenario === "error") throw new Error("Mock API error");
  return mockScenario === "empty" ? [] : load();
}

export const getVacancies = (): Promise<Vacancy[]> =>
  mocksEnabled ? fromMock(() => import("@/mocks/vacancies").then((m) => m.vacancies)) : fromApi<Vacancy>("/vacancies");

export const getCourses = (): Promise<Course[]> =>
  mocksEnabled ? fromMock(() => import("@/mocks/courses").then((m) => m.courses)) : fromApi<Course>("/courses");
