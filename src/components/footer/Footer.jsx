import React from "react";
import "./footer.css";
import logo from "./logo.PNG";
import twitterlogo from "./icn_twitter.png";
import fblogo from "./icn_facebook.png";
import ytlogo from "./icn_youtube.png";


export default function Footer() {
    return (
        <footer>
            <div className="footer-left">
                <div className="foot-left-container">
                    <ul className="foot-cod foot-hid">
                        <li id="itemNameGroup"><span>Đơn vị chủ quản :</span> <span className="nameGroup">Công ty Cổ phần Thanh toán Hưng Hà</span></li>
                        <li>VP: <a href="https://goo.gl/maps/stYYuH5Ln5U2" rel="nofollow" target="_blank">Tầng 4, B50, Lô 6, KĐT Định Công - Hoàng Mai - Hà Nội</a></li>
                        <li><span>Hotline:</span> 0982.079.209</li>
                        <li>
                            <span>Email hỗ trợ:</span> xedapasama.vn@gmail.com
                        </li>
                    </ul>
                    <ul className="foot-cod foot-show">
                        <li><a rel="nofollow" href="https://www.asama-bike.com/pages/xe-dap-asama">Giới thiệu chung</a></li>
                        <li><a rel="nofollow" href="">Thông tin cần biết</a></li>
                    </ul>
                </div>

            </div>

            <div className="footer-right">
                <img src={logo} alt="" />
            </div>

            <div className="link_mxh">
                <div className="link_mxh_container">
                    <p>Theo dõi chúng tôi trên mạng xã hội:</p>
                    <div className="mxh">
                        <a href="https://twitter.com/timviec365vn" rel="nofollow" target="_blank">
                            <img alt="twitter" src={twitterlogo} />
                        </a>
                    </div>
                    <div className="mxh">
                        <a href="https://www.facebook.com/Timviec365.Vn/" rel="nofollow" target="_blank">
                            <img alt="facebook" src={fblogo} />
                        </a>
                    </div>
                    <div className="mxh">
                        <a href="https://www.youtube.com/channel/UCI6_mZYL8exLuvmtipBFrkg/videos" rel="nofollow" target="_blank">
                            <img alt="youtube" src={ytlogo} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
