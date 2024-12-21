'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart: React.FC = () => {
  const [data, setData] = useState<{ x: number; y: number }[]>([]); // 用於存儲圖表數據
  const [isCompleted, setIsCompleted] = useState(false); // 標記數據是否已完成接收

  useEffect(() => {
    // 建立 WebSocket 連接
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.data) {
        // 收到完整數據
        setData(
          message.data.map((item: { counter: number; value: number }) => ({
            x: item.counter,
            y: item.value,
          }))
        );
        setIsCompleted(true); // 標記完成
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => ws.close();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      animations: {
        enabled: true, // 啟用動畫
        // easing: 'easeinout', // 動畫效果
        speed: 100, // 動畫持續時間
      },
    },
    stroke: {
      curve: 'smooth', // 使用貝塞爾曲線
      width: 2, // 線條寬度
    },
    xaxis: {
      type: 'category', // 顯示為類別軸
      categories: Array.from({ length: 10 }, (_, i) => i + 1), // 固定 X 軸刻度
      title: {
        text: 'Count', // X 軸標題
      },
    },
    yaxis: {
      tickAmount: 10, // Y 軸分成 10 格
      labels: {
        formatter: (value) =>
          value !== null && value !== undefined ? value.toFixed(0) : '', // 強制顯示整數
      },
      title: {
        text: 'Value', // Y 軸標題
      },
    },
    markers: {
      size: 4, // 標記點大小
    },
    grid: {
      padding: {
        right: 20,
      },
    },
  };

  const series = [
    {
      name: 'Random Value',
      data: data, // 一次性設置數據
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height="350" />
      {isCompleted && <p>Data stream completed!</p>}
    </div>
  );
};

export default LineChart;
