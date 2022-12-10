import React, { useState , useEffect} from "react";
import "./modal.css";
import { getInfoProduct } from "../../services/userService";

export default function Modal(props) {

    useEffect( () => {
        if(props.open) {
            document.getElementById("modal").style.display = 'block';  
          } else {
            document.getElementById("modal").style.display = 'none';
        }
    });
  

  return (
    <>
        <div className="modal active-modal" id="modal">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="productTop">
                <div className="productTopLeft">
                    <div className="pImg">
                        <img src={props.info.img} alt="" className="productImg" />
                    </div>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{props.info.name}</span>
                    </div>
                    <div className="productInfoBottom">
                    <div className="productInfoItem">
                            <span className="productInfoKey">Dòng sản phẩm: </span>
                            <span className="productInfoValue">{props.info.productLine}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Kích cỡ: </span>
                            <span className="productInfoValue">{props.info.size}</span>
                        </div>
                        {/* <div className="productInfoItem">
                            <span className="productInfoKey">Màu sắc: </span>
                            <span className="productInfoValue">{props.info.color}</span>
                        </div> */}
                        <div className="productInfoItem">
                            <span className="productInfoKey">Chất liệu khung: </span>
                            <span className="productInfoValue">{props.info.frame}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Chất liệu khung: </span>
                            <span className="productInfoValue">{props.info.shock}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Vành xe: </span>
                            <span className="productInfoValue">{props.info.rims}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Lốp xe: </span>
                            <span className="productInfoValue">{props.info.tires}</span>
                        </div>
                        {/* <div className="productInfoItem">
                            <span className="productInfoKey">Vành xe: </span>
                            <span className="productInfoValue">{props.info.pedals}</span>
                        </div> */}
                        <div className="productInfoItem">
                            <span className="productInfoKey">Yên: </span>
                            <span className="productInfoValue">{props.info.saddle}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Bàn đạp: </span>
                            <span className="productInfoValue">{props.info.pedals}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Bộ thắng: </span>
                            <span className="productInfoValue">{props.info.brakes}</span>
                        </div>

                    </div>
                </div>
            
        </div>
            <button className="close-modal" onClick={props.toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
    </>
  );
}
