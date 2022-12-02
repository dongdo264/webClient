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


export default function User({isLoggedIn}) {
  const { id } = useParams();
  const initValue = {
    name: '',
    adress: '',
    city: '',
    phone: '',
    id: '',
    avatar: '',
    email: 'N/A'
  }
  const [base64url, setBase64url] = useState("");
  const [inputs, setInputs] = useState(initValue);
  const [role, setRole] = useState("");
  //const [searchParams, setSearchParams] = useSearchParams();
  async function fetchData () {
    const token = sessionStorage.getItem('accessToken');
    //console.log(id);
    let res = await getProfileUser(id, token);
    //console.log(res.data);
    let infoUser = res.data.infoUser;
    setInputs(infoUser);
    console.log(inputs);
    setRole(res.data.role);
    console.log(role);
  }
  useEffect( () => {
    fetchData();
  }, []);
  // const convertBase64 = (file) => {
  //   if (!file) {
  //     return setBase64url("");
  //   }
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };


  const handleFileInputChange =  async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    document.getElementById('avatarUpload').src = base64;
    setBase64url(base64);
    console.log(base64url)
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
              src={base64url}
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
              <span className="userShowInfoTitle">{inputs.adress}</span>
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
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  id='avatarUpload'
                  src={base64url}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon"/>
                </label>
                <input type="file" id="file" accept="image/*" style={{display: "none"}} onChange={handleFileInputChange}/>
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
