import * as React from 'react';
import { useEffect, useState } from 'react';
import Workspace from "~/components/Checkin/Workspace";
import ActionCheckin from "~/components/Checkin";
import { initCheckin } from "~/recoil/checkin";
import { useRecoilState, useRecoilValue } from "recoil";
import { initLocation } from '~/recoil/location';

import PopupLocation from "~/components/Global/PopupLocation";
import { initLoadLocationPopup } from "~/recoil/loadLocationPopup";
import { initProfile } from '~/recoil/profile';

const Checkin = () => {

  const [dataCheckin, setDataCheckin] = useRecoilState(initCheckin);
  const [workSpace, setWorkSpace] = useState();
  const [disableSelect, setDisableSelect] = useState(true);
  const [circleLoading, setCircleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useRecoilValue(initLocation);
  const locationpopup = useRecoilValue(initLoadLocationPopup);
  const profileData = useRecoilValue(initProfile);

  useEffect(() => {
    document.title = "Chấm công";
  }, []);
  const exportPropWorkpaces = () => {
    return [
      setDisableSelect,
      disableSelect,
      dataCheckin,
      profileData,
      setDataCheckin,
      setCircleLoading,
      setWorkSpace,
      setLoading
    ];
  }
  const exportPropAction = () => {
    return [
      dataCheckin,
      profileData,
      setDataCheckin,
      setCircleLoading,
      loading,
      circleLoading,
      location
    ];
  }

  return (
    <div className="wr-container time-keep" id="time-keep-location">
      <Workspace handleProps={exportPropWorkpaces()}/>
      <ActionCheckin handleProps={exportPropAction()}/>
      <PopupLocation locationpopup={locationpopup} />
    </div>
  );
}
export default Checkin;
