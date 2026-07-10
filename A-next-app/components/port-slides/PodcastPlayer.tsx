"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  KAOYAN_TRANSCRIPT,
  findTranscriptIndex,
  type TranscriptSegment,
} from "./podcast-kaoyan-transcript";

const SRC = "/audio/podcast-kaoyan.mp3";
const SPEEDS = [1, 1.25, 1.5, 2] as const;

const C = {
  title: "#4C2F30",
  brand: "#6A4041",
  muted: "#867070",
  border: "rgba(0,0,0,0.08)",
  track: "rgba(0,0,0,0.08)",
  bg: "#FAFAF8",
};

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function IconPlay() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 2.2 L10 6 L3 9.8 Z" fill="white" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="2.5" y="2" width="2.5" height="8" rx="0.5" fill="white" />
      <rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="white" />
    </svg>
  );
}

function IconSpeed() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1.5 A5.5 5.5 0 1 1 1.5 7" stroke={C.brand} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M1.5 4.5 L1.5 1.5 L4.5 1.5" stroke={C.brand} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 2v7M4.5 6.5 L7 9 9.5 6.5" stroke={C.brand} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 11.5 h9" stroke={C.brand} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconThumbUp({ active }: { active?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M4.5 6.2 V11 H2.8 c-.4 0-.8-.4-.8-.8 V6.8 c0-.4.4-.8.8-.8 h1.7 Z M4.5 6.2 L6.2 2.8 c.2-.5.8-.7 1.2-.4 l1 .7 c.3.2.4.6.3 1 l-.5 2.2 h3.3 c.5 0 .9.4.9.9 v.2 c0 .2-.1.4-.2.6 l-1.8 2.5 c-.2.2-.4.3-.7.3 H4.5"
        stroke={active ? C.brand : C.brand}
        fill={active ? C.brand : "none"}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconThumbDown({ active }: { active?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ transform: "scaleY(-1)" }}>
      <path
        d="M4.5 6.2 V11 H2.8 c-.4 0-.8-.4-.8-.8 V6.8 c0-.4.4-.8.8-.8 h1.7 Z M4.5 6.2 L6.2 2.8 c.2-.5.8-.7 1.2-.4 l1 .7 c.3.2.4.6.3 1 l-.5 2.2 h3.3 c.5 0 .9.4.9.9 v.2 c0 .2-.1.4-.2.6 l-1.8 2.5 c-.2.2-.4.3-.7.3 H4.5"
        stroke={C.brand}
        fill={active ? C.brand : "none"}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M1.5 1.5 L8.5 8.5 M8.5 1.5 L1.5 8.5" stroke={C.brand} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

type ActionProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

function Action({ icon, label, onClick }: ActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        gap: 4,
        alignItems: "center",
        border: "none",
        background: "transparent",
        cursor: onClick ? "pointer" : "default",
        padding: 0,
      }}
    >
      {icon}
      <span style={{ fontSize: 10, lineHeight: "14px", color: C.muted }}>{label}</span>
    </button>
  );
}

type TranscriptPanelProps = {
  segments: TranscriptSegment[];
  current: number;
  onSeek: (time: number) => void;
};

