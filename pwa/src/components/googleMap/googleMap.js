//https://www.npmjs.com/package/google-map-react
//https://www.npmjs.com/package/react-geocode

import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'
import mapStyles from './mapStyles'
import ButtonRound from '../buttonRound/buttonRound'
// pin
const AnyReactComponent = ({ text }) => <img src={text} />

Geocode.setApiKey('AIzaSyCl_dsFh-W92B-JNqfjKfo0ZHUSJ7roDNo')

class SimpleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cords: {
        lat: 36.16,
        lng: -115.13,
      },
    }
    this.mapWraper = React.createRef()
    this.setWidth = this.setWidth.bind(this)
    this.getLatLng = this.getLatLng.bind(this)
  }
  static defaultProps = {
    center: {
      lat: 36.16,
      lng: -115.13,
    },
    zoom: 12,

    createMapOptions: function (maps) {
      return {
        panControl: false,
        mapTypeControl: false,
        scrollwheel: false,
        styles: this.customStyles.mapStyles,
      }
    },
  }
  getLatLng(address) {
    Geocode.fromAddress(address.replace('<p>', '').replace('</p>', '')).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        return this.setState({ cords: { lat, lng } })
      },
      error => {
        console.error(error)
      }
    )
  }
  setWidth() {
    this.setState({ wraperWidth: this.mapWraper.current.offsetWidth })
  }
  componentDidMount() {
    this.getLatLng(this.props.address)
    this.setWidth()
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div ref={this.mapWraper}>
        <div
          style={{
            height: `${this.state.wraperWidth}px`,
            width: '100%',
            padding: '10px 0',
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCl_dsFh-W92B-JNqfjKfo0ZHUSJ7roDNo',
            }}
            defaultCenter={this.state.cords}
            defaultZoom={this.props.zoom}
            options={this.props.createMapOptions}
            customStyles={mapStyles}
            customCords={this.state.cords}
          >
            <AnyReactComponent
              lat={this.state.cords.lat}
              lng={this.state.cords.lng}
              text={
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNC4xOTggMC04IDMuNDAzLTggNy42MDIgMCA2LjI0MyA2LjM3NyA2LjkwMyA4IDE2LjM5OCAxLjYyMy05LjQ5NSA4LTEwLjE1NSA4LTE2LjM5OCAwLTQuMTk5LTMuODAxLTcuNjAyLTgtNy42MDJ6bTAgMTFjLTEuNjU3IDAtMy0xLjM0My0zLTNzMS4zNDItMyAzLTMgMyAxLjM0MyAzIDMtMS4zNDMgMy0zIDN6Ii8+PC9zdmc+'
              }
            />
          </GoogleMapReact>
        </div>
        <div
          style={{
            marginTop: '15px',
          }}
        >
          <ButtonRound
            innerText="Get Directions"
            pos="start"
            action={`https://www.google.com/maps/dir//${this.props.address
              .replace('<p>', '')
              .replace('</p>', '')
              .split(' ')
              .join('+')}/data=`}
            type="link"
          />
        </div>
      </div>
    )
  }
}

export default SimpleMap
