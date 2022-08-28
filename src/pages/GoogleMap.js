import { Card, Tabs } from "antd";
import { useRecoilValue } from "recoil";
import PopupLocation from "~/components/Global/PopupLocation";
import Map from "~/components/More/Map";
import { initLocation } from "~/recoil/location";
import { initLoadLocationPopup } from "~/recoil/loadLocationPopup";

function GoogleMap() {
  const location = useRecoilValue(initLocation);
  const locationpopup = useRecoilValue(initLoadLocationPopup);
  // const key = 'AIzaSyD8LT8gzO2zMB71vwNEyd3ydezj3_VqHFo'
  const key = 'AIzaSyBIWSqJ5-3D-UviE0ZLO4U6AjhVcn58y4g'

  return (

        <>
            <Card className="wr-container profile-page">
                    {
                      location != null ? <Map 
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `90vh`, margin: `auto`, border: 'none' }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      location={location}
                  /> : <PopupLocation locationpopup={locationpopup} />
                    }
            </Card>
        </>

  );
}

export default GoogleMap;
