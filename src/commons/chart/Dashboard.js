import { Pie } from "@ant-design/plots";

export const DashboardPie = () => {
  const data = [
    {
      type: "Số ngày nghỉ",
      value: 3,
    },
    {
      type: "Số ngày đi làm",
      value: 25,
    }
  ];
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
