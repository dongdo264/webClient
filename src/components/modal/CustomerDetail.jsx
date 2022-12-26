import React, { useState , useEffect} from "react";
import "./modal.css";

export default function CustomerDetail(props) {

    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-customer").style.display = 'block';  
          } else {
            document.getElementById("modal-customer").style.display = 'none';
        }
    });
  

  return (
    <>
        <div className="modal active-modal" id="modal-customer">
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
                        <span className="productName">Mã khách hàng: {props.info.customerCode}</span>
                    </div>
                    <div className="productInfoBottom">
                    <div className="productInfoItem">
                            <span className="productInfoKey">Tên khách hàng: </span>
                            <span className="productInfoValue">{props.info.customerName}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Ngày sinh: </span>
                            <span className="productInfoValue">{props.info.dob}</span>
                        </div>
                        {/* <div className="productInfoItem">
                            <span className="productInfoKey">Màu sắc: </span>
                            <span className="productInfoValue">{props.info.color}</span>
                        </div> */}
                        <div className="productInfoItem">
                            <span className="productInfoKey">Số điện thoại: </span>
                            <span className="productInfoValue">{props.info.phone}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Địa chỉ: </span>
                            <span className="productInfoValue">{props.info.address}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Email: </span>
                            <span className="productInfoValue">{props.info.email}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Số lượng đã mua: </span>
                            <span className="productInfoValue">{props.info.quantityBought}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Ngày khởi tạo: </span>
                            <span className="productInfoValue">{props.info.createAt}</span>
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
