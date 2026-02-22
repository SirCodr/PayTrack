import { getDB } from '@/lib/indexDB'
import { CreditCard } from '@/types/card'
import { Purchase } from '@/types/purchase'
import { useState, useEffect, useCallback } from 'react'

export type Stores = {
  cards: CreditCard
  purchases: Purchase
}

export function useIndexedStore<K extends keyof Stores>(storeName: K) {
  const [data, setData] = useState<Stores[K][]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    const db = await getDB()
    const result = await db.getAll(storeName)
    setData(result)
    setLoading(false)
  }, [storeName])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  // Configurar BroadcastChannel para escuchar cambios
  useEffect(() => {
    if (!('BroadcastChannel' in window)) {
      console.warn(
        'BroadcastChannel no soportado; no se detectarán cambios en otras pestañas.'
      )
      return
    }

    const channel = new BroadcastChannel(`idb-${storeName}`)

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'change' && event.data.store === storeName) {
        fetchAll()
      }
    }

    channel.addEventListener('message', handleMessage)

    return () => {
      channel.removeEventListener('message', handleMessage)
      channel.close()
    }
  }, [fetchAll, storeName])

  const notifyChange = useCallback(() => {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel(`idb-${storeName}`)
      channel.postMessage({ type: 'change', store: storeName })
      channel.close()
    }
  }, [storeName])

  const add = async (item: Stores[K]) => {
    const db = await getDB()
    await db.put(storeName, item)
    await fetchAll()
    notifyChange()
  }

  const remove = async (id: IDBValidKey) => {
    const db = await getDB()
    await db.delete(storeName, id)
    await fetchAll()
    notifyChange()
  }

  const update = async (item: Stores[K]) => {
    const db = await getDB()
    await db.put(storeName, item)
    await fetchAll()
    notifyChange()
  }

  return { data, loading, add, remove, update, refetch: fetchAll }
}
