import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";

export default function Home({isLoggedIn}) {

  useEffect(() => {
    console.log(isLoggedIn);
    if(!isLoggedIn) {
      window.location.href = '/';
    }
    
}, []);
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
