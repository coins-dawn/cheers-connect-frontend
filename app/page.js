'use client'

import { StationInput } from '@/components/input'
import { MyMap } from '@/components/map'
import { Box, Text } from '@kuma-ui/core'
import { useState } from 'react'

export default function Home() {
  const [station, setStation] = useState({
    'coord': '35.606463,139.734868',
    'kana': '',
    'id': '',
    'name': ''
  })

  return (
    <Box>
      <Text>駅</Text>
      <StationInput
        value={station}
        setValue={setStation}
      />
      <MyMap
        station={station}
      />
    </Box>
  )
}
