import React from 'react';

import {
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";


  const MapWithAMarker = withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: (props.lat), lng: (props.lng) }}
    >

    {props.lat !== 0 &&
        <Marker position={{ lat: (props.lat), lng: (props.lng) }}/>}


    {props.locationCo.length !== 0 &&

            props.locationCo.map(locations => (
                locations.coordinates.map((cordnt, index)=>(

                      <Marker
                          key={index}
                          position={{ lat: (cordnt.lat), lng: (cordnt.log) }}
                      />
                    ))
            ))
    }

    </GoogleMap>
  );

  export default MapWithAMarker;


  // const calculateDistance = (lat1, lon1, lat2, lon2 )=>{
  //     var dist = google.maps.geometry.spherical.computeDistanceBetween (new google.maps.latLngA(lat1, lon1), new google.maps.latLngA(lat2, lon2));
  //     // var radlat1 = Math.PI * lat1/180;
  // 		// var radlat2 = Math.PI * lat2/180;
  // 		// var theta = lon1-lon2;
  // 		// var radtheta = Math.PI * theta/180;
  // 		// var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  // 		// if (dist > 1) {
  // 		// 	dist = 1;
  // 		// }
  // 		// dist = Math.acos(dist);
  // 		// dist = dist * 180/Math.PI;
  // 		// dist = dist * 60 * 1.1515;
  //     if(dist <= 100){
  //       return true
  //     }
  // 		return false;
  // }
