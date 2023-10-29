import { memo, useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

// 無名関数はESLintのルールに引っ掛かるため例外的に無効にする
// eslint-disable-next-line react/display-name
export const MyMap = memo(({ station }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  })

  const containerStyle = {
    width: '400px',
    height: '400px'
  }

  const center = {
    lat: Number(station.coord.split(',')[0]),
    lng: Number(station.coord.split(',')[1])
  }

  const [map, setMap] = useState(null)

  const onLoad = useCallback((map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback((map) => {
    setMap(null)
  }, [])

  return isLoaded
    ? (
      <GoogleMap
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={containerStyle}
      >
        <></>
      </GoogleMap>
    )
    : <></>

})
