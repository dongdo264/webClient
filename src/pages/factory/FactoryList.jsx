import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect } from "react-router-dom";
import { getAllFactories } from "../../services/adminService";
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

  
  const handleDelete = (factoryCode) => {
    // setData(.filter((item) => item.factoryCode !== factoryCode));
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
        return (
          <>
            <Link to={"/viewprofile/" + params.row.factoryCode}>
              <button className="userListEdit">Edit</button>
            </Link>
            <button onClick={() => handleDelete(params.row.factoryCode)} className="userListEdit">Delete</button>
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
