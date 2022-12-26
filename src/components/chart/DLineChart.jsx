
import React, { useState, useEffect, useRef } from "react";
import "./chart.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { analyzQuantityWarranty } from "../../services/warrantyService";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
// ];

export default function DLineChart() {
  const [data, setData] = useState([]);
  const [type, setType] = useState('month');
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await analyzQuantityWarranty(type, token);
    console.log(res.data.data)
    setData(res.data.data);
    setLoading(false);
  }
  // if(!isLoggedIn) {
  //   window.location.href = '/';
  // }

  useEffect( () => {
    if (!loading && data.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, data]);



  return (
    <div className="chart">
      <h3 className="chartTitle">Phân thích số lượng sản phẩm bảo hành</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart

        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="finished"
          stroke="#8884d8"
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey="working"
          stroke="blue"
          strokeDasharray="3 4 5 2"
        />
        <Line
          type="monotone"
          dataKey="faulty"
          stroke="red"
          strokeDasharray="3 4 5 2"
        />
      </LineChart>
      </ResponsiveContainer>
    </div>
    
  );
}
