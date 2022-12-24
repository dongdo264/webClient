import React, { useState , useEffect, useSelector} from "react";
import "./modal.css";
import { production } from "../../services/factoryService";

export default function OrderModal(props) {
    
    const initValue = {
        quantity: '',
        color: '',
    }
    const [inputs, setInputs] = useState(initValue);

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      inputs.productCode = props.info.productCode;
      inputs.productName = props.info.name;
      inputs.img = props.info.img;
      console.log(inputs);
      props.addNewItem(inputs);
    }

    useEffect( () => {
        //setInputs({ ...inputs, 'id': props.info.productCode });
        if(props.open) {
            document.getElementById("modal-order").style.display = 'block';  
          } else {
            document.getElementById("modal-order").style.display = 'none';
        }
    });
    

  return (
    <>
        <div className="modal active-modal" id="modal-order">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h1 className="newUserTitle" >Mã sản phẩm : {props.info.productCode}</h1>
            <div className="productTop" style={{pt: 0}}>
                <form className="newUserForm" style={{pt: 0}}>
                    <div className="newUserItem">
                    <label>Số lượng</label>
                    <input type="text"
                    placeholder="Quantity" 
                    key="quantity"
                    name="quantity"
                    value={inputs.quantity}
                    onChange={handleOnChange}
                    />
                    </div>                   
                    <div className="newUserItem">
                    <label>Màu sắc</label>
                    <div className="newUserGender">
                        <input type="radio" 
                        name="color" 
                        id="red" 
                        value="Đỏ" 
                        onChange={handleOnChange}
                        />
                        <label htmlFor="red">Đỏ</label>
                        <input type="radio" 
                        name="color" 
                        id="white" 
                        value="Trắng" 
                        onChange={handleOnChange}
                        />
                        <label htmlFor="white">Trắng</label>
                        <input type="radio"
                        name="color" id="other"
                        value="Đen" 
                        onChange={handleOnChange}
                        />
                        <label htmlFor="other">Đen</label>
                        <input type="radio" 
                        name="color" 
                        id="green" 
                        value="Xanh" 
                        onChange={handleOnChange}
                        />
                        <label htmlFor="green">Xanh</label>
                    </div>
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
