export function getDeviceIdFromObserverTarget(target) {
  let current = target;

  while (current) {
    const id = current.dataset?.deviceId;
    if (id) return id;
    current = current.parentElement;
  }

  return null;
}
