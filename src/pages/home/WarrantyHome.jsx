import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import DLineChart from "../../components/chart/DLineChart";
import { analyzQuantityWarranty } from "../../services/warrantyService";
import React from "react";
import {
  Line,
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
export default function WarrantyHome({ isLoggedIn }) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [data, setData] = useState([]);
  const [type, setType] = useState('quarter');
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


  useEffect(() => {
    if(!isLoggedIn) {
      window.location.href = '/';
    }
    // console.log(" từ trang home", isLoggedIn);
    // console.log(user);
    // console.log(sessionStorage.getItem('accessToken'));
  });

  const handleChangeTypeAnalyz = (type_) => {
    setType(type_);
  }

  return (
    <>
    {isLoggedIn ? (
      <div className="home" style={{flex: 4}}>
        
      
      <div className="chart">
      <h3 className="chartTitle">Phân tích số lượng sản phẩm bảo hành</h3>
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
        <XAxis dataKey={type}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="finished"
          stroke="green"
          strokeDasharray="5 5"
          name="Hoàn thành"
        />
        <Line
          type="monotone"
          dataKey="working"
          stroke="blue"
          strokeDasharray="3 4 5 2"
          name="Đang bảo hành"
        />
        <Line
          type="monotone"
          dataKey="faulty"
          stroke="red"
          strokeDasharray="3 4 5 2"
          name="Sản phẩm lỗi"
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
