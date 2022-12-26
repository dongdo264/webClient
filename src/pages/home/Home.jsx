import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home({ isLoggedIn }) {
  const user = useSelector((state) => state.auth.login.currentUser);

  
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
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
    ) : (
      <>
      </>
    )}
    </>
    
  );
}
