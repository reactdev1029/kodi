import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

class MapContainer extends React.Component {
  renderMarkers(map, maps) {
    const coordinates = {
      lat: this.props.coordinates.latitude,
      lng: this.props.coordinates.longitude,
    };
    let marker = new maps.Marker({
      position: coordinates,
      map,
    });
    this.setState({ marker });
  }

  getMapOptions = (maps: Maps) => {
    return {
      streetViewControl: false,
      scaleControl: true,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
      gestureHandling: 'greedy',
      disableDoubleClickZoom: true,
      minZoom: 5,
      maxZoom: 18,

      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.TOP_LEFT,
        mapTypeIds: [
          maps.MapTypeId.ROADMAP,
          maps.MapTypeId.SATELLITE,
          maps.MapTypeId.HYBRID,
        ],
      },

      zoomControl: true,
      clickableIcons: false,
    };
  };

  render() {
    const style = {
      width: '100%',
      height: '250px',
      position: 'relative',
    };

    const coordinates = {
      lat: this.props.coordinates.latitude,
      lng: this.props.coordinates.longitude,
    };

    return (
      <div style={style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDSWBerwAW9_D5c1n9y--9DXTuhurVZEqQ' }}
          center={coordinates}
          defaultZoom={12}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
          options={this.getMapOptions}
        />
      </div>
    );
  }
}

MapContainer.propTypes = {
  coordinates: PropTypes.object,
};

export default MapContainer;
