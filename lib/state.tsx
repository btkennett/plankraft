"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Wood = "Walnut" | "White oak" | "Cherry" | "Maple" | "Pine" | "Other";
export type Joinery = "Dovetail" | "Mortise & tenon" | "Pocket screw" | "Dowel" | "Whatever's easiest";
export type Skill = "Beginner" | "Intermediate" | "Advanced";

export interface PlankraftData {
  brief: string;
  dim: { w: string; d: string; h: string };
  wood: Wood;
  joinery: Joinery;
  skill: Skill;
}

export const DEFAULT_DATA: PlankraftData = {
  brief: "A walnut nightstand, about 24″ tall, with one drawer and tapered legs. Hand-rubbed oil finish.",
  dim: { w: "22", d: "16", h: "24" },
  wood: "Walnut",
  joinery: "Dovetail",
  skill: "Intermediate",
};

const STORAGE_KEY = "plankraft.data";

interface Ctx {
  data: PlankraftData;
  setData: (next: PlankraftData | ((prev: PlankraftData) => PlankraftData)) => void;
  reset: () => void;
}

const PlankraftCtx = createContext<Ctx | null>(null);

export function PlankraftStateProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<PlankraftData>(DEFAULT_DATA);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDataState({ ...DEFAULT_DATA, ...JSON.parse(raw) });
    } catch {
      // ignore — corrupted storage falls back to defaults
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }, [data, hydrated]);

  const setData: Ctx["setData"] = (next) => {
    setDataState((prev) => (typeof next === "function" ? (next as (p: PlankraftData) => PlankraftData)(prev) : next));
  };

  const reset = () => setDataState(DEFAULT_DATA);

  return <PlankraftCtx.Provider value={{ data, setData, reset }}>{children}</PlankraftCtx.Provider>;
}

export function usePlankraftState(): Ctx {
  const ctx = useContext(PlankraftCtx);
  if (!ctx) throw new Error("usePlankraftState must be used inside PlankraftStateProvider");
  return ctx;
}
