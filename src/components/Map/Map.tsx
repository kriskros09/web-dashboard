/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, CSSProperties, useState } from 'react'
import GoogleMapReact from 'google-map-react'
// import styled from 'styled-components'

// Store
import { getState } from 'react-model'

import { useStore } from '../../store/models'
import MarkerImg from '../../assets/img/map-marker.png'
import InfoCardImg from '../../assets/img/proinfocard-img.png'
import { Rating } from '../shared/proprofile/meta/Rating'
import { ClearIcon } from '../shared/Icons'
import { Button } from '../shared/Button'

// This is the library for google map https://openbase.io/js/google-map-react
const Markerstyle: CSSProperties = {
  width: 18,
  height: 22,
  backgroundImage: 'url(' + MarkerImg + ')',
  backgroundRepeat: 'no-repeat',
}

const InfoCardstyle: CSSProperties = {
  position: 'absolute',
  width: '170px',
  left: '50%',
  top: '50%',
  borderRadius: '1rem',
  transform: 'translate(-50%, -115%)',
  zIndex: 99,
  backgroundColor: 'white',
  textAlign: 'left',
  color: '#3f51b5',
  fontSize: 11,
  fontWeight: 'bold',
  cursor: 'pointer',
  overflow: 'hidden',
}

const imgContainer: CSSProperties = {
  overflow: 'hidden',
  margin: '0 auto',
  position: 'relative',
}
const overlay: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  background: '#000000',
  opacity: 0.3,
}
const proImg: CSSProperties = {
  maxWidth: '100%',
}
const infoContainer: CSSProperties = {
  padding: 15,
}

const Marker = ({
  lat,
  lng,
  price,
  picture,
  review,
  firstname,
  city,
  active,
  proId,
  onClose,
  seeProfile,
}) => {
  return (
    <div className="relative">
      <div className={proId === active ? '' : 'hidden'} id="info-pin" style={InfoCardstyle}>
        <button className="absolute right-0 z-10" onClick={onClose}>
          <ClearIcon fillColour="white" size={20} />
        </button>

        <div style={imgContainer}>
          <div style={overlay} />
          <img src={picture ? picture : InfoCardImg} style={proImg} />
        </div>
        <div style={infoContainer}>
          <p className="text-primary text font-bold">{firstname}</p>
          <p className="text-xxs text-primary-dark">{city}</p>
          <span className="text-sm text-gray-300 text-right">{price}$</span>
          <Rating rating={review} />
          <Button
            className="hidden md:block btn-xs border border-gray-400 text-gray-400 p-1 mt-2"
            label="voir"
            onClick={seeProfile}
          />
        </div>
      </div>
      <div style={Markerstyle} />
    </div>
  )
}

const MapContainer: React.FC<any> = ({ modalOpen }): ReactElement<'div'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchState, searchActions] = useStore('Search')
  const [proId, setProId] = useState()

  const language = getState('Locale').language

  const seeProProfile = (value) => {
    searchActions.currentPro({
      langId: language,
      profTileInput: {
        proId: value,
        country: searchState.currentCountry,
        region: searchState.currentRegion,
        lawId: searchState.currentLawId,
        sectId: searchState.currentSectId,
        servId: searchState.currentServId,
      },
    })
  }

  const handleModalOpen = (id, e) => {
    if (id !== searchState?.currentPro) {
      seeProProfile(id)
    }

    setTimeout(() => {
      if (modalOpen) {
        modalOpen(e)
      }
    }, 250)
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDDt1_r4P5x_jJWricqedAz7Ntw5-RZvMY' }}
        center={{
          lat: searchState.coordinates.lat,
          lng: searchState.coordinates.lng,
        }}
        defaultZoom={6}
        onChildMouseDown={(e) => setProId(e)}
      >
        {searchState?.search?.map((coords) => (
          <Marker
            key={coords.proId}
            active={proId}
            city={coords.city}
            firstname={coords.firstName}
            lat={coords.latitude}
            lng={coords.longitude}
            picture={coords.photo}
            price={coords.price}
            proId={coords.proId}
            review={coords.reviews}
            seeProfile={(e) => handleModalOpen(proId, e)}
            onClose={() => setProId(undefined)}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default MapContainer
