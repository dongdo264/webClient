import "./newProduct.css";
import { useState, useEffect } from "react";
import { createNewProductLine } from "../../services/adminService";
export default function NewProductLine(props) {
    useEffect(() => {
        
        if (props.open) {
            document.getElementById("modalNewProductLine").style.display = 'block';
        } else {
            document.getElementById("modalNewProductLine").style.display = 'none';
        }
    },[props]);
    const initValueProduct = {
        productLine: '',
        textDescription: '',
        status: '',
    }
    const [productInputs, setProductInputs] = useState(initValueProduct);

    const handleOnChangeInputProduct = event => {
        const { name, value } = event.target;       
        setProductInputs({ ...productInputs, [name]: value });
    };
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = sessionStorage.getItem('accessToken');
            let create = await createNewProductLine(productInputs, token);
            if (create.data.errCode === 0) {
                alert("Tạo dòng sản phẩm mới thành công!");
                props.toggleModal();
                props.fetchData();
            }
        }catch(err) {
        console.log(err.response);
        }
    }

  return (
    <>
            <div id="modalNewProductLine">
                <div onClick={props.toggleModalAdd} className="overlay"></div>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Thêm dòng sản phẩm</h5>
                        <button type="button" className="close-icon" aria-label='Close' onClick={props.toggleModal}>
                            <span aria-hidden='true'>x</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className="newProduct" >
                        <form className="addProductForm" style={{display: 'block'}}>
                            <div className="addProductItem" id="updateCus">
                            <label>Tên dòng sản phẩm</label>
                            <input type="text" 
                            placeholder="Tên dòng sản phẩm"
                            key="productLine"
                            name="productLine"
                            value={productInputs.productLine}
                            onChange={handleOnChangeInputProduct}
                            />
                            </div>
                            <div className="addProductItem" id="updateCus">
                            <label>Mô tả</label>
                            <textarea type="text" 
                            placeholder="Mô tả"
                            key="textDescription"
                            name="textDescription"
                            value={productInputs.textDescription}
                            onChange={handleOnChangeInputProduct}
                            style={{height: '70px'}}
                            />
                            </div>
                            <div className="addProductItem" id="updateCus">
                            <label>Trạng thái</label>
                            <select name="status" id="status" key="status" onChange={handleOnChangeInputProduct}>
                                <option value="Active" >Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
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