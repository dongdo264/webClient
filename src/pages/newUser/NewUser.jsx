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
  const [errUserName, setErrUserName] = useState('');
  const [errPassWord, setErrPassWord] = useState('');
  const [errName, setErrName] = useState('');
  const [errAdress, setErrAdress] = useState('');
  const [errCity, setErrCity] = useState('');
  const [errPhone, setErrPhone] = useState('');
  const [errOption, setErrOption] = useState('');

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const createUser = async (event) => {
    
    event.preventDefault();
    try {
      const token = sessionStorage.getItem('accessToken');
      let check = true;

    if(inputs.username.length < 5) {
      setErrUserName("Tên tài khoản ít nhất 5 kí tự")
      check = false;
    } else {
      setErrUserName("")
    }

    if(inputs.password.length < 6) {
      setErrPassWord("Mật khẩu ít nhất 6 kí tự")
      check = false;
    } else {
      setErrPassWord("")
    }

    if(inputs.adress.length === 0) {
      setErrAdress("Địa chỉ không hợp lệ")
      check = false;
    }else {
      setErrAdress("")
    }

    if (inputs.phone.length < 10) {
      setErrPhone("Số điện thoại không hợp lệ")
    } else {
      setErrPhone("")
    }

    if (inputs.name.length === 0) {
      setErrName("Tên cơ sở không hợp lệ")
      check = false;
    } else {
      setErrName("")
    }

    if (inputs.city.length === 0) {
      setErrCity("Thành phố không tồn tại")
      check = false;
    } else {
      setErrCity("")
    }
    if(!inputs.option) {
      setErrOption("Bạn chưa chọn loại tài khoản")
      check = false;
    } else {
      setErrOption("")
    }
    if(!check) {
      return
    }
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
              <label>Username &nbsp;&nbsp;&nbsp;&nbsp;<span className="errCustomer">{errUserName}</span></label> 
              <input type="text"
               placeholder="username" 
               key="username"
               name="username"
               value={inputs.username || ''}
               onChange={handleOnChange}
               />
            </div>
            <div className="newUserItem">
              <label>Tên cơ sở &nbsp;&nbsp;&nbsp;&nbsp;<span className="errCustomer">{errName}</span></label> 
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
              <label>Password &nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errPassWord}</span></label>
              <input type="password"
               placeholder="password" 
               key="password"
               name="password"
               value={inputs.password}
               onChange={handleOnChange}
               />
            </div>
            <div className="newUserItem">
              <label>Số điện thoại &nbsp;&nbsp;&nbsp;&nbsp;<span className="errCustomer">{errPhone}</span></label>
              <input type="text" 
              placeholder="0123456789" 
              key="phone"
              name="phone"
              value={inputs.phone}
              onChange={handleOnChange}
              />
            </div>
            <div className="newUserItem">
              <label>Địa chỉ &nbsp;&nbsp;&nbsp;&nbsp;<span className="errCustomer">{errAdress}</span></label>
              <input type="text" 
              placeholder="Địa chỉ" 
              key="adress"
              name="adress"
              value={inputs.adress}
              onChange={handleOnChange}
              />
            </div>
            <div className="newUserItem">
              <label>Thành phố &nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errCity}</span></label>
              <input type="text" 
              placeholder="Thành phố" 
              key="city"
              name="city"
              value={inputs.city}
              onChange={handleOnChange}
              />
            </div>
            <div className="newUserItem">
              <label>Loại tài khoản &nbsp;&nbsp;&nbsp;&nbsp; <span className="errCustomer">{errOption}</span></label>
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
                 name="option" 
                 id="other"
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
