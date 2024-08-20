const key = "SnapTask-token";

export function getToken() {
  return JSON.parse(localStorage.getItem(key));
}

export function storeToken(token) {
  if (!token) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, JSON.stringify(token));
}
