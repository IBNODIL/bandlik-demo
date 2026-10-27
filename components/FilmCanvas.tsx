"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/*
 * Curtain wall in front of the hero image (inside REGION only). At rest only the plain image
 * is drawn. A fixed curtain template (bending drape folds) is laid over the picture and the
 * cursor reveals it as a translucent glass veil with reflections; the picture underneath is
 * not distorted. The veil fades once the pointer stops.
 */

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uMask;
uniform vec2 uCover;
uniform vec2 uTexel;
uniform float uTime;
uniform float uCw;
uniform float uAspect;
uniform vec2 uRegion;

const float FADE = 0.2;
vec2 cover(vec2 uv) { return (uv - 0.5) * uCover + 0.5; }
float wipe(vec2 uv) { return max(texture2D(uMask, uv).r - 0.08, 0.0) / 0.92; }

void main() {
  vec2 uv = vUv;
  // zero exactly at the region border, full strength FADE inside it (quintic, no visible seam)
  float fx = clamp((uv.x - uRegion.x) / FADE, 0.0, 1.0);
  float fy = clamp((uRegion.y - uv.y) / FADE, 0.0, 1.0);
  fx = fx * fx * fx * (fx * (fx * 6.0 - 15.0) + 10.0);
  fy = fy * fy * fy * (fy * (fy * 6.0 - 15.0) + 10.0);
  float R = fx * fy;
  float e = 0.035; // wide stencil -> broad, smooth normals
  float h = wipe(uv) * R;
  vec2 g = vec2(wipe(uv + vec2(e, 0.0)) - wipe(uv - vec2(e, 0.0)),
                wipe(uv + vec2(0.0, e)) - wipe(uv - vec2(0.0, e))) * R;
  g = g / max(1.0, length(g) * 2.5); // keep the warp gentle at the steepest slopes
  float w = smoothstep(0.0, 0.7, h);


  // the picture itself is left untouched
  vec3 col = texture2D(uTex, cover(uv)).rgb;

  // curtain template: drape folds whose lines bend with height, swaying very slowly.
  // The cursor only reveals it (w), the pattern itself is fixed in the scene.
  vec2 p = vec2(uv.x * uAspect, uv.y);
  float sway = sin(uTime * 0.35 + p.y * 2.0) * 0.02;
  float bend = sin(p.y * 2.2 + 0.8) * 0.2 + sin(p.y * 5.0 + 1.7) * 0.04 + sway;
  float x = p.x + bend;
  float phase = x * 13.0 + sin(p.y * 3.0) * 0.9;
  float folds = 0.5 + 0.5 * sin(phase);                 // 0 = trough, 1 = crest
  float swell = 0.5 + 0.5 * sin(x * 4.5 + 1.2);          // broad drape volume
  float shade = pow(1.0 - folds, 1.6) * (0.55 + 0.45 * swell);

  // surface normal of the glass folds (analytic slope) -> reflection of a soft light + the sky
  float nx = cos(phase) * 0.65 + cos(x * 4.5 + 1.2) * 0.3;
  vec3 N = normalize(vec3(-nx * 1.7, -0.3 * sin(p.y * 3.0), 1.0));
  vec3 L = normalize(vec3(-0.55, 0.5, 0.67));
  float spec = pow(max(dot(N, L), 0.0), 7.0);          // bright streaks on the folds that face the light
  float sheen = pow(max(dot(N, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0), 4.0); // broad glossy wash
  float fres = pow(1.0 - N.z, 1.5);                      // steeper folds reflect more

  vec3 sky = vec3(0.86, 0.93, 1.0);
  col *= 1.0 - w * (0.015 + 0.09 * shade);                          // smoked glass in the troughs
  col = mix(col, sky, w * (0.1 * sheen + 0.5 * fres));          // reflected sky
  col += vec3(1.0) * w * (0.5 * spec + 0.06 * pow(folds, 8.0));  // specular glints

  gl_FragColor = vec4(col, 1.0);
}
`;

const MASK_W = 512;
// the effect lives only in this part of the hero (fractions of the box, origin top-left)
const REGION = { x: 0.227, y: 0.37 };

export default function FilmCanvas({ src }: { src: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const maskCanvas = document.createElement("canvas");
    const mctx = maskCanvas.getContext("2d")!;
    const maskTex = new THREE.CanvasTexture(maskCanvas);
    maskTex.minFilter = THREE.LinearFilter;
    maskTex.generateMipmaps = false;

    const uniforms = {
      uTex: { value: null as THREE.Texture | null },
      uMask: { value: maskTex },
      uCover: { value: new THREE.Vector2(1, 1) },
      uTexel: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uCw: { value: 1 },
      uAspect: { value: 1 },
      uRegion: { value: new THREE.Vector2(REGION.x, 1 - REGION.y) },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    let imgAspect = 1;
    let firstFrame = true; // also re-armed on resize, which clears the canvas
    let cw = 1;
    let ch = 1;
    const resize = () => {
      cw = el.clientWidth || 1;
      ch = el.clientHeight || 1;
      renderer.setSize(cw, ch, false);
      uniforms.uCw.value = cw;
      uniforms.uAspect.value = cw / ch;
      firstFrame = true;
      maskCanvas.width = MASK_W;
      maskCanvas.height = Math.max(1, Math.round((MASK_W * ch) / cw));
      maskTex.dispose(); // storage is immutable: re-allocate for the new size
      mctx.fillStyle = "#000";
      mctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      const ca = cw / ch;
      uniforms.uCover.value.set(ca > imgAspect ? 1 : ca / imgAspect, ca > imgAspect ? imgAspect / ca : 1);
    };

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    let disposed = false;
    loader.load(src, (t) => {
      if (disposed) return t.dispose();
      t.anisotropy = 4;
      imgAspect = t.image.width / t.image.height;
      uniforms.uTex.value = t;
      resize();
      setReady(true);
    });

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // brush
    let last: { x: number; y: number } | null = null;
    let awakeUntil = 0;
    const brush = (x: number, y: number, strength: number) => {
      const r = maskCanvas.width * (0.16 + strength * 0.08);
      const gr = mctx.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, `rgba(255,255,255,${0.25 + strength * 0.55})`);
      gr.addColorStop(0.6, `rgba(255,255,255,${0.1 + strength * 0.25})`);
      gr.addColorStop(1, "rgba(255,255,255,0)");
      mctx.fillStyle = gr;
      mctx.fillRect(x - r, y - r, r * 2, r * 2);
    };
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      const nx = (e.clientX - b.left) / b.width;
      const ny = (e.clientY - b.top) / b.height;
      if (nx < REGION.x || nx > 1 || ny < REGION.y || ny > 1) {
        last = null;
        return;
      }
      const x = nx * maskCanvas.width;
      const y = ny * maskCanvas.height;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / 5));
        const s = Math.min(dist / 30, 1);
        for (let i = 1; i <= steps; i++) brush(last.x + (dx * i) / steps, last.y + (dy * i) / steps, s);
      }
      last = { x, y };
      awakeUntil = performance.now() + 1200;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // loop (paused offscreen)
    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(el);
    let raf = 0;
    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || !uniforms.uTex.value) return;
      if (performance.now() > awakeUntil && !firstFrame) return; // idle: keep the last (flat) frame
      firstFrame = false;
      // relax the bubble
      mctx.fillStyle = "rgba(0,0,0,0.05)";
      mctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskTex.needsUpdate = true;
      uniforms.uTime.value = (performance.now() - t0) / 1000;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      uniforms.uTex.value?.dispose();
      maskTex.dispose();
      mesh.geometry.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src]);

  return (
    <div
      ref={host}
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity duration-700"
      style={{ opacity: ready ? 1 : 0 }}
    />
  );
}
