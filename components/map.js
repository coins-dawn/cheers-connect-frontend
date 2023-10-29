import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useRequestParam, useSearchStore, useStation } from '@/util/state'

// ↓memo化をやめたので無用
// 無名関数はESLintのルールに引っ掛かるため例外的に無効にする
// eslint-disable-next-line react/display-name
export const MyMap = (props) => {
  const [station] = useStation()
  const [param] = useRequestParam()
  const { stores } = useSearchStore(param)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    language: 'ja'
  })

  const containerStyle = {
    width: '400px',
    height: '400px'
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
            />
          )
        }
        )}
      </GoogleMap>
    )
    : <></>

}

