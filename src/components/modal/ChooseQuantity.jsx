import React, { useState , useEffect, useSelector} from "react";
import "./modal.css";
import { production } from "../../services/factoryService";

export default function ChooseQuantity(props) {
    const [quantity, setQuantity] = useState([]);
    const [inputs, setInputs] = useState([]);

    const handleOnChange = event => {
        setQuantity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.info.quantity = quantity;
        console.log(props.info);
        props.addNewItem(props.info);
    }
    
      const addNewItem = (item) => {
        // let arr = [...order]
        // Object.preventExtensions(order[order.length - 1]);
        // arr[order.length] = item;
        // if (arr.length !== 0) {
        //   for (let i in arr) {
        //     arr[i].id = parseInt(i) + 1;
        //   }
        // }
        // setOrder(arr);
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
                    value={quantity}
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
