import React, { useState , useEffect, useSelector, useRef} from "react";
import "./modal.css";
import { sendWarrantyClaim } from "../../services/agentService";
import { getAllWarrantyCenter } from "../../services/userService";

export default function RequestWarranty(props) {
    const [warrantyList, setWarrantyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wcChoice, setWcChoice] = useState(null);
    const [note, setNote] = useState([]);
    const componentMounted = useRef(true)
    async function fetchData () {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');
        let res = await getAllWarrantyCenter(token);
        let data = res.data.data;
        let arr = [];
        for (let i in data) {
          if (data[i].account.status === "Active") {
            arr.push(data[i])
          }
        }
        setWarrantyList(arr);
        setLoading(false);
    }

    const handleOnChange = (event) => {
        console.log(event.target.value)
        setWcChoice(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      let data = {};
      data.model = props.data.model;
      data.productCode = props.data.agentwarehouse.productCode;
      data.wcCode = wcChoice;
      data.note = note;
      console.log(data);
      try {
        const token = sessionStorage.getItem('accessToken');
        let sendRequest = await sendWarrantyClaim(data, token);
        console.log(sendRequest);
        if (sendRequest.data.errCode === 0) {
          alert("Sản phẩm đã được gửi đi bảo hành!");
          props.toggleModal();
          props.fetchData();
        }
      }catch(err) {
        console.log(err.response);
      }
    }

    
    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-warranty").style.display = 'block';  
          } else {
            document.getElementById("modal-warranty").style.display = 'none';
        }
        if (!loading && warrantyList.length === 0) {
        fetchData();
        };
        return () => {
          componentMounted.current = false;
        }
    }, [loading, warrantyList, props]);

  return (
    <>
        <div className="modal active-modal" id="modal-warranty">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h1 className="newUserTitle" style={{}}>Yêu cầu bảo hành</h1>
            <div className="productTop" style={{display: 'block', paddingTop: 0}}>
                <table className="import">
                    <tr>
                        <th>Model</th>
                        <th>Mã sản phẩm</th>
                        <th>Màu sắc</th>
                    </tr>
                    <tr>
                        <td>{props.data?.model}</td>
                        <td>{props.data.agentwarehouse?.productCode}</td>
                        <td>{props.data.agentwarehouse?.color}</td>
                    </tr>
                </table>
                <form className="newUserForm" style={{paddingTop: 0}}>
                <div className="newUserItem">
                    <label>Ghi chú</label>
                    <textarea type="text" style={{height: '70px'}}
                    placeholder="Ghi chú" 
                    key="note"
                    name="note"
                    value={note}
                    onChange={(e) => {setNote(e.target.value)}}
                    />
                    </div>  
                    <div className="newUserItem">
                        <label>Chọn trung tâm bảo hành</label>
                        <select id="choice-factory" style={{height: '30px'}} onChange={(e) => {
                          setWcChoice(e.target.value)
                          }} name="wcChoice" value={wcChoice}>
                            {warrantyList.map((item) => (
                                <option key={item.wcCode} value={item.wcCode}>{item.wcName} - {item.wcCity}</option>
                            ))}
                        </select>
                    </div>  
                    <div className="newUserItem">                
                        <button className="newUserButton" onClick={handleSubmit}>Gửi sản phẩm</button>
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
