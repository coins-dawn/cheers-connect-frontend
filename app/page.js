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

  return (<>
    <Box
      position="absolute"
      top="8px"
      left="8px"
      zIndex="20"
      backgroundColor="rgba(128, 128, 128, 0.8)"
      padding="16px"
      display="flex"
      flexDirection="column"
    >
      <Text color="white">駅</Text>
      <StationInput />
      <Text color="white">半径</Text>
      <RadiusInput />
      <Button
        width="300px"
        height="24px"
        border="1px solid lightgray"
        marginTop="16px"
        onClick={onSearch}
      >検索</Button>
    </Box>
    <MyMap />
  </>)
}
