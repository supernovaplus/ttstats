import React, { useEffect, useState } from 'react';
import ContentBlock from '../components/ContentBlock';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import { bucketUri } from '../data/config';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function EconomyChartPage() {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    fetch(`${bucketUri}/data/economy.json`)
      .then((res) => res.json())
      .then((res) => {
        const d = res.map((item: any) => ({ time: item[0], debt: item[1] }));
        setState(d);
      });
  }, []);

  return (
    <ContentBlock title="Economy">
      <h4>A demo of synchronized AreaCharts</h4>
      {/* <LineChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </LineChart> */}
      <p>Maybe some other content</p>

      {/* <ResponsiveContainer width={700} height="80%"> */}
      <LineChart width={730} height={250} data={state} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line name="pv of pages" type="monotone" dataKey="debt" stroke="#8884d8" />
        {/* <Line name="uv of pages" type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
      {/* </ResponsiveContainer> */}
    </ContentBlock>
  );
}
