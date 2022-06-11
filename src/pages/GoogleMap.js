import { Card, Tabs } from "antd";
import { useRecoilValue } from "recoil";
import Map from "~/components/More/Map";
import { initLocation } from "~/recoil/location";

function GoogleMap() {
  const location = useRecoilValue(initLocation);
  const key = 'AIzaSyD8LT8gzO2zMB71vwNEyd3ydezj3_VqHFo'

  return (

        <>
            <Card className="wr-container profile-page">
                    <Map 
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        location={location}
                    />
            </Card>
        </>

  );
}

export default GoogleMap;
