"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import PlaceholderTile from "./PlaceholderTile";
import type { TileKind } from "./TileArt";
import { usePlankraftState, type Reference } from "@/lib/state";

interface InspirationCard {
  id: number;
  kind: TileKind;
  label: string;
  tags: string[];
  col: number;
  row: number;
  w: number;
  h: number;
  hue: number;
}

const CARDS: InspirationCard[] = [
  { id: 1, kind: "leg", label: "Mid-century leg", tags: ["tapered", "walnut"], col: 1, row: 1, w: 4, h: 3, hue: 50 },
  { id: 2, kind: "pull", label: "Brass pull", tags: ["hardware"], col: 5, row: 1, w: 3, h: 2, hue: 75 },
  { id: 3, kind: "dovetail", label: "Drawer joinery", tags: ["dovetail"], col: 8, row: 1, w: 5, h: 3, hue: 60 },
  { id: 4, kind: "slab", label: "Live edge top", tags: ["slab"], col: 5, row: 3, w: 3, h: 2, hue: 45 },
  { id: 5, kind: "finish", label: "Oil finish", tags: ["finish", "matte"], col: 1, row: 4, w: 3, h: 2, hue: 55 },
  { id: 6, kind: "apron", label: "Apron detail", tags: ["frame"], col: 4, row: 4, w: 4, h: 2, hue: 40 },
  { id: 7, kind: "grain", label: "Walnut grain", tags: ["material"], col: 8, row: 4, w: 5, h: 2, hue: 50 },
];

