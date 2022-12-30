import React, { useState , useEffect, useSelector, useRef} from "react";
import "./modal.css";
import { getAllFactories } from "../../services/userService";
import { createOrder } from "../../services/orderService";

export default function ImportModal(props) {
    const [factoryList, setFactoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [factorySelect, setFactoryChoice] = useState(null);
    const componentMounted = useRef(true)
    async function fetchData () {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');
        let res = await getAllFactories(token);
        let fList = res.data.data;
        let arr = []
        for (let i in fList) {
          if (fList[i].account.status === "Active") {
            arr.push(fList[i]);
          }
        }
        setFactoryList(arr);
        setLoading(false);
    }

    const handleOnChange = (event) => {
        console.log(event.target.value)
        setFactoryChoice(event.target.value);
        console.log(factorySelect);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      let data = [];
      let arr = props.info;
      for (let i in arr) {
        let obj = {};
        obj.productCode = arr[i].productCode;
        obj.quantity = arr[i].quantity;
        obj.color = arr[i].color;
        data.push(obj);
      }
      try {
        const token = sessionStorage.getItem('accessToken');
        let check = await createOrder(factorySelect, data, token);
        console.log(check);
        if (check.data.errCode === 0) {
            alert("Đơn hàng đã được gửi đi!");
        }
      }catch(err) {
        console.log(err.response)
      }
    }

    
    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-import").style.display = 'block';  
          } else {
            document.getElementById("modal-import").style.display = 'none';
        }
        if (!loading && factoryList.length === 0) {
          fetchData();
        };
        return () => {
          componentMounted.current = false;
        }
    }, [loading, factoryList, props]);

  return (
    <>
        <div className="modal active-modal" id="modal-import">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h1 className="newUserTitle" >Yêu cầu nhập hàng</h1>
            <div className="productTop" style={{display: 'block'}}>
                <table className="import">
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Màu sắc</th>
                        <th>Số lượng</th>
                    </tr>
                    {props.info.map((item, index) => (
                        <tr>

                            <td>{item.productCode}</td>
                            <td>{item.color}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </table>
                <form className="newUserForm">
                    <div className="newUserItem">
                        <label>Chọn cơ sở sản xuất</label>
                        <select id="choice-factory" style={{height: '30px'}} onChange={(e) => {
                          setFactoryChoice(e.target.value)
                          }} name="factorySelect" value={factorySelect}>
                            {factoryList.map((item) => (
                                <option key={item.factoryCode} value={item.factoryCode}>{item.factoryName} - {item.factoryCity}</option>
                            ))}
                        </select>
                    </div>                   
                    <button className="newUserButton" onClick={handleSubmit}>Gửi yêu cầu</button>
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
