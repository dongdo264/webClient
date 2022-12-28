import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { analyzQuantityProduced } from "../../services/factoryService";
import React from "react";
import {
    LineChart,
    Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
export default function FactoryHome({ isLoggedIn }) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [data, setData] = useState([]);
  const [type, setType] = useState('month');
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await analyzQuantityProduced(type, token);
    console.log(res.data.data)
    setData(res.data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [type]);
  useEffect( () => {
    if (!loading && data.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, data]);

  const handleChangeTypeAnalyz = (type_) => {
    setType(type_);
  }

  useEffect(() => {
    if(!isLoggedIn) {
      window.location.href = '/';
    }
  });
  return (
    <>
    {isLoggedIn ? (
      <div className="home" style={{flex: 4}}>
        
      <FeaturedInfo />
      
      <div className="chart">
      <h3 className="chartTitle">Phân tích số lượng sản phẩm sản xuất</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
        width="100%"
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
        <XAxis dataKey={type}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sum"
          stroke="green"
          strokeDasharray="5 5"
          name="Số lượng sản xuất"
        />
      </LineChart>
      </ResponsiveContainer>
     </div>
      <div className="button-center">
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyz("month")} >Tháng</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyz("quarter")} >Quý</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyz("year")}>Năm</button>
      </div>
    </div>
    ) : (
      <>
      </>
    )}
    </>
    
  );
}
