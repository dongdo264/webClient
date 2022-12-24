import React, { useState , useEffect, useSelector, useRef} from "react";
import "./modal.css";
import { transferProducts } from "../../services/orderService";

export default function TransferProducts(props) {
    // const [warehouse, setWarehouse] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [factorySelect, setFactoryChoice] = useState(null);
    // const componentMounted = useRef(true)
    // async function fetchData () {
    //     setLoading(true);
    //     const token = sessionStorage.getItem('accessToken');
    //     try {
    //       let res = await getWarehouse(token);
    //       setWarehouse(res.data.data);
    //       setLoading(false);
    //     }catch(err) {
    //       console.log(err.response);
    //     }
       
    // }

    // const handleOnChange = (event) => {
    //     console.log(event.target.value)
    //     setFactoryChoice(event.target.value);
    //     console.log(factorySelect);
    // };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!props.check) {
        alert("Không đủ hàng!")
        return;
      } else {
        const token = sessionStorage.getItem('accessToken');
        let transfer = await transferProducts(props.data.orderNumber, token);
        if (transfer.data.errCode === 0) {
          alert(`Chuyển sản phẩm sang đại lý ${props.agent.agentName} thành công!`)
        }
      }
    }

    
    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-transfer").style.display = 'block';  
          } else {
            document.getElementById("modal-transfer").style.display = 'none';
        }
    }, [props]);

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
                            <td>{item.quantityInStock}</td>
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
