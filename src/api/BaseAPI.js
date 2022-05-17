import instance, { instanceV2 } from "./instance";

export const getData = (data) => {
    const url = data;
    return instance.get(url);
};

// tạm thời tạo getDataV2 để test
export const getDataV2 = (data) => {
    const url = data;
    return instanceV2.get(url)

    // data test
    // type: 0, // trạng thái checkin 0 chưa checkin, 1 đã checkin
    // fullname: "Võ Văn Định",
    // checkin: null, // thời gian checkin vd: 08:30 default null
    // checkout: null, // thời gian checkout vd: 08:30 default null
    // working_time: null, // tổng thời gian làm
    // date: "30/04/2022",
    // work_space: '4', // id cơ sở làm việc
    // location: '57 Huynh Thuc Khang str, Dong Da Dist, Ha Noi'
}