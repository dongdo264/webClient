import React, { useState , useEffect, useSelector, useRef} from "react";
import "./modal.css";
import { transferProducts } from "../../services/orderService";
import { updateOrder } from "../../services/orderService";
export default function TransferProducts(props) {

    const [status, setStatus] = useState(null);
    const handleSubmit = async (event) => {
      event.preventDefault();
      const token = sessionStorage.getItem('accessToken');
      try {
        if (status === "Đang sản xuất") {
          let submit = await updateOrder(props.data.orderNumber, status, token);
          if (submit.data.errCode === 0) {
            alert("Cập nhật đơn hàng thành công!");
          }
        } else if (status === "Hủy, không đủ hàng") {
          let submit = await updateOrder(props.data.orderNumber, status, token);
          if (submit.data.errCode === 0) {
            alert("Cập nhật đơn hàng thành công!");
          }
        } else if (status === "Chuyển hàng") {
          if (!props.check) {
            alert("Không đủ hàng!")
            return;
          } else {
            
            let transfer = await transferProducts(props.data.orderNumber, token);
            if (transfer.data.errCode === 0) {
              alert(`Chuyển sản phẩm sang đại lý ${props.agent.agentName} thành công!`)
            }
          }
        }
        

      }catch(err) {

      }
      
    }
    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-transfer").style.display = 'block';
            setStatus(props.data.status);  
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
                  
                  <div className="newUserItem">
                        <label>Cập nhật trạng thái</label>
                        <select id="choice-factory" style={{height: '30px'}} name='status' key="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option key="Pending" value="Pending">Pending</option>
                            <option key="Đang sản xuất" value="Đang sản xuất">Đang sản xuất</option>
                            <option key="Hủy, không đủ hàng" value="Hủy, không đủ hàng">Hủy, không đủ hàng</option>
                            <option key="Chuyển hàng" value="Chuyển hàng">Đồng ý chuyển hàng</option>
                        </select>
                    </div> 
                   
                </table>          
                  <button className="newUserButton" style={{height: 40}} onClick={handleSubmit}>Cập nhật</button>
            </div>
            <button className="close-modal" onClick={props.toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
    </>
  );
}
