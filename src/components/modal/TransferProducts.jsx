import React, { useState , useEffect, useSelector, useRef} from "react";
import "./modal.css";
import { getAllFactories } from "../../services/userService";
import { createOrder } from "../../services/agentService";

export default function TransferProducts(props) {
    const [factoryList, setFactoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [factorySelect, setFactoryChoice] = useState(null);
    const componentMounted = useRef(true)
    async function fetchData () {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');
        let res = await getAllFactories(token);
        let fList = res.data.data;
        setFactoryList(fList);
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
            document.getElementById("modal-transfer").style.display = 'block';  
          } else {
            document.getElementById("modal-transfer").style.display = 'none';
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
        <div className="modal active-modal" id="modal-transfer">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h2 className="newUserTitle" >Chi tiết đơn hàng {props.data.orderNumber}</h2>
            <div className="productTop" style={{display: 'block'}}>
            {/* <table className="import">
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
          
                    </tr>
                        <tr>
                            <td>{props.data.orderNumber}</td>
                            <td>{props.data.orderDate}</td>
                            <td>{props.data.status}</td>
                        </tr>
                </table> */}
                {/* <table className="import">
                    <tr>
                        <th>Tên nhà máy</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                    </tr>
                        <tr>
                            <td>{props.factory.factoryName}</td>
                            <td>{props.factory.factoryAdress}</td>
                            <td>{props.factory.factoryPhone}</td>
                            <td>{props.factory.email}</td>
                        </tr>
                </table> */}
                <table className="import">
                    <tr>
                        <th>Tên đại lý</th>
                        <th>Số điện thoại</th>
                        <th>Tên nhà máy</th>
                        <th>Số điện thoại</th>
                        <th>Ngày đặt</th>
                        <th>Trạng thái</th>
                    </tr>
                        <tr>
                            <td>{props.agent.agentName}</td>
                            <td>{props.agent.agentPhone}</td>
                            <td>{props.factory.factoryName}</td>
                            <td>{props.factory.factoryPhone}</td>
                            <td>{props.data.orderDate}</td>
                            <td>{props.data.status}</td>
                        </tr>
                </table>
                <h4 style={{mt: 5, mb: 5, fontSize: '1.4rem', color: 'red'}}>Sản phẩm:</h4>
                <table className="import">
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Màu sắc</th>
                        <th>Số lượng</th>
                        <th>Trong kho</th>
                    </tr>
                    {props.open ? (
                      <>
                       {props.orderdetail?.map((item, index) => (
                        <tr>
                            <td>{item.productCode}</td>
                            <td>{item.color}</td>
                            <td>{item.quantity}</td>
                            <td>0</td>
                        </tr>
                        ))}
                        </>
                    ) : (
                        <>
                        </>
                    )}
                   
                </table>          
                  <button className="newUserButton" style={{height: 40}} onClick={handleSubmit}>Gửi hàng</button>
            </div>
            <button className="close-modal" onClick={props.toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
    </>
  );
}
