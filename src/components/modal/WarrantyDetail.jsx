import React, { useState , useEffect, useSelector, useRef} from "react";
import "./modal.css";
import { getAllFactories } from "../../services/userService";
import { sendProductToAgent, sendProductToFactory } from "../../services/warrantyService";
export default function WarrantyDetail(props) {
    const [factoryList, setFactoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [factoryChoice, setFactoryChoice] = useState('');
    const [displayFactory, setDisplayFactory] = useState('none');
    const [note, setNote] = useState(props.data?.note ? props.data.note : '');
    const componentMounted = useRef(true)
    async function fetchData () {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');
        let res = await getAllFactories(token);
        setFactoryList(res.data.data);
        setLoading(false);
    }

    const handleOnChange = (event) => {
        // console.log(event.target.value)
        // setWcChoice(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      props.data.note = note;
      props.data.factoryCode = factoryChoice;
      const token = sessionStorage.getItem('accessToken');
      if (status === 'Hoàn tất') { 
        let send = await sendProductToAgent(props.data, token);
        if (send.data.errCode === 0) {
            alert("Đã trả sản phẩm về đại lý");
        }
      } else if (status === 'Sản phẩm lỗi') {
        let send = await sendProductToFactory(props.data, token);
        if (send.data.errCode === 0) {
            alert("Đã trả sản phẩm về nhà máy");
        }
      }
      
    }

    useEffect(() => {
        
        if (status === 'Sản phẩm lỗi') {
            setDisplayFactory('block');
        } else {
            setDisplayFactory('none')
        }
    })
    
    useEffect( () => {
        if(props.open) {
            document.getElementById("modal-warrantydeitail").style.display = 'block';  
            setNote(props.data?.note);
            console.log(props.data);
          } else {
            document.getElementById("modal-warrantydeitail").style.display = 'none';
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
        <div className="modal active-modal" id="modal-warrantydeitail">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h1 className="newUserTitle">Yêu cầu bảo hành</h1>
            <div className="productTop" style={{display: 'block', paddingTop: 0}}>
                <table className="import">
                    <tr>
                        <th>Model</th>
                        <th>Mã sản phẩm</th>
                        <th>Ngày gửi</th>
                    </tr>
                    <tr>
                        <td>{props.data.model}</td>
                        <td>{props.data.productCode}</td>
                        <td>{props.data.createAt}</td>
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
                        <label>Cập nhật trạng thái</label>
                        <select id="choice-factory" style={{height: '30px'}} name='status' key="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option key="Đang bảo hành" value="Đang bảo hành">Đang bảo hành</option>
                            <option key="Hoàn tất" value="Hoàn tất">Hoàn tất</option>
                            <option key="Sản phẩm lỗi" value="Sản phẩm lỗi">Sản phẩm lỗi</option>
                        </select>
                    </div> 
                    <div className="newUserItem" style={{display: displayFactory}}>
                        <label>Chuyển về nhà máy: </label>
                        <select id="choice-factory" style={{height: '30px'}} 
                        name="factoryChoice" value={factoryChoice}
                        onChange={(e) => setFactoryChoice(e.target.value)}
                        >
                            {factoryList.map((item) => (
                                <option key={item.factoryCode} value={item.factoryCode}>{item.factoryName} - {item.factoryCity}</option>
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
