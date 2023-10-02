'use client'

import { StationInput } from '@/components/input'
import { Box, Text } from '@kuma-ui/core'
import { useState } from 'react'

export default function Home() {
  const [station, setStation] = useState('')

  return (
    <Box>
      <Text>駅</Text>
      <StationInput
        value={station}
        setValue={setStation}
      />
    </Box>
  )
}
