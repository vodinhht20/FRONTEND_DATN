import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import { iconLocation } from "~/components/images";
const Map = ({ location }) => {
  return (
    <div>
      <GoogleMap
          defaultZoom={18}
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
        >
            <Marker
              icon={{
                url: iconLocation,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              position={{ lat: location.latitude, lng: location.longitude }}
          />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));