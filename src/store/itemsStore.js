// src/store/itemsStore.js
export const STORAGE_KEY = "mt.items";

export function loadItems(fallback = []) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("mt-items-updated"));
}

export function addItem(item, fallback = []) {
  const items = loadItems(fallback);
  items.push(item);
  saveItems(items);
  return items;
}

// New:
export function removeItem(id, fallback = []) {
  const items = loadItems(fallback).filter(it => it.id !== id);
  saveItems(items);
  return items;
}

export function clearItems() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("mt-items-updated"));
}

export function exportItems() {
  return JSON.stringify(loadItems([]), null, 2);
}

