import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import DLineChart from "../../components/chart/DLineChart";
import { analyzQuantityWarranty } from "../../services/warrantyService";
import React from "react";
import {
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
  return (
    <>
    {isLoggedIn ? (
      <div className="home" style={{flex: 4}}>
        
      <FeaturedInfo />
      
      <DLineChart />
      <div className="button-center">
            <button className="userListEdit">Tháng</button>
            <button className="userListEdit">Quý</button>
            <button className="userListEdit">Năm</button>
      </div>
      {/* <div className="homeWidgets">
        
          <div className="widgetLg-analyz">
            <h3 className="widgetLgTitle">Phân tích theo quý</h3>
            
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <BarChart
            width={500}
            height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="finished" fill="#8884d8" />
              <Bar dataKey="working" fill="#82ca9d" />
              <Bar dataKey="faulty" fill="red" />
            </BarChart>
            </ResponsiveContainer>
          </div>
        
        
      </div>
      <div className="homeWidgets">
      <div className="widgetLg-analyz">
        <h3 className="widgetLgTitle">Phân tích theo năm</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
              <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3 3 " />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="finished" fill="#8884d8" />
            <Bar dataKey="working" fill="#82ca9d" />
            <Bar dataKey="faulty" fill="red" />
          </BarChart>
          
          </ResponsiveContainer>
          
        </div>
        </div> */}
    </div>
    ) : (
      <>
      </>
    )}
    </>
    
  );
}
