import React from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";


const mapStyles = {
    width: '90%',
    height: '700px',
    margin: '20px 0 0 25%'
};

class MapContainer extends React.Component{
    render() {
        return (
            <div style={{position: 'relative'}}>
                <Map
                    id="map"
                    google={this.props.google}
                    style={mapStyles}
                    zoom={8}
                    initialCenter={{ lat: 50.452865, lng: 30.514296}}
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC83vznz3gUClEydE5rCLTUyGOFQxRNbl8'
})(MapContainer);