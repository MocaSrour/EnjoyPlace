import React from "react";
import GoogleMapReact from "google-map-react";
import mark from "../pics/marker.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";

const Marker = () => (
  <img src={mark} alt="marker" style={{ width: "32px", height: "32px" }} />
);

const PlaceMap = ({ getAddtoParent }) => {
  const { placeId } = useParams();
  const [location, setLocation] = useState([]);

  const fetchPlace = useCallback(async () => {
    axios
      .get(`http://localhost:3117/location/${placeId}`, {
        withCredentials: true,
      })
      .then((data) => setLocation(data.data));
  }, [placeId]);

  useEffect(() => {
    fetchPlace().catch(() =>
      toast.error("Failed getting place location from database", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    );
  }, [fetchPlace]);

  const getAddress = useCallback(async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD-UkANPMS6GdVFjJwDi6P1D0gTLrxnFVg`
      );
      const { results } = response.data;
      if (results.length > 0) {
        const address = results[0].formatted_address;
        return address;
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  let loc;
  const defaultProps = {
    center: [31.93988836744629, 35.87612209499119],
    zoom: 12,
  };
  if (location.location) {
    loc = location.location[0];
  }
  if (location.location) {
    const { lat, lng } = location.location[0];
    getAddress(lat, lng).then((data) => {
      getAddtoParent(data);
    })
  }

  return (
    <div
      style={{
        boxShadow: "0px 2px 20px #444",
        height: "346px",
        width: "298px",
        alignSelf: "center",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={loc && loc.lat} lng={loc && loc.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default PlaceMap;
