import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import type { Plan } from "./types";

// Compresses a Plan into a URL-safe string. Round-trips ~5KB → ~1.5KB
// and survives copy/paste in URL bars.
export function encodePlan(plan: Plan): string {
  return compressToEncodedURIComponent(JSON.stringify(plan));
}

export function decodePlan(encoded: string): Plan | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as Plan;
  } catch {
    return null;
  }
}
