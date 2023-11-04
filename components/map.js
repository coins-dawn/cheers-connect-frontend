import { GoogleMap, MarkerClustererF, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useRequestParam, useStation } from '@/util/state'
import { useSearchStore } from '@/util/hooks'
import { Loading } from './loading'
import { Error } from './error'
import { memo } from 'react'

// ↓memo化をやめたので無用
// 無名関数はESLintのルールに引っ掛かるため例外的に無効にする
// eslint-disable-next-line react/display-name
export const MyMap = (props) => {
  const [param] = useRequestParam()
  const [station] = useStation()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    language: 'ja'
  })

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '10'
  }

  const center = {
    lat: Number(station.coord.split(',')[0]),
    lng: Number(station.coord.split(',')[1])
  }

  return isLoaded
    ? (
      <GoogleMap
        center={center}
        zoom={16}
        mapContainerStyle={containerStyle}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_MAP_ID
        }}
      >
        <SearchResult
          stationId={param.stationId}
          searchRadius={param.searchRadius}
        />
      </GoogleMap>
    )
    : <></>

}

// eslint-disable-next-line react/display-name
const SearchResult = memo(({ stationId, searchRadius })=> {
  const { stores, isLoading, error } = useSearchStore(stationId, searchRadius)

  if (isLoading) return <Loading />
  if (error) return <Error />
  return (<>
    <MarkerClustererF
      options={{
        gridSize: 20,
        // maxZoom: 16
      }}
    >
      {(clusterer) => {
        return (<>
          <MarkerF
            position={{ lat: 35.9318192, lng: 139.6321721 }}
            label="土呂"
          />
          {stores && stores.recommend_store_list.map((store, index) => {
            return (
              <MarkerF
                key={index}
                position={{
                  lat: Number(store.coord.split(',')[0]),
                  lng: Number(store.coord.split(',')[1])
                }}
                label={store.store_name}
                clusterer={clusterer}
              />
            )
          })}
        </>)
      }}
    </MarkerClustererF>
  </>)
})