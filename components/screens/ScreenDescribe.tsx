"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlankraftState } from "@/lib/state";
import PaperPreview from "./PaperPreview";

const SUGGESTIONS = [
  "walnut nightstand with one drawer",
  "white oak floating bookshelf",
  "shaker coffee table 48×24",
  "cedar planter, weather-resistant",
  "live-edge slab desk",
] as const;

// Web Speech API typings — minimal, what we actually use.
interface SpeechRecResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecEvent {
  results: ArrayLike<SpeechRecResult>;
}
interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: SpeechRecEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: Event) => void) | null;
  start: () => void;
  stop: () => void;
}
type SpeechRecCtor = new () => SpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecCtor;
    webkitSpeechRecognition?: SpeechRecCtor;
  }
}

export default function ScreenDescribe() {
  const { data, setData } = usePlankraftState();
  const router = useRouter();
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recogRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    setVoiceSupported(!!Ctor);
  }, []);

  function toggleVoice() {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) return;
    if (listening) {
      recogRef.current?.stop();
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    let baseline = data.brief;
    rec.onresult = (e: SpeechRecEvent) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      const next = baseline ? `${baseline} ${text}`.trim() : text;
      setData((prev) => ({ ...prev, brief: next }));
    };
    rec.onend = () => {
      setListening(false);
      recogRef.current = null;
    };
    rec.onerror = () => {
      setListening(false);
      recogRef.current = null;
    };
    recogRef.current = rec;
    setListening(true);
    rec.start();
  }

  return (
    <section className="screen" id="screen-1">
      <div className="s1-wrap">
        <div className="s1-left">
          <div className="s1-eyebrow-row">
            <span className="num">01 / 04</span>
            <span className="rule" style={{ flex: 1, maxWidth: 80 }} />
            <span className="eyebrow">Brief</span>
          </div>
          <h1 className="display s1-title">
            What are you<br />
            <em>building.</em>
          </h1>
          <p className="s1-sub">
            Plain language. The wood you&apos;ve got, the joinery you want, the space it needs to fill. No forms.
            No menus. Just say it.
          </p>

          <div className="s1-prompt">
            <div className="s1-prompt-label">The brief</div>
            <textarea
              className="s1-textarea"
              rows={4}
              value={data.brief}
              onChange={(e) => setData({ ...data, brief: e.target.value })}
              placeholder="A walnut nightstand. 24 inches. One drawer, tapered legs, oil finish. Nothing fancy — just right."
              autoFocus
            />
            <div className="s1-prompt-foot">
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className="s1-iconbtn"
                    aria-pressed={listening}
                    style={listening ? { background: "var(--sienna)", color: "var(--paper)", borderColor: "var(--sienna)" } : undefined}
                  >
                    <span>🎙</span>{listening ? "Stop" : "Voice"}
                  </button>
                )}
                <Link href="/inspiration" className="s1-iconbtn">
                  <span>↗</span>Reference
                </Link>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/inspiration")}
                disabled={data.brief.trim().length === 0}
                style={{ opacity: data.brief.trim().length === 0 ? 0.4 : 1 }}
              >
                Continue
                <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>→</span>
              </button>
            </div>
          </div>

          <div className="s1-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="s1-suggest"
                type="button"
                onClick={() => setData({ ...data, brief: s.charAt(0).toUpperCase() + s.slice(1) })}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="s1-stack">
          <PaperPreview rotate />
          <PaperPreview />
          <PaperPreview hero />
          <div className="s1-stack-label">Studio Plankraft · 2026</div>
        </div>
      </div>
    </section>
  );
}
