// LocalStorage helper functions - safe get / set / remove with JSON parsing

// Get and safely parse JSON value from localStorage
export const getLocalData = (key) => {
  const raw = localStorage.getItem(key);

  try {
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("localStorage parse error for key:", key, err);
    return null;
  }
};

// Stringify and save value to localStorage
export const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("localStorage set error for key:", key, err);
  }
};

// Remove a single key from localStorage
export const removeLocalData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("localStorage remove error for key:", key, err);
  }
};

// Optional: Clear entire localStorage
export const clearAllLocalData = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("localStorage clear error:", err);
  }
};
