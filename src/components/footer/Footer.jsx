import React from "react";
import "./footer.css";
import twitterlogo from "./icn_twitter.png";
import fblogo from "./icn_facebook.png";
import ytlogo from "./icn_youtube.png";


export default function Footer({ isLogin }) {
    return (
        <>
            {!isLogin ? (
                <>
                </>
            ) : (
                <footer>
                    <div class="footer-bottom">
                        <div class="footer-container">
                            <div class="row">

                                <div class="col-md-3">
                                    <div class="footer-site-info">2022 © <a href="#" target="_blank">Tập đoàn Big Corp </a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    )
}