const SUGGESTED_TAGS = ["low-profile pull", "live edge", "shaker", "mid-century", "shou-sugi-ban"];

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function ScreenInspiration() {
  const router = useRouter();
  const { data, setData } = usePlankraftState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pastedUrl, setPastedUrl] = useState("");
  const [newTag, setNewTag] = useState("");

  const totalRefs = CARDS.length + 2 /* sketch + grain bonus tiles */ + data.references.length;

  function addReference(ref: Reference) {
    setData((prev) => ({ ...prev, references: [...prev.references, ref] }));
  }
  function removeReference(id: string) {
    setData((prev) => ({ ...prev, references: prev.references.filter((r) => r.id !== id) }));
  }

  async function handleFile(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/inspiration/upload",
      });
      addReference({
        id: genId(),
        url: blob.url,
        label: file.name.replace(/\.[^.]+$/, ""),
        tags: [],
      });
    } catch (err) {
      setUploadError(
        err instanceof Error
          ? err.message
          : "Upload failed. Make sure BLOB_READ_WRITE_TOKEN is set on the server.",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handlePastedUrl() {
    const url = pastedUrl.trim();
    if (!url) return;
    try {
      const u = new URL(url);
      addReference({
        id: genId(),
        url: u.toString(),
        label: u.hostname,
        tags: [],
      });
      setPastedUrl("");
    } catch {
      setUploadError("That doesn't look like a URL.");
    }
  }

  function toggleTag(t: string) {
    setData((prev) => {
      const exists = prev.activeTags.includes(t);
      return {
        ...prev,
        activeTags: exists ? prev.activeTags.filter((x) => x !== t) : [...prev.activeTags, t],
      };
    });
  }

  function addNewTag() {
    const t = newTag.trim().toLowerCase();
    if (!t) return;
    if (!data.activeTags.includes(t)) toggleTag(t);
    setNewTag("");
  }

  const allKnownTags = Array.from(new Set([...data.activeTags, ...SUGGESTED_TAGS]));

  return (
    <section className="screen" id="screen-2">
      <div className="s2-wrap">
        <div className="s2-head">
          <div className="s2-head-left">
            <div className="s1-eyebrow-row">
              <span
                className="num"
                style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--sienna)", fontWeight: 600 }}
              >
                II / IV
              </span>
              <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--rule)" }} />
              <span className="eyebrow">Inspiration</span>
            </div>
            <h1 className="display s2-title">
              Show me what
              <br />
              you <em>mean.</em>
            </h1>
            <p className="s2-sub">
              Drop a photo, paste a link. Tag what matters — the grain, the joint, the proportion — and the plan
              weights it.
            </p>
          </div>
          <div className="s2-tagger">
            <div className="s2-tagger-h">
              <span className="s2-tagger-label">Active tags</span>
              <span className="s2-tagger-count">
                {data.activeTags.length} pinned
              </span>
            </div>
            <div className="s2-tags">
              {allKnownTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`chip ${data.activeTags.includes(t) ? "chip-active" : ""}`}
                  onClick={() => toggleTag(t)}
                  style={{ cursor: "pointer", border: "1px solid var(--rule)" }}
                >
                  {t}
                </button>
              ))}
              <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addNewTag();
                    }
                  }}
                  placeholder="+ add tag"
                  style={{
                    border: "1px dashed var(--rule)",
                    background: "transparent",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontFamily: "var(--sans)",
                    fontSize: 12,
                    color: "var(--ink-soft)",
                    outline: "none",
                    width: 100,
                  }}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="s2-grid">
          {CARDS.map((c) => (
            <div
              key={c.id}
              className="s2-card"
              style={{ gridColumn: `${c.col} / span ${c.w}`, gridRow: `${c.row} / span ${c.h}` }}
            >
              <PlaceholderTile label={c.label} hue={c.hue} kind={c.kind} />
              <div className="s2-tags-on-card">
                {c.tags.map((t) => (
                  <span key={t} className="s2-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="s2-card" style={{ gridColumn: "4 / span 4", gridRow: "6 / span 2" }}>
            <PlaceholderTile label="Sketchbook page" hue={65} kind="sketch" />
            <div className="s2-tags-on-card">
              <span className="s2-tag">freehand</span>
            </div>
          </div>
          <div className="s2-card" style={{ gridColumn: "8 / span 5", gridRow: "6 / span 2" }}>
            <PlaceholderTile label="Wood grain · walnut" hue={45} kind="grain" />
          </div>

          {/* upload card */}
          <label
            className="s2-card s2-card-add"
            style={{ gridColumn: "1 / span 3", gridRow: "6 / span 2" }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <span style={{ fontSize: 22, fontWeight: 300 }}>{uploading ? "↑" : "+"}</span>
            <span>{uploading ? "Uploading…" : "Drop image"}</span>
          </label>

          {/* user references — appended below bundled grid */}
          {data.references.map((r, i) => {
            const colStart = ((i * 4) % 12) + 1;
            const row = 8 + Math.floor((i * 4) / 12) * 3;
            return (
              <div
                key={r.id}
                className="s2-card"
                style={{ gridColumn: `${colStart} / span 4`, gridRow: `${row} / span 3` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.url}
                  alt={r.label ?? "reference"}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  type="button"
                  onClick={() => removeReference(r.id)}
                  title="Remove"
                  className="no-print"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 22,
                    height: 22,
                    border: "none",
                    background: "rgba(0,0,0,0.55)",
                    color: "var(--paper)",
                    cursor: "pointer",
                    borderRadius: 999,
                    fontSize: 12,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
                <div
                  className="s2-placeholder"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 100%)",
                    color: "var(--paper)",
                  }}
                >
                  {r.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* paste URL row */}
        <div
          className="no-print"
          style={{
            marginTop: 24,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <input
            type="url"
            value={pastedUrl}
            onChange={(e) => setPastedUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handlePastedUrl();
              }
            }}
            placeholder="Or paste a URL — https://…"
            style={{
              flex: 1,
              maxWidth: 480,
              padding: "10px 14px",
              border: "1px solid var(--rule)",
              background: "rgba(255,255,255,0.5)",
              fontFamily: "var(--sans)",
              fontSize: 13,
              color: "var(--ink)",
              outline: "none",
              borderRadius: 2,
            }}
          />
          <button type="button" className="btn btn-ghost" onClick={handlePastedUrl} disabled={!pastedUrl.trim()}>
            Add
          </button>
          {uploadError && (
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--sienna)",
                letterSpacing: "0.05em",
              }}
            >
              ● {uploadError}
            </span>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48 }}>
          <button className="btn btn-ghost" type="button" onClick={() => router.push("/brief")}>
            ← Back
          </button>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.05em" }}>
              {totalRefs} references · {data.activeTags.length} tags
            </span>
            <button className="btn btn-primary" type="button" onClick={() => router.push("/measurements")}>
              Continue <span style={{ fontSize: 12 }}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