function TranscriptPanel({ segments, current, onSeek }: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIdx = useMemo(() => findTranscriptIndex(segments, current), [segments, current]);

  useEffect(() => {
    const container = scrollRef.current;
    const line = lineRefs.current[activeIdx];
    if (!container || !line) return;

    const containerRect = container.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();
    const top =
      container.scrollTop +
      lineRect.top -
      containerRect.top -
      (container.clientHeight - lineRect.height) / 2;
    container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [activeIdx]);

  return (
    <div
      ref={scrollRef}
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "16px 14px 12px",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {segments.map((seg, i) => {
          const isActive = i === activeIdx;
          const isPast = current >= seg.end;
          return (
            <button
              key={`${seg.start}-${seg.speaker}`}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              type="button"
              onClick={() => onSeek(seg.start)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                border: "none",
                borderLeft: isActive ? `2px solid ${C.brand}` : "2px solid transparent",
                borderRadius: 6,
                background: isActive ? "rgba(106,64,65,0.08)" : "transparent",
                padding: "8px 10px 8px 12px",
                cursor: "pointer",
                opacity: isPast && !isActive ? 0.52 : 1,
                transition: "background 0.2s ease, opacity 0.2s ease",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  lineHeight: "16px",
                  color: isActive ? C.brand : C.muted,
                  fontFamily: "'PingFang SC', sans-serif",
                  fontWeight: isActive ? 600 : 500,
                  marginBottom: 4,
                }}
              >
                {seg.speaker}
                <span style={{ marginLeft: 8, fontWeight: 400, fontFamily: "monospace", fontSize: 10 }}>
                  {fmt(seg.start)}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: isActive ? C.title : "rgba(76,47,48,0.88)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {seg.text}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PodcastPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (!dragging.current) setCurrent(audio.currentTime);
    };
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("ended", onEnded);

    if (audio.readyState >= 1) onLoaded();

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = SPEEDS[speedIdx];
  }, [speedIdx]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play();
      setPlaying(true);
    }
  };

  const seekRatio = useCallback(
    (ratio: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const t = Math.max(0, Math.min(1, ratio)) * duration;
      audio.currentTime = t;
      setCurrent(t);
    },
    [duration],
  );

  const seekTo = useCallback(
    (time: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const t = Math.max(0, duration ? Math.min(time, duration) : time);
      audio.currentTime = t;
      setCurrent(t);
    },
    [duration],
  );

  const seekFromEvent = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    seekRatio((clientX - rect.left) / rect.width);
  };

  const onBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekFromEvent(e.clientX);
  };

  const onBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    seekFromEvent(e.clientX);
  };

  const onBarPointerUp = () => {
    dragging.current = false;
  };

  const cycleSpeed = () => setSpeedIdx((i) => (i + 1) % SPEEDS.length);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        boxSizing: "border-box",
      }}
    >
      {/* 播客文稿：随播放进度高亮并自动滚动定位 */}
      <TranscriptPanel segments={KAOYAN_TRANSCRIPT} current={current} onSeek={seekTo} />

      {/* 底部播客控制条 — 对齐参考 DOM 结构 */}
      <div
        style={{
          flexShrink: 0,
          padding: "8px 12px 12px",
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <audio ref={audioRef} src={SRC} preload="metadata" />

        {/* 标题行 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div
            style={{
              flex: 1,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "24px",
              color: C.title,
              fontFamily: "'PingFang SC', sans-serif",
            }}
          >
            考研全年复习规划播客
          </div>
          <button
            type="button"
            aria-label="关闭"
            style={{
              flexShrink: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 4,
              lineHeight: 0,
            }}
          >
            <IconClose />
          </button>
        </div>

        {/* 播放 + 进度条 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "暂停" : "播放"}
            style={{
              flexShrink: 0,
              width: 28,
              height: 28,
              borderRadius: 14,
              background: C.brand,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: playing ? 0 : 2,
            }}
          >
            {playing ? <IconPause /> : <IconPlay />}
          </button>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              ref={barRef}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={current}
              aria-label="播放进度"
              onPointerDown={onBarPointerDown}
              onPointerMove={onBarPointerMove}
              onPointerUp={onBarPointerUp}
              onPointerCancel={onBarPointerUp}
              style={{
                height: 4,
                borderRadius: 4,
                background: C.track,
                position: "relative",
                cursor: "pointer",
                touchAction: "none",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 4,
                  background: C.brand,
                  width: `${pct}%`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: C.brand,
                  position: "absolute",
                  top: "50%",
                  left: `${pct}%`,
                  transform: "translate(-50%, -50%)",
                  cursor: "grab",
                }}
              />
            </div>
            <div style={{ fontSize: 10, lineHeight: "14px", color: C.muted, fontFamily: "monospace" }}>
              {fmt(current)}/{duration > 0 ? fmt(duration) : "00:00"}
            </div>
          </div>
        </div>

        {/* 底部操作 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "4px 4px 0",
          }}
        >
          <Action icon={<IconSpeed />} label={`${SPEEDS[speedIdx]}倍`} onClick={cycleSpeed} />
          <Action
            icon={<IconDownload />}
            label="下载"
            onClick={() => {
              const a = document.createElement("a");
              a.href = SRC;
              a.download = "考研全年复习规划播客.wav";
              a.click();
            }}
          />
          <Action
            icon={<IconThumbUp active={liked === true} />}
            label="点赞"
            onClick={() => setLiked(liked === true ? null : true)}
          />
          <Action
            icon={<IconThumbDown active={liked === false} />}
            label="点踩"
            onClick={() => setLiked(liked === false ? null : false)}
          />
        </div>
      </div>
    </div>
  );
}
