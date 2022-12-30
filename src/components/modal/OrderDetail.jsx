import React, { useState , useEffect} from "react";
import "./modal.css";
import { getProfileUser } from "../../services/userService";
export default function OrderDetail(props) {
    const [factory, setFactory] = useState([]);
    const [agent, setAgent] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchData () {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');
        let agent = await getProfileUser(props.data.agentCode, token);
        let factory = await getProfileUser(props.data.factoryCode, token);
        setFactory(factory.data.infoUser);
        setAgent(agent.data.infoUser);
        setLoading(false);
      }
    

    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-orderdetail").style.display = 'block'; 
            fetchData(); 
          } else {
            document.getElementById("modal-orderdetail").style.display = 'none';
        }
    });
  

  return (
    <>
        <div className="modal active-modal" id="modal-orderdetail">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p style={{fontSize: '23px'}}>Mã đơn hàng: {props.data?.orderNumber} - Ngày đặt hàng: {props.data?.orderDate}</p>
            <p style={{fontSize: '23px'}}>Trạng thái:&nbsp;&nbsp;&nbsp;&nbsp; {props.data?.status}</p>
            <div className="productTop">
                <div className="productTopLeft" id="viewOrder">
                    <div className="productInfoTop">
                        <span className="productName">Mã đại lý:&nbsp;&nbsp;&nbsp;&nbsp; {agent?.id}</span>
                    </div>
                    <div className="productInfoBottom">
                    <div className="productInfoItem">
                            <span className="productInfoKey">Tên đại lý:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{agent?.name}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Địa chỉ:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{agent?.address}</span>
                        </div>
                        
                        <div className="productInfoItem">
                            <span className="productInfoKey">Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{agent?.phone}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Email:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{agent?.email}</span>
                        </div>
                    </div>
                </div>
                <div className="productTopRight" style={{fontSize: '23px', margin: '0px'}}>
                    <div className="productInfoTop">
                        <span className="productName">Mã nhà máy:&nbsp;&nbsp;&nbsp;&nbsp; {factory?.id}</span>
                    </div>
                    <div className="productInfoBottom">
                    <div className="productInfoItem">
                            <span className="productInfoKey">Tên nhà máy:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{factory?.name}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Địa chỉ:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{factory?.address}</span>
                        </div>
                        
                        <div className="productInfoItem">
                            <span className="productInfoKey">Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{factory?.phone}</span>
                        </div>
                       
                        <div className="productInfoItem">
                            <span className="productInfoKey">Email:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <span className="productInfoValue">{factory?.email}</span>
                        </div>
                    </div>
                </div>
            
            </div>
            {props.open ? (
                <>
                
                {/* <span className="productInfoKey">Mã đơn hàng: {props.data.orderNumber} - Ngày đặt hàng: {props.data.orderDate} </span> */}
                <div className="productTop">
                    
                    <table className="import">
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Màu sắc</th>
                            <th>Số lượng</th>
                        </tr>
                        {props.info?.map((item, index) => (
                            <tr>

                                <td>{item.productCode}</td>
                                <td>{item.color}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </table>
            </div>
                </>
            ): (
                <>
                </>
            )}
            
            <button className="close-modal" onClick={props.toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
    </>
  );
}
