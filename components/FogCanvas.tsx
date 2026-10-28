"use client";

import { useEffect, useRef } from "react";

/**
 * Animated smoke / fog overlay drawn with a WebGL fragment shader.
 * - Domain-warped fractal noise gives the slow, swirling "smoke" look.
 * - Density is strongest at the bottom of the hero and fades upward.
 * - The fog stays fixed; the mouse only reveals it inside a soft, lagging disc.
 * Put it absolutely over the hero image with mix-blend-mode: screen.
 */

type Props = {
  className?: string;
  /** 0–1, how much fog. */
  intensity?: number;
  /** Animation speed multiplier. 0 pins the fog in place. */
  speed?: number;
  /** Radius of the hover reveal, as a fraction of the canvas height. */
  radius?: number;
  /** Fog colour as [r, g, b] in 0–1. */
  color?: [number, number, number];
  /** Whether the fog reacts to the mouse. */
  interactive?: boolean;
};

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;     // 0–1, origin bottom-left
uniform float u_mouseAmt;  // 0–1, fades in when the mouse moves
uniform float u_intensity;
uniform float u_radius;     // reveal radius, in screen heights
uniform vec3  u_color;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.02 + 7.3;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.7;
  float t = u_time;

  // Domain warping: noise feeding noise gives curling smoke.
  vec2 q = vec2(fbm(p + vec2(0.0, -t * 0.10)),
                fbm(p + vec2(5.2, 1.3) + t * 0.07));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.13),
                fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.09));
  float f = fbm(p + 3.8 * r + vec2(t * 0.16, 0.0));

  // Fine wisps: ridges of a second, warped noise layer.
  float ridge = 1.0 - abs(2.0 * fbm(p * 1.9 + 4.0 * r + t * 0.05) - 1.0);
  ridge = pow(ridge, 3.0);

  float body = smoothstep(0.3, 0.9, f);
  float density = body * 0.75 + ridge * body * 0.55;

  // Hover reveal: invisible everywhere except in a soft disc around the (lagging) cursor.
  vec2 dm = (uv - u_mouse) * vec2(aspect, 1.0);
  float edge = clamp(length(dm) / u_radius, 0.0, 1.0);
  float reveal = pow(1.0 - smoothstep(0.0, 1.0, edge), 1.3) * u_mouseAmt;

  // Towards the rim the fine wisps melt into a blurry, low-detail haze.
  float haze = smoothstep(0.15, 0.95, f) * 0.7;
  density = mix(density, haze, smoothstep(0.35, 1.0, edge));

  // Soft glow ("bloom") that brightens the middle of the disc.
  float glow = pow(1.0 - edge, 2.5) * 0.28 * u_mouseAmt;

  density = clamp((density * 1.25 * reveal + glow) * u_intensity, 0.0, 1.0);

  // Premultiplied alpha output.
  gl_FragColor = vec4(u_color * density, density);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) || "Shader compile error");
  }
  return s;
}

export default function FogCanvas({
  className,
  intensity = 1,
  speed = 0,
  radius = 0.5,
  color = [0.93, 0.96, 1],
  interactive = true,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    // Hidden by CSS (e.g. below the desktop breakpoint): don't start a WebGL loop.
    if (canvas.clientWidth === 0 || canvas.clientHeight === 0) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return; // No WebGL: the hero simply shows without fog.

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      gl.useProgram(prog);
    } catch {
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("u_res"), uTime = u("u_time"), uMouse = u("u_mouse"),
      uMouseAmt = u("u_mouseAmt"), uInt = u("u_intensity"), uRadius = u("u_radius"), uColor = u("u_color");

    // Render at reduced resolution: fog is blurry anyway, and this keeps it fast.
    const SCALE = 0.5;
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.floor(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Mouse target and smoothed position (gives the soft, lagging swirl).
    const target = { x: 0.5, y: 0.3, amt: 0 };
    const cur = { x: 0.5, y: 0.3, amt: 0 };
    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      lastMove = performance.now();
    };
    if (interactive) window.addEventListener("pointermove", onMove);

    // Pause when the hero is off-screen.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const draw = (now: number) => {
      target.amt = now - lastMove < 1200 ? 1 : 0;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      cur.amt += (target.amt - cur.amt) * 0.04;

      const t = reduceMotion ? 0 : ((now - start) / 1000) * speed;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uMouseAmt, cur.amt);
      gl.uniform1f(uInt, intensity);
      gl.uniform1f(uRadius, radius);
      gl.uniform3f(uColor, color[0], color[1], color[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      draw(now);
    };
    if (reduceMotion) draw(start); // single static frame
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      // Release the context only if the canvas is really gone: React Strict Mode (dev)
      // re-runs this effect on the same element, which must keep a live context.
      queueMicrotask(() => {
        if (!canvas.isConnected) gl.getExtension("WEBGL_lose_context")?.loseContext();
      });
    };
  }, [intensity, speed, radius, color, interactive]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
