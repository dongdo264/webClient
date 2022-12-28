import React from 'react';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./user.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileUser } from '../../services/userService';
import { convertBase64 } from '../../utils/convertImagetoBase64';
import { updateUser } from '../../services/userService';


export default function User({isLoggedIn}) {
  const { id } = useParams();
  const initValue = {
    name: '',
    address: '',
    city: '',
    phone: '',
    id: '',
    avatar: '',
    email: 'N/A',
    img: ''
  }
  const [avatar, setAvatar] = useState("");
  const [inputs, setInputs] = useState(initValue);
  const [role, setRole] = useState("");
  async function fetchData () {
    const token = sessionStorage.getItem('accessToken');
    let res = await getProfileUser(id, token);
    let data = res.data.infoUser;
    data.img = '';
    if (data.avatar) {
      data.img = new Buffer(data.avatar, 'base64').toString('binary') 
    }
    setInputs(data);
    setAvatar(data.img);
    setRole(res.data.role);
  }
  useEffect( () => {
    fetchData();
  }, []);


  const handleOnChangeInput = event => {
    const { name, value } = event.target;       
    setInputs({ ...inputs, [name]: value });
};

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem('accessToken');
      let update = await updateUser(id, inputs, avatar, token);
      if (update.data.errCode === 0) {
        alert("Cập nhật user thành công!");
        fetchData();
      }

    }catch(err) {

    }
  }

  const handleFileInputChange =  async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setAvatar(base64);
    console.log(base64)
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Thông tin tài khoản</h1>
        {/* <Link to="/admin/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={inputs.img}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{inputs.name}</span>
              <span className="userShowUserTitle">{role}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{inputs.name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{inputs.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{inputs.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{inputs.address}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{inputs.city}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên người dùng</label>
                <input
                  type="text"
                  placeholder="Tên đại lý/cơ sở sản xuất/trung tâm bảo hành"
                  className="userUpdateInput"
                  name='name'
                  key="name"
                  value={inputs.name}
                  onChange={handleOnChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  className="userUpdateInput"
                  name='address'
                  key="address"
                  value={inputs.address}
                  onChange={handleOnChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Thành phố</label>
                <input
                  type="text"
                  placeholder="Thành phố"
                  className="userUpdateInput"
                  name='city'
                  key="city"
                  onChange={handleOnChangeInput}
                  value={inputs.city}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="userUpdateInput"
                  name='phone'
                  key="phone"
                  value={inputs.phone}
                  onChange={handleOnChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="userUpdateInput"
                  name='email'
                  key="email"
                  value={inputs.email}
                  onChange={handleOnChangeInput}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  id='avatarUpload'
                  
                  src={avatar}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon"/>
                </label>
                <input type="file" id="file" accept="image/*" name='avatar' key="avatar" style={{display: "none"}} onChange={handleFileInputChange}/>
              </div>
              <button className="userUpdateButton" onClick={handleSubmit} >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
