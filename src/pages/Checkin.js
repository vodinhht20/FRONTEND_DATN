import * as React from 'react';
import { useEffect, useState } from 'react';
import Workspace from "~/components/Checkin/Workspace";
import ActionCheckin from "~/components/Checkin";
import { initCheckin } from "~/recoil/checkin";
import { useRecoilState, useRecoilValue } from "recoil";
import { initLocation } from '~/recoil/location';
const Checkin = () => {

  const [dataCheckin, setDataCheckin] = useRecoilState(initCheckin);
  const [workSpace, setWorkSpace] = useState();
  const [disableSelect, setDisableSelect] = useState(true);
  const [circleLoading, setCircleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useRecoilValue(initLocation);

  useEffect(() => {
    document.title = "Chấm công";
  }, []);

  const exportPropWorkpaces = () => {
    return [
      setDisableSelect,
      disableSelect,
      dataCheckin,
      setDataCheckin,
      setCircleLoading,
      setWorkSpace,
      setLoading
    ];
  }

  const exportPropAction = () => {
    return [
      dataCheckin,
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
    </div>
  );
}
export default Checkin;
