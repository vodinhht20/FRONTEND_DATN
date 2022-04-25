import { Pie, Radar } from "@ant-design/plots";

export const DashboardPie = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export const DashboardRadar = ({ data }) => {
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
