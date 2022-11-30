import "./newUser.css";
import { useState , useEffect} from 'react';
import { createNewUser } from "../../services/adminService";
export default function NewUser({isLoggedIn}) {

  useEffect(() => {
    if(!isLoggedIn) {
      window.location.href = '/';
    }
    
  }, []);
  const initValue = {
    username: '',
    password: '',
    name: '',
    adress: '',
    city: '',
    phone: '',
    option: ''
  }
  const [inputs, setInputs] = useState(initValue);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const createUser = async (event) => {
    
    event.preventDefault();
    try {
      const token = sessionStorage.getItem('accessToken');
      let res = await createNewUser(inputs, token);
      if (res.data.errCode === 0) {
        alert("Tạo user thành công");
        setInputs(initValue);
      }
    } catch(err) {
      console.log(err.response);
    }
    
  }

  return (
    <>
    {isLoggedIn ? (
          <div className="newUser">
          <h1 className="newUserTitle">Cấp tài khoản</h1>
          <form className="newUserForm">
            <div className="newUserItem">
              <label>Username</label>
              <input type="text"
               placeholder="username" 
               key="username"
               name="username"
               value={inputs.username || ''}
               onChange={handleOnChange}
               />
            </div>
            <div className="newUserItem">
              <label>Tên cơ sở</label>
              <input type="text" 
              placeholder="Tên đại lý/nhà máy/trung tâm bảo hành" 
              key="name"
              name="name"
              value={inputs.name}
              onChange={handleOnChange}
              />
            </div>
            {/* <div className="newUserItem">
              <label>Email</label>
              <input type="email" placeholder="john@gmail.com" />
            </div> */}
            <div className="newUserItem">
              <label>Password</label>
              <input type="password"
               placeholder="password" 
               key="password"
               name="password"
               value={inputs.password}
               onChange={handleOnChange}
               />
            </div>
            <div className="newUserItem">
              <label>Số điện thoại</label>
              <input type="text" 
              placeholder="0123456789" 
              key="phone"
              name="phone"
              value={inputs.phone}
              onChange={handleOnChange}
              />
            </div>
            <div className="newUserItem">
              <label>Địa chỉ</label>
              <input type="text" 
              placeholder="Địa chỉ" 
              key="adress"
              name="adress"
              value={inputs.adress}
              onChange={handleOnChange}
              />
            </div>
            <div className="newUserItem">
              <label>Thành phố</label>
              <input type="text" 
              placeholder="Thành phố" 
              key="city"
              name="city"
              value={inputs.city}
              onChange={handleOnChange}
              />
            </div>
            <div className="newUserItem">
              <label>Loại tài khoản</label>
              <div className="newUserGender">
                <input type="radio" 
                name="option" 
                id="male" 
                value="daily" 
                onChange={handleOnChange}
                />
                <label htmlFor="male">Đại lý</label>
                <input type="radio" 
                name="option" 
                id="female" 
                value="cososanxuat" 
                onChange={handleOnChange}
                />
                <label htmlFor="female">Cơ sở sản xuất</label>
                <input type="radio"
                 name="option" id="other"
                  value="baohanh" 
                  onChange={handleOnChange}
                  />
                <label htmlFor="other">Trung tâm bảo hành</label>
              </div>
            </div>
          </form>
          <button className="newUserButton" onClick={createUser} >Create</button>
        </div>
    ) : (
      <>
      </>
    ) }
    </>

  );
}
