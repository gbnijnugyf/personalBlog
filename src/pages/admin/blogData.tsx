import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Service } from "../../globe/service";
import { IData } from "../../globe/inter";

function RealTimeChart(props: IData) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // 创建图表实例
    chartInstance.current = echarts.init(chartRef.current as HTMLDivElement);

    // 配置图表选项
    //TODO:若设为echarts.EChartOption类型，series全红但是能运行。。无语子
    const options: any = {
      title: { text: "博客每日评论数及浏览数" },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["评论数", "浏览数"],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["bar", "line"] },
          restore: { show: true },
          saveAsImage: {
            show: true,
            type: "jpg",
          },
        },
      },
      xAxis: {
        type: "category",
        data: props.xdata,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "评论数",
          type: "line",
          data: props.ydata.commentNum,
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
        {
          name: "浏览数",
          type: "line",
          data: props.ydata.viewNum,
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
      ],
    };

    // 设置图表选项
    chartInstance.current.setOption(options);

    // 在组件卸载时销毁图表实例
    return () => {
      chartInstance.current?.dispose();
    };
  }, [props]);

  return <div ref={chartRef} style={{ height: "83vh", width: "100%" }} />;
}

export function BlogData() {
  const datainit: IData = {
    xdata: [],
    ydata: {
      commentNum: [],
      viewNum: [],
    },
  };
  const [data, setData] = useState<IData>(datainit);

  useEffect(() => {
    // 从后端获取数据
    Service.getStatData()
      .then((res) => {
        // if (res.status === 1) {
        console.log(res);
        setData(res.data.data);
        // }
      })
      .catch((res) => {
        console.error("Failed to fetch data:", res);
      });
  }, []);

  return (
    <div>
      <RealTimeChart
        xdata={data.xdata}
        ydata={{
          commentNum: data.ydata.commentNum,
          viewNum: data.ydata.viewNum,
        }}
      />
    </div>
  );
}
