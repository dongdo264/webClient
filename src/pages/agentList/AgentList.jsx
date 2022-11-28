import "./agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { ArrowUpwardTwoTone, DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { getAllAgents, deleteAgentById } from "../../services/adminService";
import { useSelector } from "react-redux";

export default function AgentList({isLoggedIn}) {
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchData () {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    let res = await getAllAgents(token);
    let listUser = res.data.data;
    setAgentList(listUser);
    setLoading(false);
  }

  useEffect(() => {
    if(!isLoggedIn) {
      window.location.href = '/';
    }
    if (!loading && agentList.length === 0) {
      fetchData();
    };
}, [loading, agentList]);
  // useEffect( async () => {
  //   let res = await getAllAgents();
  //   let listUser = res.data.data;
  //   console.log(listUser);
  //   setAgentList([...listUser]);
  // }, []);

  
  const handleDelete = async (agentCode) => {
    console.log(agentCode);
    try {
      if (window.confirm("Bạn có chắc muốn xóa đại lý này?")) {
        const token = localStorage.getItem('accessToken');
        let res = await deleteAgentById(agentCode, token);
        if (res.data.errCode === 0) {
          fetchData();
          window.alert("Xóa thành công!!")
        }
      }
    } catch(err) {
      console.log(err.response);
    }
  };
  
  const columns = [
    { field: "agentCode", headerName: "Mã đại lý", width: 130, style: { textAlign: 'center' }},
    { field: "agentName", headerName: "Tên đại lý", width: 170 },
    {
      field: "agentAdress",
      headerName: "Địa chỉ",
      width: 120,
    },
    {
      field: "agentCity",
      headerName: "Tỉnh/thành",
      width: 160,
    },{
      field: "agentPhone",
      headerName: "Số ĐT",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      valueGetter: (params) => {
        return params.getValue(params.row.agentCode, "account").accStatus;
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/agent/" + params.row.agentCode}>
              <button className="userListEdit">Edit</button>
            </Link>
            <button onClick={() => handleDelete(params.row.agentCode)} className="userListEdit">Delete</button>
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.agentCode)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
      <>
      {isLoggedIn ? (
        <div className="userList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Danh sách đại lý</h1>
          <Link to="/admin/newUser">
            <button className="agentAddButton">Create</button>
          </Link>
        </div>
        <DataGrid
          sx={{
            border: 'none' // also tried setting to none 
          }}
          rows={agentList}
          disableSelectionOnClick
          columns={columns}
          getRowId={row => row.agentCode}
          pageSize={5}
          //checkboxSelection
        />
      </div>  
      ) : (
        <>
        </>
      )}
      </>
      
  );
}
