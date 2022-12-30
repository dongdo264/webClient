import "./modal.css";
import { useState, useEffect } from "react";
import { convertBase64 } from "../../utils/convertImagetoBase64";
import { createCustomer, updateCustomer } from "../../services/customerService";
import { sellProducts } from "../../services/agentService";
import { isEmail, checkDob } from "../../utils/validateCustomer";
export default function CustomerModal(props) {
    const initValue = {
        customerCode: '',
        customerName: '',
        phone: '',
        address: '',
        dob: '',
        email: '',
        status: ''
    }
    const [customerInputs, setCustomerInputs] = useState(initValue);
    const [avatar, setAvatar] = useState("");
    const [errMsgName, setErrMsgName] = useState('');
    const [errMsgAddress, setErrMsgAddress] = useState('');
    const [errMsgPhone, setErrMsgPhone] = useState('');
    const [errMsgDob, setErrMsgDob] = useState('');
    const [errMsgEmail, setErrMsgEmail] = useState('');

    useEffect(() => {
        const id = "modal-customer" + props.type
        if (props.open) {
            document.getElementById(id).style.display = 'block';
            setErrMsgAddress("");
            setErrMsgDob("");
            setErrMsgEmail("");
            setErrMsgName("");
            setErrMsgPhone("");
            if (props.type === "edit") {
                let obj = {
                    customerCode: props.info.customerCode,
                    customerName: props.info.customerName,
                    phone: props.info.phone,
                    address: props.info.address,
                    dob: props.info.dob,
                    email: props.info.email
                }
                setAvatar(props.info.img);
                setCustomerInputs(obj);
            }
        } else {
            document.getElementById(id).style.display = 'none';
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
        let check = true;
        
        if (!checkDob(customerInputs.dob)) {
            setErrMsgDob("Ngày sinh không hợp lệ");
            check = false;
        } else {
            setErrMsgDob("");
        }
        
        if (!isEmail(customerInputs.email)) {    
            setErrMsgEmail("Email không hợp lệ")
            check = false;
        } else {
            setErrMsgEmail("")
        }
        
        if (customerInputs.address.length < 5) {
            setErrMsgAddress("Địa chỉ không hợp lệ")
            check = false;
        } else {
            setErrMsgAddress("")
        }
         
        if (customerInputs.customerName.length === 0) {
            setErrMsgName("Tên không hợp lệ")
            check = false;
        } else {
            setErrMsgName("")
        }
        if (customerInputs.phone.length !== 10 ) {
            setErrMsgPhone("Số điện thoại phải gồm 10 số!")
            check = false;
        } else {
            setErrMsgPhone("")
        }
        if (!check) {
            return;
        }
        try{
            const token = sessionStorage.getItem('accessToken');
            if (props.type === 'edit') {
                customerInputs.avatar = avatar;
                let update = await updateCustomer(customerInputs, props.info.customerCode, token);
                if (update.data.errCode === 0) {
                    alert("Cập nhật thông tin khách hàng thành công!");
                    props.fetchData();
                    props.toggleModal();
                    return;
                }
            }
            customerInputs.avatar = avatar;
            customerInputs.customerCode = Math.floor(Math.random() * 1000000000);
            
            let create = await createCustomer(customerInputs, token);
            let sell = await sellProducts(customerInputs.customerCode, props.data, token);
            if (sell.data.errCode === 0) {
                alert("Chuyển sản phẩm cho khách hàng thành công!");
                props.fetchData();
                props.toggleModal();
                return;
            }
        }catch(err) {
            console.log(err.response);
        }
    }

  return (
    <>
        <div className="modal active-modal" id={"modal-customer" + props.type} style={{display: 'block'}}>
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
                            <div className="addProductItem" id="updateCus">
                            <label>Image</label>
                            <input type="file"
                            id="file"
                            onChange={handleFileInputChange}
                            />
                            </div>
                            <div className="addProductItem" id="updateCus">
                            <label>Tên khách hàng:&nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errMsgName}</span></label>
                            <input type="text" 
                            placeholder="Tên khách hàng"
                            key="customerName"
                            name="customerName"
                            value={customerInputs.customerName}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem" id="updateCus">
                            <label>Ngày sinh:&nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errMsgDob}</span></label>
                            <input type="text" 
                            placeholder="Ngày sinh"
                            key="dob"
                            name="dob"
                            value={customerInputs.dob}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem" id="updateCus">
                            <label>Địa chỉ:&nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errMsgAddress}</span></label>
                            <input type="text" 
                            placeholder="Địa chỉ"
                            key="address"
                            name="address"
                            value={customerInputs.address}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem" id="updateCus">
                            <label>Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errMsgPhone}</span></label>
                            <input type="text" 
                            placeholder="Số điện thoại"
                            key="phone"
                            name="phone"
                            value={customerInputs.phone}
                            onChange={handleOnChangeInput}
                            />
                            </div>
                            <div className="addProductItem" id="updateCus">
                            <label>Email:&nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errMsgEmail}</span></label>
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