const USERNAME_KEY = "username";

export function getUsernameFromStorage() {
  return localStorage.getItem(USERNAME_KEY) || "Arad";
}

export function saveUsernameToStorage(username) {
  localStorage.setItem(USERNAME_KEY, username);
}
