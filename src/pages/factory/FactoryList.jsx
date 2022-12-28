import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect } from "react-router-dom";
import { getAllFactories } from "../../services/userService";
import { deleteUser } from "../../services/adminService";
import { useRef } from "react";

export default function FactoryList({isLoggedIn}) {
  const [factoryList, setFactoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllFactories(token);
    let fList = res.data.data;
    console.log(fList);
    setFactoryList(fList);
    setLoading(false);
  }
  if(!isLoggedIn) {
    window.location.href='/';
  }
  useEffect( () => {
        if (!loading && factoryList.length === 0) {
        fetchData();
        };
        return () => {
          componentMounted.current = false;
        }
    }, [loading, factoryList]);

  
    const handleUpdateActive = async (factoryCode) => {
      try {
        if (window.confirm("Cập nhật hoạt động cơ sở sản xuất này?")) {
          const token = sessionStorage.getItem('accessToken');
          let res = await deleteUser("Active", factoryCode, token);
          if (res.data.errCode === 0) {
            fetchData();
            window.alert("Cập nhật thành công!!")
          }
        }
      } catch(err) {
        console.log(err.response);
      }
    };
    const handleUpdateInActive = async (factoryCode) => {
      try {
        if (window.confirm("Cập nhật ngừng hoạt động cơ sở sản xuất này")) {
          const token = sessionStorage.getItem('accessToken');
          let res = await deleteUser("Inactive", factoryCode, token);
          if (res.data.errCode === 0) {
            fetchData();
            window.alert("Cập nhật thành công!!")
          }
        }
      } catch(err) {
        console.log(err.response);
      }
    };
  
  const columns = [
    { field: "factoryCode", headerName: "Mã nhà máy", width: 150, style: { textAlign: 'center' }},
    { field: "factoryName", headerName: "Tên nhà máy", width: 170 },
    {
      field: "factoryAdress",
      headerName: "Địa chỉ",
      width: 130,
    },
    {
      field: "factoryCity",
      headerName: "Tỉnh/thành",
      width: 160,
    },{
      field: "factoryPhone",
      headerName: "Số ĐT",
      width: 130,
    },{
        field: "status",
        headerName: "Status",
        width: 120,
        valueGetter: (params) => {
          return params.getValue(params.row.factoryCode, "account").status;
        }
    },{
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        if (params.getValue(params.row.factoryCode, "account").status === "Active") {
          return (
            <>
              
              <button className="userListEdit">View</button>
              <button onClick={() => handleUpdateInActive(params.row.factoryCode)} className="userListEdit">Inactive</button>
            </>
          );
        }
        return (
          <>
            
            <button className="userListEdit">View</button>
            <button onClick={() => handleUpdateActive(params.row.factoryCode)} className="userListEdit">Active</button>
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
        Cơ sở sản xuất
      </Typography>
      <DataGrid
        columns={columns}
        rows={factoryList}
        getRowId={row => row.factoryCode}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
         </Box>
  </div>
    ) : (
      <>
       <>
          <Redirect to='/' >
            
          </Redirect>
        </>
      </>
    )}
    </>
    
  );
}
