import "./newProduct.css";
import { useState, useEffect } from "react";
import { getCustomerById } from "../../services/customerService";
import { getInfoProduct } from "../../services/userService";
export default function ProductSoldDetail(props) {
    const [customer, setCustomer] = useState([]);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        
        if (props.open) {
            document.getElementById("modalNewProduct").style.display = 'block';
            fetchData();
        } else {
            document.getElementById("modalNewProduct").style.display = 'none';
        }
    },[props]);

    async function fetchData () {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');
        let customer = await getCustomerById(props.info.customerCode, token);
        let product = await getInfoProduct(props.info.agentwarehouse.productCode, token);
        setCustomer(customer.data.data);
        setProduct(product.data.data);
        setLoading(false);
    }
    
  return (
    <>
            <div id="modalNewProduct">
                <div onClick={props.toggleModalAdd} className="overlay"></div>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sản phẩm đã bán</h5>
                        <button type="button" className="close-icon" aria-label='Close' onClick={props.toggleModal}>
                            <span aria-hidden='true'>x</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className="productTop" id="productsold">
                        <div className="productTopLeft" id="customer-info" >
                        <div className="productInfoTop">
                                <span className="productName">Mã khách hàng: {customer.customerCode}</span>
                            </div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Tên KH: </span>
                                    <span className="productInfoValue">{customer.customerName}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Ngày sinh: </span>
                                    <span className="productInfoValue">{customer.dob}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Số điện thoại: </span>
                                    <span className="productInfoValue">{customer.phone}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Địa chỉ: </span>
                                    <span className="productInfoValue">{customer.adress}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Email: </span>
                                    <span className="productInfoValue">{customer.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="productTopRight" id="product-info">
                        <div className="productInfoTop">
                                <span className="productName">Mã sản phẩm: {product.productCode} - Model: {props.info.model}</span>
                            </div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Tên sản phẩm: </span>
                                    <span className="productInfoValue">{product.productName} </span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Màu sắc: </span>
                                    <span className="productInfoValue">{props.info.agentwarehouse?.color}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Lô sản xuất: </span>
                                    <span className="productInfoValue">{props.info.batchCode}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Ngày mua hàng: </span>
                                    <span className="productInfoValue">{props.info.dateOfPurchase}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Bảo hành đến: </span>
                                    <span className="productInfoValue">{props.info.end}</span>
                                </div>
                            </div>
                            
                        </div>
            
                    </div>
                    {/* <div className="productTop">
                        <div className="productTopLeft">
                            <div className="productInfoTop">
                                <span className="productName">Mã trung tâm: {props.info.customerCode}</span>
                            </div>
                            <div className="productInfoBottom">
                            <div className="productInfoItem">
                                    <span className="productInfoKey">Tên trung tâm: </span>
                                    <span className="productInfoValue">{props.info.customerName}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Địa chỉ: </span>
                                    <span className="productInfoValue">{props.info.dob}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Thành phố: </span>
                                    <span className="productInfoValue">{props.info.phone}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Số điện thoại: </span>
                                    <span className="productInfoValue">{props.info.phone}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Email: </span>
                                    <span className="productInfoValue">{props.info.adress}</span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="productTopRight">
                            <div className="productInfoTop">
                                <span className="productName">Thông tin bảo hành</span>
                            </div>
                            <div className="productInfoBottom">
                            <div className="productInfoItem">
                                    <span className="productInfoKey">Bảo hành lần thứ: </span>
                                    <span className="productInfoValue">{props.info.customerName}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Ngày gửi bảo hành: </span>
                                    <span className="productInfoValue">{props.info.dob}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Ghi chú: </span>
                                    <span className="productInfoValue">{props.info.phone}</span>
                                </div>
                                <div className="productInfoItem">
                                    <span className="productInfoKey">Trạng thái: </span>
                                    <span className="productInfoValue">{props.info.phone}</span>
                                </div>
                            </div>
                        </div>
            
                    </div> */}
                
                    </div>
                </div>
            </div>
        </>
    
  );
}