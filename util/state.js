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
  stationId: null,
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