import { openDB } from 'idb'

const DB_NAME = 'TCDebtDB'

// Inicializa la base de datos
export async function initDB(storeName: string) {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      // Aquí puedes agregar más stores si es necesario
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' })
      }
    }
  })
}

// Función genérica para guardar datos en una store
export async function saveToStore(storeName: string, data: any) {
  const db = await initDB(storeName)
  return db.put(storeName, data)
}

// Función genérica para obtener todos los datos de una store
export async function getAllFromStore(storeName: string) {
  const db = await initDB(storeName)
  return db.getAll(storeName)
}

// Función genérica para eliminar un dato de una store
export async function deleteFromStore(storeName: string, key: string | number) {
  const db = await initDB(storeName)
  return db.delete(storeName, key)
}

// Función genérica para obtener un dato específico de una store
export async function getFromStore(storeName: string, key: string | number) {
  const db = await initDB(storeName)
  return db.get(storeName, key)
}
