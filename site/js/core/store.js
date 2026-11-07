const gsap = window.gsap;

// The seven sanctuary doors, in the order they sit around the room.
export const DOORS = [
  { id: "projects", href: "/projects", title: "PROJECTS", subtitle: "Full-Stack, Systems & Web Apps", mark: "01" },
  { id: "journey", href: "/journey", title: "JOURNEY", subtitle: "Education, Routine & Milestones", mark: "02" },
  { id: "skills", href: "/skills", title: "SKILLS", subtitle: "Tech Arsenal & Certifications", mark: "03" },
  { id: "leadership", href: "/leadership", title: "ACHIEVEMENTS", subtitle: "ITian Club & Competition Wins", mark: "04" },
  { id: "about", href: "/about", title: "ABOUT ME", subtitle: "Developer Profile & Bio", mark: "05" },
  { id: "gallery", href: "/gallery", title: "GALLERY", subtitle: "UI Showcase & Visual Aesthetics", mark: "06" },
  { id: "contact", href: "/contact", title: "CONTACT", subtitle: "Direct Reach & Social Hub", mark: "07" },
];

export const ROOM_START = 0.56;
export const ROOM_LEAVE = 0.93;
export const FALLS_START = 0.985;
export const DOOR_RADIUS = 9;
export const ROOM_FLOOR = 6.28;
export const ROOM_Z = -39;

export const doorAngle = (i) => ((i + 1) * Math.PI * 2) / DOORS.length;
export const doorTravel = (i) => ROOM_START + (i / (DOORS.length - 1)) * (0.92 - ROOM_START);
export const doorAtTravel = (t) =>
  Math.max(0, Math.min(DOORS.length - 1, Math.round(((t - ROOM_START) / (0.92 - ROOM_START)) * (DOORS.length - 1))));
export const angleDelta = (from, to) => Math.atan2(Math.sin(to - from), Math.cos(to - from));

export const CHAPTERS = [
  { label: "The threshold", detail: "A quieter world begins here.", progress: 0 },
  { label: "The ascent", detail: "Follow the lanterns. Leave the ordinary.", progress: 0.25 },
  { label: "The sanctuary", detail: "Every door opens a different world.", progress: 0.56 },
  { label: "The hidden falls", detail: "Beyond the shrine, a story unfolds.", progress: 1 },
];

export const journey = {
  travel: 0,
  stage: 0,
  finale: 0,
  burst: 0,
  visible: true,
  inVoid: false,
  roomDoor: 0,
  roomAngle: doorAngle(0),
  doorAligned: false,
  openDoor: -1,
  doorAmount: 0,
  sceneRevision: 0,
};

export function resetJourney() {
  Object.assign(journey, {
    travel: 0,
    stage: 0,
    finale: 0,
    visible: true,
    inVoid: false,
    roomDoor: 0,
    roomAngle: doorAngle(0),
    doorAligned: false,
    openDoor: -1,
    doorAmount: 0,
  });
}

gsap.ticker.lagSmoothing(500, 33);

const subscribers = new Map();
let ordered = [];

function tick(time, deltaMs) {
  if (document.hidden) return;
  const dt = Math.min(deltaMs, 50);
  for (const fn of ordered) fn(time, dt);
}

/** Registers a per-frame callback; lower priority runs first. Returns an unsubscribe. */
export function onFrame(fn, priority = 0) {
  if (subscribers.size === 0) gsap.ticker.add(tick);
  subscribers.set(fn, priority);
  ordered = [...subscribers].sort((a, b) => a[1] - b[1]).map(([f]) => f);
  return () => {
    subscribers.delete(fn);
    ordered = [...subscribers].sort((a, b) => a[1] - b[1]).map(([f]) => f);
    if (subscribers.size === 0) gsap.ticker.remove(tick);
  };
}
