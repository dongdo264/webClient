import "./newProduct.css";
import { useState, useEffect } from "react";
import { updateProductLine } from "../../services/adminService";
export default function ProductLineDetail(props) {
    const initValueProduct = {
        productLine: '',
        textDescription: '',
        status: '',
    }
    const [productInputs, setProductInputs] = useState(initValueProduct);


    useEffect(() => {
        if (props.open) {
            document.getElementById("modalEditProductLine").style.display = 'block';
            if (props.type === "edit") {
                let obj = {
                    productLine: props.data.productLine,
                    textDescription: props.data.textDescription,
                    status: props.data.status
                }
                setProductInputs(obj);
            }
        } else {
            document.getElementById("modalEditProductLine").style.display = 'none';
        }
    },[props]);


    const handleOnChangeInputProduct = event => {
        const { name, value } = event.target;       
        setProductInputs({ ...productInputs, [name]: value });
    };
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = sessionStorage.getItem('accessToken');
            let update = await updateProductLine(productInputs.productLine, productInputs, token);
            if (update.data.errCode === 0) {
                alert("Chỉnh sửa dòng sản phẩm thành công!");
                props.toggleModal();
                props.fetchData();
            }
        }catch(err) {
        console.log(err.response);
        }
    }

    if (props.type === "edit") {
        return (
            <>
                    <div id="modalEditProductLine">
                        <div onClick={props.toggleModalAdd} className="overlay"></div>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chỉnh sửa dòng sản phẩm</h5>
                                <button type="button" className="close-icon" aria-label='Close' onClick={props.toggleModal}>
                                    <span aria-hidden='true'>x</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="newProduct" >
                                <form className="addProductForm" style={{display: 'block'}}>
                                    <div className="addProductItem" id="updateCus">
                                    <label>Tên dòng sản phẩm</label>
                                    <span>{props.data.productLine}</span>
                                    </div>
                                    <div className="addProductItem" id="updateCus">
                                    <label>Mô tả</label>
                                    <textarea type="text" 
                                    placeholder="Mô tả"
                                    key="textDescription"
                                    name="textDescription"
                                    value={productInputs.textDescription}
                                    onChange={handleOnChangeInputProduct}
                                    style={{height: '70px', width: '300px'}}
                                    />
                                    
                                    </div>
                                    <div className="addProductItem" id="updateCus">
                                    <label>Trạng thái</label> 
                                    <select name="status" id="status" key="status" value={productInputs.status} onChange={handleOnChangeInputProduct} style={{height: '35px'}}>
                                        <option value="Active" >Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    </div>
                                </form>
                                <button className="addProductButton" onClick={handleSubmit} >Cập nhật</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </>
            
          );
    } 
    
    return (
            <>
                    <div id="modalEditProductLine">
                        <div onClick={props.toggleModalAdd} className="overlay"></div>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thông tin dòng sản phẩm</h5>
                                <button type="button" className="close-icon" aria-label='Close' onClick={props.toggleModal}>
                                    <span aria-hidden='true'>x</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="newProduct" >
                                <form className="addProductForm" style={{display: 'block'}}>
                                    <div className="addProductItem" id="updateCus">
                                    <label>Tên dòng sản phẩm</label>

                                    </div>
                                    <div className="addProductItem" id="updateCus">
                                    <label>Mô tả</label>
                                    
                                    </div>
                                    <div className="addProductItem" id="updateCus">
                                    <label>Trạng thái</label>
                                    
                                    </div>
                                </form>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </>
            
          );
};