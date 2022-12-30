import "./agentList.css";
import { useState, useEffect, useRef } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect, useHistory } from "react-router-dom";
import { deleteUser } from "../../services/adminService";
import { getAllAgents } from "../../services/userService";
import { Visibility, Block, CheckCircle } from "@material-ui/icons";

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

  const handleUpdateActive = async (agentCode) => {
    try {
      if (window.confirm("Cập nhật hoạt động đại lý này")) {
        const token = sessionStorage.getItem('accessToken');
        let res = await deleteUser("Active", agentCode, token);
        if (res.data.errCode === 0) {
          fetchData();
          window.alert("Cập nhật thành công!!")
        }
      }
    } catch(err) {
      console.log(err.response);
    }
  };
  const handleUpdateInActive = async (agentCode) => {
    try {
      if (window.confirm("Cập nhật ngừng hoạt động đại lý này")) {
        const token = sessionStorage.getItem('accessToken');
        let res = await deleteUser("Inactive", agentCode, token);
        if (res.data.errCode === 0) {
          fetchData();
          window.alert("Cập nhật thành công!!")
        }
      }
    } catch(err) {
      console.log(err.response);
    }
  };

  // const handleDelete = async (agentCode) => {
  //   console.log(agentCode);
  //   try {
  //     if (window.confirm("Bạn có chắc muốn xóa đại lý này?")) {
  //       const token = sessionStorage.getItem('accessToken');
  //       let res = await deleteUser(agentCode, token);
  //       if (res.data.errCode === 0) {
  //         fetchData();
  //         window.alert("Xóa thành công!!")
  //       }
  //     }
  //   } catch(err) {
  //     console.log(err.response);
  //   }
  // };
  
  const columns = [
    { field: "agentCode", 
      headerName: "Mã đại lý", 
      width: 130, 
      style: { textAlign: 'center' },
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    { field: "agentName", 
      headerName: "Tên đại lý", 
      width: 170,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "agentAdress",
      headerName: "Địa chỉ",
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "agentCity",
      headerName: "Tỉnh/thành",
      width: 160,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },{
      field: "agentPhone",
      headerName: "Số ĐT",
      width: 160,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
      valueGetter: (params) => {
        return params.getValue(params.row.agentCode, "account").status;
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 210,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        if (params.getValue(params.row.agentCode, "account").status === "Active") {
          return (
            <>
              <button className="userListEdit view_btn">
                <Visibility className="userEdit_icon"/>View
              </button>
              <button onClick={() => handleUpdateInActive(params.row.agentCode)} className="userListEdit inactive_btn">
                <Block className="userEdit_icon"/>Inactive
              </button>
            </>
          );
        }
        return (
          <>
            <button className="userListEdit view_btn">
                <Visibility className="userEdit_icon"/>View
            </button>
            <button onClick={() => handleUpdateActive(params.row.agentCode)} className="userListEdit active_btn">
              <CheckCircle className="userEdit_icon"/> Active
            </button>
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
        maxWidth: '1087px',
        '& .header-column': {
          backgroundColor: '#07a6f9a6',
        },
        '& .odd-column': {
          backgroundColor: '#e8ebf8',
        },
        '& .even-column': {
          backgroundColor: '#fff',
        },
        '& .final-column': {
          backgroundColor: "#fffbc2",
        },
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
