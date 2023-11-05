import { useEffect, useState } from "react"

export const useSearchStore = (stationId, searchRadius) => {
  const [stores, setStores] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    setStores(null)
    const url = `${process.env.NEXT_PUBLIC_API_SEARCH_STORE}/?station_id=${stationId}&search_radius=${searchRadius}`
    try {
      const res = await fetch(url)
      setStores(await res.json())
    }
    catch (e) {
      console.log(e)
      setError(e)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (stationId && searchRadius) {
      fetchData()
    }
  }, [stationId, searchRadius])

  return {
    stores: stores,
    isLoading: isLoading,
    error: error
  }
}