import React from 'react';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useState } from 'react';
export default function User() {
  const [file, setFile] = useState(null);
  const [base64url, setBase64url] = useState("");
  // const getBase64 = file => {
  //   if (!file) {
  //     return setBase64url("");
  //   }
  //     // Make new FileReader
  //     let reader = new FileReader();
  //     // Convert the file to base64 text
  //     reader.readAsDataURL(file);
  //     // on reader load somthing...
  //     reader.onloadend = (e) => {
  //       // Make a fileInfo Object
  //       // console.log("Called", reader);
  //       // baseURL = reader.result;
  //       // console.log(baseURL);
  //       // resolve(baseURL);
  //       let f = reader.result;
  //       setBase64url(f);
  //       console.log(base64url);
  //       document.getElementById('avatarUpload').src = base64url;
  //     };
  // };
  const convertBase64 = (file) => {
    if (!file) {
      return setBase64url("");
    }
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const handleFileInputChange =  async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64url(base64);
    console.log(base64url)
    // file = e.target.files[0];

    // getBase64(file)
    //   .then(result => {
    //     file["base64"] = result;
    //     console.log("File Is", file);
    //     setFile(file);
    //     setBase64url(file.base64);
    //     document.getElementById('avatarUpload').src = base64url;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
   
    // this.setState({
    //   file: e.target.files[0]
    // });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/admin/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Anna Becker</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
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
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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
