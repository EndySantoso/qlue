// Import package
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import Loading from 'react-loading'

// Import file
import * as ActionTypes from './actions/constants'
import logo from './logo.svg'
import './App.css'

// LOGO ICON UNTUK MARKER
var myIcon = L.icon({ iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png', iconSize: [25, 25], iconAnchor: [25, 25], popupAnchor: [-3, -26] })

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      qlueMarker: false,
      textButton: false
    }
  }

  componentDidMount () {
    // Fetch data dari API qlue, lalu simpan ke dalam state redux
    axios.get('http://localhost:8080/api/qlue')
    .then(response => {
      this.props.getDataLocationQlue(response.data)
    })
    .catch(error => {
      console.log(error)
    })

    // Fetch data dari API waze, lalu simpan ke dalam state redux
    axios.get('http://localhost:8080/api/waze')
    .then(response => {
      this.props.getDataLocationWaze(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  _switchMarker () {
    this.setState({qlueMarker: !this.state.qlueMarker, textButton: !this.state.textButton})
  }

  render () {
    let content
    let marker

    if (this.state.qlueMarker === true) {
      marker = (
        <div>
          {/* marker qlue */}
          {this.props.locationQlue.map((location, index) => {
            return (
              <Marker key={index} position={[location.lat, location.lng]} icon={myIcon} >
                <Popup>
                  <span>
                    Nomor: {location.placemark_id}. <br />
                    Lokasi: {location.name}. <br />
                    Alamat: {location.address} <br />
                    Latitude: {location.lat} <br />
                    Longitude: {location.lng} <br />
                  </span>
                </Popup>
              </Marker>
            )
          })}
        </div>
      )
    } else {
      marker = (
        <div>
          {/* marker waze */}
          {this.props.locationWaze.map((location, index) => {
            return (
              <Marker key={index} position={[location.location.y, location.location.x]} >
                <Popup>
                  <span>
                    Kota: {location.city} <br />
                    Jalan: {location.street} <br />
                    Latitude: {location.location.y} <br />
                    Longitude: {location.location.x} <br />
                  </span>
                </Popup>
              </Marker>
            )
          })}
        </div>
      )
    }

    if (this.props.locationQlue.length === 0 && this.props.locationWaze.length === 0) {
      content = (
        // loading screen, sambil menunggu proses fetch data
        <Loading type='bars' color='cyan' />
      )
    } else {
      content = (
        // tampilkan peta setelah proses fetch selesai
        // Component peta leaflet
        <Map
          className='animated lightSpeedIn'
          style={{height: '100vh'}}
          center={[-6.21462, 106.84513]}
          zoom={11}>
          <TileLayer url='https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGlzYW5nZ29yZW5nIiwiYSI6ImNqMjh5OW45ZzAyc2wzMnFpd2RhNTllbXQifQ.s_ZDuvHljSJCVcsFqz708w' attribution='<attribution>' />
          {marker}
        </Map>
      )
    }

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo animated zoomOutUp' alt='logo' />
          <h2 className='animated bounce'>Welcome</h2>
        </div>
        {this.state.textButton === false ? (
          <button onClick={() => { this._switchMarker() }}> Ganti ke Qlue marker </button>
        ) : (
          <button onClick={() => { this._switchMarker() }}> Ganti ke Waze marker </button>
        )}

        {content}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locationQlue: state.locationQlue,
    locationWaze: state.locationWaze
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataLocationQlue: (results) => dispatch({
      type: ActionTypes.GET_DATA_LOCATION_QLUE,
      payload: results
    }),
    getDataLocationWaze: (results) => dispatch({
      type: ActionTypes.GET_DATA_LOCATION_WAZE,
      payload: results
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
