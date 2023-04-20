import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

export default function ChartPage() {
  const backgroundColor = 'transparent';
  const lineColor = '#2962FF';
  const textColor = 'black';
  const areaTopColor = '#2962FF';
  const areaBottomColor = 'rgba(41,98, 255, 0.28)';
  const ref: any = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: ref.current.clientWidth });
    };

    const chart = createChart(ref.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: ref.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });

    newSeries.setData(initialData);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return <PageWrapper title="chart">{<div ref={ref}></div>}</PageWrapper>;
}
