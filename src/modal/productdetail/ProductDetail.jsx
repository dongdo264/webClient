
//import "./productDetail.css";
// import "./productDetail.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ProductDetail(props) {

    const toggle = () => {
        props.setToggle();
    }

    return (
        <div style={{ textAlign: "center"}}>
        <Button onClick={toggle}>Open Modal</Button>
        <Modal isOpen={props.isOpenModal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            hello modal
          <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <div className="pImg">
                        <img src={props.info.img} alt="" className="productImg" />
                    </div>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={props.info.img} alt="" className="productInfoImg" />
                        <span className="productName">{props.info.name}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Kích cỡ/Sizes: </span>
                            <span className="productInfoValue">{props.info.size}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Màu sắc/Colors: </span>
                            <span className="productInfoValue">{props.info.color}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Chất liệu khung/Frame: </span>
                            <span className="productInfoValue">{props.info.frame}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Phuộc/Fork: </span>
                            <span className="productInfoValue">{props.info.fork}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Vành xe/Rims: </span>
                            <span className="productInfoValue">{props.info.rim}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Căm/Spokes: </span>
                            <span className="productInfoValue">{props.info.spoke}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Lốp xe/Tires: </span>
                            <span className="productInfoValue">{props.info.tire}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Ghi đông/Handlebar: </span>
                            <span className="productInfoValue">{props.info.handlebar}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </div>
    );
}
