import React, { useState , useEffect, useSelector} from "react";
import "./modal.css";
import { production } from "../../services/factoryService";

export default function Production(props) {
    
    const initValue = {
        batchCode: '',
        quantity: '',
        color: '',
    }
    const [inputs, setInputs] = useState(initValue);

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    useEffect( () => {
        //setInputs({ ...inputs, 'id': props.info.productCode });
        if(props.open) {
            document.getElementById("modal-production").style.display = 'block';  
          } else {
            document.getElementById("modal-production").style.display = 'none';
        }
    });
    
    const productionProduct = async (event) => {
    
        event.preventDefault();
        try {
          inputs.id = props.info.productCode;
        console.log(inputs)
          const token = sessionStorage.getItem('accessToken');
          let res = await production(inputs, token);
          if (res.data.errCode === 0) {
            alert("Tạo user thành công");
            setInputs(initValue);
          }
        } catch(err) {
          console.log(err.response);
        }
        
      }

  return (
    <>
        <div className="modal active-modal" id="modal-production">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h1 className="newUserTitle" >Mã sản phẩm : {props.info.productCode}</h1>
            <div className="productTop">
                <form className="newUserForm">
                    <div className="newUserItem">
                    <label>Mã sản xuất</label>
                    <input type="text"
                    placeholder="Mã lô hàng" 
                    key="batchCode"
                    name="batchCode"
                    value={inputs.batchCode || ''}
                    onChange={handleOnChange}
                    />
                    </div>
                    <div className="newUserItem">
                    <label>Số lượng</label>
                    <input type="text"
                    placeholder="Quantity" 
                    key="quantity"
                    name="quantity"
                    value={inputs.password}
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
                        name="color" id="green"
                        value="Xanh" 
                        onChange={handleOnChange}
                        />
                        <label htmlFor="green">Xanh</label>
                    </div>
                    </div>
                    <button className="newUserButton" onClick={productionProduct}>Sản xuất</button>
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
