import { openDB, IDBPDatabase } from 'idb'

const DB_NAME = 'TCDebtDB'
const DB_VERSION = 1
const STORES = ['cards', 'purchases']

let dbPromise: Promise<IDBPDatabase> | null = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        STORES.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id' })
          }
        })
      }
    })
  }
  return dbPromise
}
