import "./newProduct.css";
import { useState, useEffect } from "react";
import { convertBase64 } from "../../utils/convertImagetoBase64";
import { createProduct } from "../../services/factoryService";
import { encode, decode } from "base64-arraybuffer";
export default function NewProduct() {
  useEffect(() => {
    
  }, []);
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
    try{
      const token = sessionStorage.getItem('accessToken');
      console.log(productInputs);
      console.log(productDetailInputs);
      console.log(avatar);
      let submit = await createProduct(productInputs, productDetailInputs, avatar, token);
      if (submit.data.errCode === 0) {
        alert("Tạo sản phẩm mới thành công!!")
      }

    }catch(err) {
      console.log(err.response);
    }
  }

  return (
    
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file"
          id="file"
          onChange={handleFileInputChange}
          />
        </div>
        <div className="addProductItem">
          <label>Tên sản phẩm</label>
          <input type="text" 
          placeholder="Tên sản phẩm"
          key="productName"
          name="productName"
          value={productInputs.productName}
          onChange={handleOnChangeInputProduct}
           />
        </div>
        <div className="addProductItem">
          <label>Dòng sản phẩm</label>
          <input type="text" 
          placeholder="Dòng sản phẩm"
          key="productLine"
          name="productLine"
          value={productInputs.productLine}
          onChange={handleOnChangeInputProduct}
           />
        </div>
        <div className="addProductItem">
          <label>Giá xuất xưởng</label>
          <input type="text" 
          placeholder="Giá xuất xưởng"
          key="productPrice"
          name="productPrice"
          value={productInputs.productPrice}
          onChange={handleOnChangeInputProduct}
           />
        </div>
        <div className="addProductItem">
          <label>Thời gian bảo hành</label>
          <input type="text"
           placeholder="123" 
           key="warrantyPeriod"
            name="warrantyPeriod"
            value={productInputs.warrantyPeriod}
            onChange={handleOnChangeInputProduct}
           />
        </div>
        <div className="addProductItem">
          <label>size</label>
          <input type="text"
           placeholder="123" 
           key="size"
            name="size"
            value={productDetailInputs.size}
            onChange={handleOnChangeInputProductDetail}
           />
        </div>
        <div className="addProductItem">
          <label>frame</label>
          <input type="text" 
          placeholder="123" 
          key="frame"
          name="frame"
          value={productDetailInputs.frame}
          onChange={handleOnChangeInputProductDetail}
          />
        </div>
        <div className="addProductItem">
          <label>shock</label>
          <input type="text"
           placeholder="123" 
           key="shock"
           name="shock"
           value={productDetailInputs.shock}
           onChange={handleOnChangeInputProductDetail}
           />
        </div>
        <div className="addProductItem">
          <label>rims</label>
          <input type="text" 
          placeholder="123" 
          key="rims"
          name="rims"
          value={productDetailInputs.rims}
          onChange={handleOnChangeInputProductDetail}
          />
        </div>
        <div className="addProductItem">
          <label>tires</label>
          <input type="text" 
          placeholder="123" 
          key="tires"
          name="tires"
          value={productDetailInputs.tires}
          onChange={handleOnChangeInputProductDetail}
          />
        </div>
        <div className="addProductItem">
          <label>handlebar</label>
          <input type="text"
           placeholder="123" 
           key="handlebar"
           name="handlebar"
           value={productDetailInputs.handlebar}
           onChange={handleOnChangeInputProductDetail}
           />
        </div>
        <div className="addProductItem">
          <label>saddle</label>
          <input type="text" 
          placeholder="123" 
          key="saddle"
          name="saddle"
          value={productDetailInputs.saddle}
          onChange={handleOnChangeInputProductDetail}
          />
        </div>
        <div className="addProductItem">
          <label>pedals</label>
          <input type="text"
           placeholder="123"
           key="pedals"
           name="pedals"
           value={productDetailInputs.pedals}
           onChange={handleOnChangeInputProductDetail}
            />
        </div>
        <div className="addProductItem">
          <label>brakes</label>
          <input type="text"
           placeholder="123" 
           key="brakes"
           name="brakes"
           value={productDetailInputs.brakes}
           onChange={handleOnChangeInputProductDetail}
           />
        </div>
        <div className="addProductItem">
          <label>weight</label>
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
          <select name="status" id="status">
            <option value="Active" onChange={handleOnChangeInputProduct}>Active</option>
            <option value="Inactive" onChange={handleOnChangeInputProduct}>Inactive</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleSubmit} >Create</button>
      </form>
    </div>
  );
}
