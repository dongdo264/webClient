import React, { useState , useEffect, useSelector} from "react";
import "./modal.css";
import { sellProducts } from "../../services/agentService";

export default function ChooseCustomer(props) {
    const [customerCode, setCustomerCode] = useState([]);
    const [err, setErr] = useState("");

    const handleOnChange = event => {
        setCustomerCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('accessToken');
        try {
            // console.log(props.data);
            // console.log(customerCode);
            let submit = await sellProducts(customerCode, props.data, token);
            console.log(submit);
            if (submit.data.errCode === 5) {
                setErr("Không tồn tại mã khách hàng này!");
            } else if (submit.data.errCode === 0) {
                alert("Chuyển sản phẩm cho khách thành công!");
            }
        }catch(err) {

        }
    }

    useEffect( () => {
        
        if(props.open) {
            document.getElementById("modal-choosecustomer").style.display = 'block';  
            setErr("");
            setCustomerCode("")
          } else {
            document.getElementById("modal-choosecustomer").style.display = 'none';
        }
    }, [props]);
    

  return (
    <>
        <div className="modal active-modal" id="modal-choosecustomer">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h1 className="newUserTitle" >Chọn mã khách hàng</h1>
            <div className="productTop" style={{pt: 0}}>
                <form className="newUserForm" style={{pt: 0}}>
                    <div className="newUserItem">
                    <label>Mã khách hàng: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{err}</span></label>
                    <input type="text"
                    placeholder="Mã khách hàng" 
                    key="customerCode"
                    name="customerCode"
                    value={customerCode}
                    onChange={handleOnChange}
                    />
                    </div>                   
                    <button className="newUserButton" onClick={handleSubmit}>Thêm</button>
                </form>
                
            </div>
            <button className="close-modal" onClick={props.toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
    </>
  );
}
