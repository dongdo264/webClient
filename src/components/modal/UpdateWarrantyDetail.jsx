import React, { useState , useEffect, useSelector, useRef} from "react";
import "./modal.css";
import { updateCustomerProduct } from "../../services/agentService";
import { DoorBack } from "@mui/icons-material";

export default function UpdateWarrantyDetail(props) {

    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const token = sessionStorage.getItem('accessToken');
            let update = await updateCustomerProduct(props.data.model, status, token);
            if (update.data.errCode === 0) {
                props.toggleModal();
                props.fetchData();
            }
            
        }catch(err) {
            console.log(err.response);
        }
    }

    
    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-warrantyupdate").style.display = 'block';  
            setStatus(props.data.status);
          } else {
            document.getElementById("modal-warrantyupdate").style.display = 'none';
        }
        // if (!loading && warrantyList.length === 0) {
        // fetchData();
        // };
        // return () => {
        //   componentMounted.current = false;
        // }
    }, [props]);

  return (
    <>
        <div className="modal active-modal" id="modal-warrantyupdate">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h1 className="newUserTitle">Triệu hồi sản phẩm</h1>
            <div className="productTop" style={{display: 'block', paddingTop: 0}}>
                <table className="import">
                    <tr>
                        <th>Model</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên KH</th>
                        <th>Số ĐT</th>
                    </tr>
                    <tr>
                        <td>{props.data.model}</td>
                        <td>{props.data.agentwarehouse?.productCode}</td>
                        <td>{props.data.customer?.customerName}</td>
                        <td>{props.data.customer?.phone}</td>
                    </tr>
                </table>
                <form className="newUserForm" style={{paddingTop: 0}}>
                    {/* <div className="newUserItem">
                    <label>Ghi chú</label>
                    <textarea type="text" style={{height: '70px'}}
                    placeholder="Ghi chú" 
                    key="note"
                    name="note"
                    value={note}
                    onChange={(e) => {setNote(e.target.value)}}
                    />
                    </div>   */}
                    <div className="newUserItem">
                        <label>Cập nhật trạng thái</label>
                        <select id="choice-factory" style={{height: '30px'}} name='status' key="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option key="Triệu hồi" value="Triệu hồi">Triệu hồi</option>
                            <option key="Đã liên hệ triệu hồi" value="Đã liên hệ triệu hồi">Đã liên hệ triệu hồi</option>
                            <option key="Đã nhận lại sản phẩm" value="Đã nhận lại sản phẩm">Đã nhận lại sản phẩm</option>
                        </select>
                    </div>   
                    <div className="newUserItem">                
                        <button className="newUserButton" onClick={handleSubmit}>Cập nhật</button>
                    </div> 
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
