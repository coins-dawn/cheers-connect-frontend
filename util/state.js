import useSWR from 'swr'

const initialStation = {
  coord: '35.606463,139.734868',//大井町
  kana: '',
  id: '',
  name: ''
}

export const useStation = () => {
  const { data: station, mutate: setStation } = useSWR(
    'station',
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: initialStation
    }
  )

  return [station, setStation]
}

export const useSearchRadius = () => {
  const { data: searchRadius, mutate: setSearchRadius } = useSWR(
    'searchRadius',
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: 5000
    }
  )

  return [searchRadius, setSearchRadius]
}

export const usePage = () => {
  const { data: page, mutate: setPage } = useSWR(
    'page',
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: 'search'
    }
  )

  return [page, setPage]
}

const initialParam = {
  stationId: '',
  searchRadius: 5000
}

export const useRequestParam = () => {
  const { data: param, mutate: setParam } = useSWR(
    'param',
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: initialParam
    }
  )

  return [param, setParam]
}

const fetcher = async (key, stationId, searchRadius) => {
  const url = `${key}/?station_id=${stationId}&search_radius=${searchRadius}`
  const res = await fetch(url)
  return res.json()
}

export const useSearchStore = ({ stationId, searchRadius }) => {
  const { mutate, data: stores, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_SEARCH_STORE}`, stationId, searchRadius],
    ([key, param1, param2]) => fetcher(key, param1, param2)
  )

  return {
    mutate: mutate,
    stores: stores,
    error,
    isLoading
  }
}