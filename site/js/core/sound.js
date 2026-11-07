// Ambient score + interaction cues. Mirrors the original Howler state machine:
// enabled by default, waits for a user gesture to start, and exposes a status
// of "waiting" | "loading" | "playing" | "off" | "error".

const AMBIENCE_URL = "/audio/ambience.mp3";
const CUES_URL = "/audio/cues.mp3";
const SPRITE = { clack: [0, 300], slash: [500, 650], taiko: [1400, 1400] };

let state = { enabled: true, status: "waiting" };
const listeners = new Set();

export const getSoundState = () => state;
export function subscribeSound(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function setState(enabled, status) {
  if (state.enabled === enabled && state.status === status) return;
  state = { enabled, status };
  listeners.forEach((fn) => fn(state));
}

let ctx = null;
let ambienceGain = null;
let cueGain = null;
let ambienceBuffer = null;
let cueBuffer = null;
let source = null;
let startedAt = 0;
let offset = 0;
let wanted = false;
let hidden = false;
let starting = false;
let generation = 0;
let loading = null;
let timeout = 0;

function ensureContext() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  ambienceGain = ctx.createGain();
  ambienceGain.gain.value = 0.28;
  ambienceGain.connect(ctx.destination);
  cueGain = ctx.createGain();
  cueGain.gain.value = 0.34;
  cueGain.connect(ctx.destination);
  return ctx;
}

async function decode(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Audio request failed: ${url}`);
  const data = await res.arrayBuffer();
  return await new Promise((resolve, reject) => ctx.decodeAudioData(data, resolve, reject));
}

const isPlaying = () => !!source;

function stopAmbience() {
  if (source) {
    const duration = ambienceBuffer?.duration || 1;
    offset = (offset + (ctx.currentTime - startedAt)) % duration;
    try { source.stop(); } catch {}
    source.disconnect();
    source = null;
  }
  starting = false;
}

function unload() {
  clearTimeout(timeout);
  generation += 1;
  stopAmbience();
  ambienceBuffer = null;
  cueBuffer = null;
  loading = null;
  offset = 0;
}

function tryPlay() {
  if (!wanted || hidden || starting || !ambienceBuffer || isPlaying()) return;
  if (ctx.state !== "running") {
    setState(true, "waiting");
    return;
  }
  starting = true;
  source = ctx.createBufferSource();
  source.buffer = ambienceBuffer;
  source.loop = true;
  source.connect(ambienceGain);
  startedAt = ctx.currentTime;
  source.start(0, offset);
  starting = false;
  if (!wanted || hidden) stopAmbience();
  else {
    clearTimeout(timeout);
    setState(true, "playing");
  }
}

/** Called on any user gesture outside the sound control to unlock audio. */
export function resumeSound() {
  if (!wanted || hidden || !ctx) return;
  if (ctx.state === "running") {
    tryPlay();
    return;
  }
  const gen = generation;
  ctx
    .resume()
    .then(() => {
      if (gen === generation) tryPlay();
    })
    .catch(() => {
      if (wanted && gen === generation) setState(true, "waiting");
    });
  tryPlay();
}

export function setSoundEnabled(on) {
  wanted = on;
  hidden = document.hidden;
  if (!on) {
    clearTimeout(timeout);
    stopAmbience();
    setState(false, "off");
    return;
  }
  setState(true, isPlaying() ? "playing" : "loading");
  if (!ensureContext()) {
    wanted = false;
    setState(false, "error");
    return;
  }
  if (!loading) {
    const gen = ++generation;
    const fail = () => {
      if (gen !== generation) return;
      const was = wanted;
      wanted = false;
      unload();
      if (was) setState(false, "error");
    };
    loading = decode(AMBIENCE_URL)
      .then((buffer) => {
        if (gen !== generation) return;
        ambienceBuffer = buffer;
        clearTimeout(timeout);
        tryPlay();
        if (wanted && !isPlaying() && ctx.state !== "running") setState(true, "waiting");
      })
      .catch(fail);
    decode(CUES_URL)
      .then((buffer) => {
        if (gen === generation) cueBuffer = buffer;
      })
      .catch(() => console.warn("Festival interaction sounds are unavailable."));
  }
  const gen = generation;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (wanted && gen === generation && !ambienceBuffer) {
      wanted = false;
      unload();
      setState(false, "error");
    }
  }, 15000);
  resumeSound();
}

export function toggleSound() {
  setSoundEnabled(!state.enabled);
}

export function playCue(name) {
  if (!wanted || hidden || !cueBuffer || !ctx || ctx.state !== "running") return;
  const [start, duration] = SPRITE[name] || [];
  if (start === undefined) return;
  const cue = ctx.createBufferSource();
  cue.buffer = cueBuffer;
  cue.connect(cueGain);
  cue.start(0, start / 1000, duration / 1000);
}

export function setSoundHidden(isHidden) {
  hidden = isHidden;
  if (isHidden) stopAmbience();
  else resumeSound();
}
