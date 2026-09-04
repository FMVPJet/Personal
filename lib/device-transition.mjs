const MODEL_TRAVEL_DURATION = 760;
const MODEL_STAGGER = 90;
const FOUR_MODEL_VECTORS = [
  { x: -52, y: -42 },
  { x: 52, y: -42 },
  { x: -52, y: 42 },
  { x: 52, y: 42 },
];

function normalizeCount(count) {
  return Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
}

function normalizeIndex(index) {
  return Number.isFinite(index) ? Math.max(0, Math.floor(index)) : 0;
}

export function getDeviceEntryVector(index, count) {
  const normalizedCount = normalizeCount(count);
  const normalizedIndex = normalizeIndex(index);

  if (normalizedCount === 4) {
    return FOUR_MODEL_VECTORS[normalizedIndex % FOUR_MODEL_VECTORS.length];
  }

  if (normalizedCount === 0) {
    return { x: 0, y: 0 };
  }

  const angle = -Math.PI / 2 + (normalizedIndex % normalizedCount) * 2 * Math.PI / normalizedCount;
  return {
    x: Math.cos(angle) * 58,
    y: Math.sin(angle) * 48,
  };
}

export function getDeviceTransitionDelay(index) {
  return normalizeIndex(index) * MODEL_STAGGER;
}

export function getDeviceTransitionDuration(count) {
  return MODEL_TRAVEL_DURATION + Math.max(0, normalizeCount(count) - 1) * MODEL_STAGGER;
}

export function getDeviceAnimationMetadata(index, count) {
  const vector = getDeviceEntryVector(index, count);

  return {
    entryX: vector.x,
    entryY: vector.y,
    delay: getDeviceTransitionDelay(index),
    duration: getDeviceTransitionDuration(count),
  };
}
