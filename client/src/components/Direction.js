/* eslint-disable no-undef */
import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'
import { Row, Col } from 'antd';
import QRCode from 'qrcode-react';
import Payments from './Payments'

class Direction extends React.Component {

  constructor(props){
    super(props)

    this.state ={

    }
  }

  render() {
    if(this.props.service() === "Money"){
      return <Payments />
    }else{

    const new_homeLat = this.props.orgLat();
    const new_homeLng = this.props.orgLng();
    const new_destLat = this.props.destLat();
    const new_destLng = this.props.destLng();

      const DirectionsComponent = compose(
        withProps({
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ width: `100%` }} />,
          mapElement: <div style={{height: `600px`, width: `800px` }}  />,
        }),

        withGoogleMap,

        lifecycle({

          componentDidMount() {
            // console.log(new_origin);
              const DirectionsService = new google.maps.DirectionsService();

                DirectionsService.route({
                  origin: new google.maps.LatLng(new_homeLat, new_homeLng),
                  destination: new google.maps.LatLng(new_destLat, new_destLng),
                  travelMode: google.maps.TravelMode.WALKING,
                },
                   (result, status) => {
                      if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                          directions: {...result},
                          markers: true
                        })
                      } else {
                        console.error(`error fetching directions ${result}`);
                      }
                 });
            }
        })

      )(props =>
        <GoogleMap defaultZoom={3}>
          {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
        </GoogleMap>
      );

      return (
            <div>
            <Row>

              <Col span={16}>
                <DirectionsComponent/>
              </Col>

              <Col span={8} style={{ marginTop: 170 }}>
                  <QRCode value="http://facebook.github.io/react/" />
              </Col>

            </Row>

            </div>
          )
    }
  }
}
export default Direction
