import "./newProduct.css";
import { useState, useEffect } from "react";
import { convertBase64 } from "../../utils/convertImagetoBase64";
import { createNewProduct } from "../../services/adminService";
import { getAllProductLines } from "../../services/userService";
import { updateProduct } from "../../services/adminService";
export default function NewProduct(props) {
    
    const initValueProduct = {
        productName: '',
        productLine: '',
        productPrice: '',
        warrantyPeriod: '',
        status: ''
    }
    const initValueProductDetail = {
        size: '',
        frame: '',
        shock: '',
        rims: '',
        tires: '',
        handlebar: '',
        saddle: '',
        pedals: '',
        brakes: '', 
        weight: ''
    }
    const [productInputs, setProductInputs] = useState(initValueProduct);
    const [productDetailInputs, setProductDetailInputs] = useState(initValueProductDetail);
    const [avatar, setAvatar] = useState("");
    const [productLine, setProductLine] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errName, setErrName] = useState('')
    const [errLine, setErrLine] = useState('')
    const [errPrice, setErrPrice] = useState('')
    const [errWarrantyPeriod, setErrWarrantPeriod] = useState('')
    const [errSize, setErrSize] = useState('')
    const [errFrame, setErrFrame] = useState('')
    const [errShock, setErrShock] = useState('')
    const [errRims, setErrRims] = useState('')
    const [errTires, setErrTires] = useState('')
    const [errHandlebar, setErrHandlebar] = useState('')
    const [errSaddle, setErrSaddle] = useState('')
    const [errPedals, setErrPedals] = useState('')
    const [errBrakes, setErrBrakes] = useState('')
    const [errWeight, setErrWeight] = useState('')
    useEffect(() => {
        if (!loading && productLine.length === 0) {
            fetchData();
        };
        if (props.open) {
            document.getElementById("modalNewProduct").style.display = 'block';
            console.log(props.data.productdetail);
            if (props.type === "edit") {
                let detail_ = props.data.productdetail;
                let detail = {
                    size: detail_?.size,
                    frame: detail_?.frame,
                    shock: detail_?.shock,
                    rims: detail_?.rims,
                    tires: detail_?.tires,
                    handlebar: detail_?.handlebar,
                    saddle: detail_?.saddle,
                    pedals: detail_?.pedals,
                    brakes: detail_?.brakes, 
                    weight: detail_?.weight
                }
                setProductDetailInputs(detail);
                setAvatar(props.data.img);
                let p = {
                    productName: props.data.productName,
                    productLine: props.data.productLine,
                    productPrice: props.data.buyPrice,
                    warrantyPeriod: props.data.warrantyPeriod,
                    status: props.data.status
                }
                setProductInputs(p);
            }
        } else {
            document.getElementById("modalNewProduct").style.display = 'none';
        }
    },[productLine, loading, props]);

    async function fetchData () {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');
        let res = await getAllProductLines(token);
        setProductLine(res.data.data);
        setLoading(false);
    }
    

    const handleOnChangeInputProduct = event => {
        const { name, value } = event.target;       
        setProductInputs({ ...productInputs, [name]: value });
    };

    const handleOnChangeInputProductDetail = event => {
        const { name, value } = event.target;
        setProductDetailInputs({ ...productDetailInputs, [name]: value });
        
    };
    const handleFileInputChange =  async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        //console.log(decode(base64));
        setAvatar(base64);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let check = true;

        if(productInputs.productName.length === 0) {
        setErrName("*")
        check = false;
        } else {
        setErrName("")
        }
        if(productInputs.productLine.length === 0) {
        setErrLine("*")
        check = false;
        } else {
        setErrLine("")
        }
        if(productInputs.productPrice.length === 0) {
            setErrPrice("*")
             check = false;
        } else {
            setErrPrice("")
        }
        if(productInputs.warrantyPeriod.length === 0) {
           setErrWarrantPeriod("*")
            check = false;
        } else {
          setErrWarrantPeriod("")
        }
        if(productDetailInputs.size.length === 0) {
           setErrSize("*")
             check = false;
        } else {
           setErrSize("")
        }
        if(productDetailInputs.frame.length === 0) {
            setErrFrame("*")
              check = false;
        } else {
            setErrFrame("")
        }
        if(productDetailInputs.shock.length === 0) {
            setErrShock("*")
              check = false;
        } else {
            setErrShock("")
        }
        if(productDetailInputs.rims.length === 0) {
            setErrRims("*")
              check = false;
        } else {
            setErrRims("")
        }
        if(productDetailInputs.tires.length === 0) {
            setErrTires("*")
              check = false;
        } else {
            setErrTires("")
        }
        if(productDetailInputs.handlebar.length === 0) {
            setErrHandlebar("*")
              check = false;
        } else {
            setErrHandlebar("")
        }
        if(productDetailInputs.saddle.length === 0) {
            setErrSaddle("*")
              check = false;
        } else {
            setErrSaddle("")
        }
        if(productDetailInputs.pedals.length === 0) {
            setErrPedals("*")
              check = false;
        } else {
            setErrPedals("")
        }
        if(productDetailInputs.brakes.length === 0) {
            setErrBrakes("*")
              check = false;
        } else {
            setErrBrakes("")
        }
        if(productDetailInputs.weight.length === 0) {
            setErrWeight("*")
              check = false;
        } else {
            setErrWeight("")
        }

        if (check === false) {
            alert("Bạn đang nhập thiếu")
        }
        if (!check) {
            return;
        }
        try{
        const token = sessionStorage.getItem('accessToken');
        if (props.type === "edit") {
            productInputs.productCode = props.data.productCode;
            let update = await updateProduct(productInputs, productDetailInputs, avatar, token)
            console.log(productInputs);
            if (update.data.errCode === 0) {
                alert("Cập nhật sản phẩm thành công!");
            }
            return;
        }
        let submit = await createNewProduct(productInputs, productDetailInputs, avatar, token);
        if (submit.data.errCode === 0) {
            alert("Tạo sản phẩm mới thành công!!")
        }

        }catch(err) {
        console.log(err.response);
        }
    }

  return (
    <>
            <div id="modalNewProduct">
                <div onClick={props.toggleModalAdd} className="overlay"></div>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">New Product</h5>
                        <button type="button" className="close-icon" aria-label='Close' onClick={props.toggleModal}>
                            <span aria-hidden='true'>x</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className="newProduct">
                        <form className="addProductForm">
                            <div className="addProductItem">
                            <label>Image</label>
                            <input type="file"
                            id="file"
                            onChange={handleFileInputChange}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Tên sản phẩm &nbsp;&nbsp;&nbsp;&nbsp; <span className="errNewProduct">{errName}</span></label>
                            <input type="text" 
                            placeholder="Tên sản phẩm"
                            key="productName"
                            name="productName"
                            value={productInputs.productName}
                            onChange={handleOnChangeInputProduct}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Dòng sản phẩm &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errLine}</span></label>
                            <select name="productLine" value={productInputs.productLine} onChange={handleOnChangeInputProduct} id="product-lines">
                                {productLine.map((item) => (
                                    <option value={item.productLine}>{item.productLine}</option>
                                ))}
                            </select>
                            </div>
                            <div className="addProductItem">
                            <label>Giá xuất xưởng &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errPrice}</span></label>
                            <input type="text" 
                            placeholder="Giá xuất xưởng"
                            key="productPrice"
                            name="productPrice"
                            value={productInputs.productPrice}
                            onChange={handleOnChangeInputProduct}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>Thời gian bảo hành &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errWarrantyPeriod}</span></label>
                            <input type="text"
                            placeholder="123" 
                            key="warrantyPeriod"
                                name="warrantyPeriod"
                                value={productInputs.warrantyPeriod}
                                onChange={handleOnChangeInputProduct}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>size &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errSize}</span></label>
                            <input type="text"
                            placeholder="123" 
                            key="size"
                                name="size"
                                value={productDetailInputs.size}
                                onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>frame &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errFrame}</span></label>
                            <input type="text" 
                            placeholder="123" 
                            key="frame"
                            name="frame"
                            value={productDetailInputs.frame}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>shock &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errShock}</span></label>
                            <input type="text"
                            placeholder="123" 
                            key="shock"
                            name="shock"
                            value={productDetailInputs.shock}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>rims &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errRims}</span></label>
                            <input type="text" 
                            placeholder="123" 
                            key="rims"
                            name="rims"
                            value={productDetailInputs.rims}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>tires &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errTires}</span></label>
                            <input type="text" 
                            placeholder="123" 
                            key="tires"
                            name="tires"
                            value={productDetailInputs.tires}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>handlebar &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errHandlebar}</span></label>
                            <input type="text"
                            placeholder="123" 
                            key="handlebar"
                            name="handlebar"
                            value={productDetailInputs.handlebar}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>saddle &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errSaddle}</span></label>
                            <input type="text" 
                            placeholder="123" 
                            key="saddle"
                            name="saddle"
                            value={productDetailInputs.saddle}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>pedals &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="errNewProduct">{errPedals}</span></label>
                            <input type="text"
                            placeholder="123"
                            key="pedals"
                            name="pedals"
                            value={productDetailInputs.pedals}
                            onChange={handleOnChangeInputProductDetail}
                                />
                            </div>
                            <div className="addProductItem">
                            <label>brakes &nbsp;&nbsp;&nbsp;&nbsp; <span className="errNewProduct">{errBrakes}</span></label>
                            
                            <input type="text"
                            placeholder="123" 
                            key="brakes"
                            name="brakes"
                            value={productDetailInputs.brakes}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
                            <label>weight &nbsp;&nbsp;&nbsp;&nbsp; <span className="errNewProduct">{errWeight}</span></label>
                            <input type="text"
                            placeholder="123"
                            key="weight"
                            name="weight"
                            value={productDetailInputs.weight}
                            onChange={handleOnChangeInputProductDetail}
                            />
                            </div>
                            <div className="addProductItem">
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