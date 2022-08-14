import { Line, Pie } from "@ant-design/plots";
const DashboardPie = ({ data }) => {
  const config = {
    data,
    xField: 'day',
    yField: 'm',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v) => `${v} Phút`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  return <Line {...config} />;
};
export default DashboardPie;