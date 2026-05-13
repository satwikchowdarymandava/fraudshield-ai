import { readJson, writeJson } from "./storage.js";

const ACCOUNTS_KEY = "fraudshield-accounts";

export function getAccounts() {
  const accounts = readJson(ACCOUNTS_KEY, []);
  return Array.isArray(accounts) ? accounts : [];
}

export function createAccount({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();

  if (accounts.some((account) => account.email === normalizedEmail)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const account = {
    id: `USER-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password
  };

  writeJson(ACCOUNTS_KEY, [...accounts, account]);
  return { ok: true, user: publicProfile(account) };
}

export function verifyAccount(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = getAccounts().find((item) => item.email === normalizedEmail);

  if (!account) {
    return { ok: false, error: "No account found with this email. Please create an account first." };
  }

  if (account.password !== password) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }

  return { ok: true, user: publicProfile(account) };
}

function publicProfile(account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email
  };
}
