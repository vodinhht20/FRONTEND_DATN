import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"

const Map = ({ location }) => {
    console.log(location);
  return (
    <div>
      <GoogleMap
          defaultZoom={18}
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
        >
            <Marker
              icon={{
                url: 'https://diamondflowerlevanluong.com/wp-content/uploads/2021/04/delivery.png',
                scaledSize: new window.google.maps.Size(60, 60),
              }}
              position={{ lat: location.latitude, lng: location.longitude }}
          />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));