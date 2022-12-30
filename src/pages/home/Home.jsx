import "./home.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { analyz } from "../../services/agentService";
import { analyzQuantityWarranty } from "../../services/warrantyService";
import { analyzQuantityProduced } from "../../services/factoryService";
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
export default function Home({ isLoggedIn }) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [data, setData] = useState([]);
  const [dataWarranty, setDataWarranty] = useState([]);
  const [dataFactory, setDataFactory]= useState([]);
  const [type, setType] = useState('month');
  const [typeFactory, setTypeFactory] = useState("month");
  const [typeWarranty, setTypeWarranty] = useState("month");
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await analyz(type, token);
    console.log(res.data.data)
    setData(res.data.data);
    setLoading(false);
  }

  async function fetchDataWarranty () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await analyzQuantityWarranty(typeWarranty, token);
    console.log(res.data.data)
    setDataWarranty(res.data.data);
    setLoading(false);
  }

  async function fetchDataFactory () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await analyzQuantityProduced(typeFactory, token);
    console.log(res.data.data)
    setDataFactory(res.data.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchDataFactory();
  }, [typeFactory]);
  useEffect(() => {
    fetchDataWarranty();
  }, [typeWarranty]);

  useEffect(() => {
    fetchData();
  }, [type]);
  useEffect( () => {
    if (!loading && data.length === 0) {
      fetchData();
      fetchDataFactory();
      fetchDataWarranty();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, data, dataFactory, dataWarranty]);

  const handleChangeTypeAnalyz = (type_) => {
    setType(type_);
  }
  const handleChangeTypeAnalyzW = (type_) => {
    setTypeWarranty(type_);
  }
  const handleChangeTypeAnalyzF = (type_) => {
    setTypeFactory(type_);
  }
  
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
      <div className="home">
        <div className="chart">
      <h3 className="chartTitle">Phân tích số lượng sản phẩm bán ra</h3>
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
          dataKey="imported"
          stroke="blue"
          strokeDasharray="5 5"
          name="Số lượng nhập về"
        />
        <Line
          type="monotone"
          dataKey="sold"
          stroke="green"
          strokeDasharray="5 5"
          name="Số lượng bán ra"
        />
      </LineChart>
      </ResponsiveContainer>
     </div>
      <div className="button-center">
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyz("month")} >Tháng</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyz("quarter")} >Quý</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyz("year")}>Năm</button>
      </div>
      <div className="chart">
      <h3 className="chartTitle">Phân tích số lượng sản phẩm bảo hành</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart

        height={300}
        data={dataWarranty}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={typeWarranty}/>
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
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyzW("month")} >Tháng</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyzW("quarter")} >Quý</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyzW("year")}>Năm</button>
      </div>
      <div className="chart">
      <h3 className="chartTitle">Phân tích số lượng sản phẩm sản xuất</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
        width="100%"
        height={300}
        data={dataFactory}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={typeFactory}/>
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
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyzF("month")} >Tháng</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyzF("quarter")} >Quý</button>
            <button className="userListEdit" onClick={() => handleChangeTypeAnalyzF("year")}>Năm</button>
      </div>
      
    </div>
    ) : (
      <>
      </>
    )}
    </>
    
  );
}
