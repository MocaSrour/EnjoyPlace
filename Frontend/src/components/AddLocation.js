import GoogleMapReact from 'google-map-react';
import mark from './pics/marker.svg';
import { useState } from 'react';

const Marker = ({ lat, lng }) => <img src={mark} lat={lat} lng={lng} alt="marker" style={{ width: '32px', height: '32px' }} /> ;

const AddLocation = (prop) => {
  const [lat, setLat ] = useState(31.93988836744629);
  const [lng, setLng ] = useState(35.87612209499119);

  const defaultProps = {
    center: { lat: 31.93988836744629, lng: 35.87612209499119},
    zoom: 15
  };

  const handleMapClick = ({ lat, lng }) => {
    setLat(lat);
    setLng(lng);
    prop.onLocationChange(lat, lng);
  };

  return (
    <div style={{ height: '310px', width: '298px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={handleMapClick}>

        <Marker
          lat={lat}
          lng={lng}
        />

      </GoogleMapReact>
    </div>
  );
}

export default AddLocation;
