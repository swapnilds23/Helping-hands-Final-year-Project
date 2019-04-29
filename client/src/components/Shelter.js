import React from 'react';
import MapWithAMarker from './MapMarker';
import { Spin, Icon, Layout, Menu } from 'antd';
import { graphql } from 'react-apollo';
import { GET_ALL_SHELTER } from '.././queries';
import './App.css';


//import GOOGLE_MAPS_API_KEY from '../../Config_Keys';

//const location = window.navigator && window.navigator.geolocation;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const { Sider, Content } = Layout;

//const GOOGLE_MAPS_API_KEY = 'AIzaSyAIt1lqRzMW09DBNbAIZbvkCvq1SHFkiEM';

class Shelter extends React.Component {

    state = {
      homeLat: null,
      homeLng: null,
      collapsed: false
    }

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
        });
    }

    handleDestination= (e) => {
      this.props.setDestination(e.item.props.lat, e.item.props.lng);
    }

    componentWillMount() {
      const location = window.navigator && window.navigator.geolocation;
      if (location ) {
        location.getCurrentPosition((position) => {
          this.setState({
            homeLat: position.coords.latitude,
            homeLng: position.coords.longitude
          })
        }, (error) => {
          this.setState({
            homeLat: 'err-latitude',
            homeLng: 'err-longitude'
          })
        })
      }
    }

    displaySider(){
      if(this.props.data.loading){
        return <Spin tip="Loading..." indicator={antIcon} />
      }

      return (
        <Menu theme="dark"  mode="inline" >
           {
                this.props.data.getAllShelter.map(shelter => {
                    return (
                      shelter.coordinates.map(coordnt => {
                        return(
                          <Menu.Item key={shelter.id} lat ={coordnt.lat} lng= {coordnt.log} onClick={this.handleDestination}>
                           <Icon type="environment" />
                           <span>{shelter.name}</span>
                         </Menu.Item>
                        )
                      })
                    )
                })
            }
         </Menu>
      )

    }

    render() {
      const  { homeLat,homeLng } = this.state;

       return(

         <Layout>
             <Sider
               trigger={null}
               collapsible
               collapsed={this.state.collapsed}
             >
              {this.displaySider()}
            </Sider>
        <Layout>

                <Content style={{
                  margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                }}
                >

                  { homeLat && homeLng && (!this.props.data.loading) ? (
                    <MapWithAMarker
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ width: '70vw',height: '90vh' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        lat={homeLat}
                        lng={homeLng}
                        locationCo={this.props.data.getAllShelter}
                      />
                    ):

                    <Spin tip="Loading..." indicator={antIcon} /> }
                    </Content>
            </Layout>
    </Layout>

      );
    }
  }

  export default graphql(GET_ALL_SHELTER)(Shelter);



//{this.props.service()}
