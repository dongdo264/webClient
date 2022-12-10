import "./agentList.css";
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect, useHistory } from "react-router-dom";
import { getAllAgents, deleteAgentById } from "../../services/adminService";

export default function AgentList({isLoggedIn}) {
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllAgents(token);
    let listUser = res.data.data;
    setAgentList(listUser);
    setLoading(false);
  }
  // if(!isLoggedIn) {
  //   window.location.href = '/';
  // }

  useEffect( () => {
    if (!loading && agentList.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, agentList]);

  const handleDelete = async (agentCode) => {
    console.log(agentCode);
    try {
      if (window.confirm("Bạn có chắc muốn xóa đại lý này?")) {
        const token = sessionStorage.getItem('accessToken');
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
      width: 120,
      valueGetter: (params) => {
        return params.getValue(params.row.agentCode, "account").status;
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/viewprofile/" + params.row.agentCode}>
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
        <Box
      sx={{
        height: 400,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Đại lý phân phối
      </Typography>
      <DataGrid
        columns={columns}
        rows={agentList}
        getRowId={row => row.agentCode}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
         </Box>
      </div>  
      ) : (
        <>
          <Redirect to='/' >

          </Redirect>
        </>
      )}
      </>
      
  );
}
