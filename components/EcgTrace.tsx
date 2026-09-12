"use client";

import { useEffect, useRef } from "react";

const PX_PER_BEAT = 190; // one cardiac cycle per 190 css px
const SPEED = 74; // css px per second

/** One cardiac cycle, p in [0,1): P wave, QRS complex, T wave. */
function beat(p: number): number {
  const g = (centre: number, width: number, amp: number) => {
    const d = (p - centre) / width;
    return amp * Math.exp(-d * d);
  };
  return (
    g(0.17, 0.026, 0.13) -
    g(0.275, 0.007, 0.07) +
    g(0.3, 0.009, 1.0) -
    g(0.328, 0.012, 0.24) +
    g(0.52, 0.05, 0.28)
  );
}

export default function EcgTrace() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let start: number | null = null;

    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
      "#c01f2e";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (offset: number) => {
      ctx.clearRect(0, 0, width, height);
      const mid = height * 0.62;
      const amp = height * 0.42;
      const colour = accent();

      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = colour;
      ctx.lineWidth = 1.9;
      ctx.beginPath();

      let head = mid;
      for (let x = 0; x <= width; x++) {
        const p = (((x + offset) / PX_PER_BEAT) % 1 + 1) % 1;
        const y = mid - beat(p) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        head = y;
      }
      ctx.stroke();

      if (!reduce) {
        ctx.fillStyle = colour;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(width, head, 3.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const frame = (ts: number) => {
      if (start === null) start = ts;
      draw(((ts - start) / 1000) * SPEED);
      frameId = requestAnimationFrame(frame);
    };

    resize();
    if (reduce) draw(0);
    else frameId = requestAnimationFrame(frame);

    // The animated trace re-reads --accent every frame; the static one needs a nudge.
    const repaint = () => {
      resize();
      if (reduce) draw(0);
    };

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(repaint, 120);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("themechange", repaint);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", repaint);
    };
  }, []);

  return (
    <div className="trace-bed">
      <canvas ref={ref} aria-hidden="true" />
      <div className="trace-tag">Lead II · 25 mm/s · 10 mm/mV</div>
    </div>
  );
}
