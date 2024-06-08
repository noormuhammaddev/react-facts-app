// src/utils/db.ts
import { openDB } from 'idb';

const DB_NAME = 'facts-database';
const STORE_NAME = 'records';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const addItem = async (item: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add(item);
  await tx.done;
};

export const getItems = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const updateItem = async (item: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.put(item);
  await tx.done;
};

export const deleteItem = async (id: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};
