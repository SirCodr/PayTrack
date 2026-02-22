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

  const add = async (item: Stores[K]) => {
    const db = await getDB()
    await db.put(storeName, item)
    await fetchAll()
  }

  const remove = async (id: IDBValidKey) => {
    const db = await getDB()
    await db.delete(storeName, id)
    await fetchAll()
  }

  const update = async (item: Stores[K]) => {
    const db = await getDB()
    await db.put(storeName, item)
    await fetchAll()
  }

  return { data, loading, add, remove, update, refetch: fetchAll }
}
