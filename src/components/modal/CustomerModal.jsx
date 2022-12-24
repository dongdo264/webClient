import "./modal.css";
import { useState, useEffect } from "react";
import { convertBase64 } from "../../utils/convertImagetoBase64";
import { createCustomer, sellProducts } from "../../services/agentService";
export default function CustomerModal(props) {
    const initValue = {
        customerCode: '',
        customerName: '',
        phone: '',
        adress: '',
        dob: '',
        status: ''
    }
    const [customerInputs, setCustomerInputs] = useState(initValue);
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        // if (!loading && productLine.length === 0) {
        //     fetchData();
        // };
        if (props.open) {
            document.getElementById("modal-customer").style.display = 'block';
            console.log(props.data);
        } else {
            document.getElementById("modal-customer").style.display = 'none';
        }
    },[props]);
    
    
   

    const handleOnChangeInput = event => {
        const { name, value } = event.target;       
        setCustomerInputs({ ...customerInputs, [name]: value });
    };

    const handleFileInputChange =  async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setAvatar(base64);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            customerInputs.avatar = avatar;
            customerInputs.customerCode = Date.now() % 100000000;
            const token = sessionStorage.getItem('accessToken');
            let create = await createCustomer(customerInputs, token);
            console.log(create);
            let sell = await sellProducts(customerInputs.customerCode, props.data, token);
            alert("Đơn hàng thành công!");
        }catch(err) {
            console.log(err.response);
        }
    }

  return (
    <>
        <div className="modal active-modal" id="modal-customer" style={{display: 'block'}}>
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Thông tin khách hàng</h5>
                        <button type="button" className="close-icon" aria-label='Close' onClick={props.toggleModal}>
                            <span aria-hidden='true'>x</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className="newProduct" style={{display: 'block'}}>
                        <form className="addProductForm" style={{display: 'block'}}>
                            <div className="addProductItem">
                            <label>Image</label>
                            <input type="file"
                            id="file"
                            onChange={handleFileInputChange}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Tên khách hàng</label>
                            <input type="text" 
                            placeholder="Tên khách hàng"
                            key="customerName"
                            name="customerName"
                            value={customerInputs.customerName}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Ngày sinh</label>
                            <input type="text" 
                            placeholder="Ngày sinh"
                            key="dob"
                            name="dob"
                            value={customerInputs.dob}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Địa chỉ</label>
                            <input type="text" 
                            placeholder="Địa chỉ"
                            key="adress"
                            name="adress"
                            value={customerInputs.adress}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Số điện thoại</label>
                            <input type="text" 
                            placeholder="Số điện thoại"
                            key="phone"
                            name="phone"
                            value={customerInputs.phone}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Email</label>
                            <input type="text" 
                            placeholder="Email"
                            key="email"
                            name="email"
                            value={customerInputs.email}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            
                        </form>
                        <button className="addProductButton" onClick={handleSubmit} >Create</button>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="cancel-modal-btn modal-btn" onClick={props.toggleModal}>
                            Cancel
                        </button>
                    </div> */}
                </div>
        </div>
        </>
    
  );
}