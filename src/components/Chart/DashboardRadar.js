import { Radar } from "@ant-design/plots";
const DashboardRadar = ({ data }) => {
    const config = {
      data: data.map((d) => ({ ...d, value: Math.sqrt(d.value) })),
      xField: "type",
      yField: "value",
      appendPadding: [0, 10, 0, 10],
      meta: {
        value: {
          alias: "Số lượng sao",
          min: 0,
          nice: true,
          formatter: (v) => Number(v).toFixed(2),
        },
      },
      xAxis: {
        tickLine: null,
      },
      yAxis: {
        label: false,
        grid: {
          alternateColor: "rgba(0, 0, 0, 0.04)",
        },
      },
      // Bật điểm bổ trợ
      point: {
        size: 2,
      },
      area: {},
    };
    return <Radar {...config} />;
};
export default DashboardRadar;
