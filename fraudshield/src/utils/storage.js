export function readJson(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    if (!value || value === "undefined" || value === "null") return fallback;
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

export function readText(key, fallback = "") {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Demo mode still works if storage is unavailable.
  }
}

export function writeText(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Demo mode still works if storage is unavailable.
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // No-op.
  }
}
