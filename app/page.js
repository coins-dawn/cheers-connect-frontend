'use client'

import { RadiusInput, StationInput } from '@/components/input'
import { MyMap } from '@/components/map'
import { usePage, useRequestParam, useSearchRadius, useStation } from '@/util/state'
import { Box, Button, Text } from '@kuma-ui/core'

export default function Home() {
  const [station] = useStation()
  const [searchRadius] = useSearchRadius()
  const [param, setParam] = useRequestParam()
  const [page, setPage] = usePage()
  const onSearch = () => {
    setParam({
      stationId: station.id,
      searchRadius: searchRadius
    })
    setPage('result')
  }

  return (
    <Box>
      <Text>駅</Text>
      <StationInput />
      <Text>半径</Text>
      <RadiusInput />
      <Button
        onClick={onSearch}
      >検索</Button>
      <MyMap />
    </Box>
  )
}
