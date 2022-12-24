import { useState, useEffect, useRef } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect, useHistory } from "react-router-dom";
import { getAllCustomers } from '../../services/agentService';

export default function Customer({isLoggedIn}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllCustomers(token);
    let data = res.data.data;
    console.log(data);
    for (let i in data) {
      if (data[i].avatar) {
        data[i].img = new Buffer(data[i].avatar, 'base64').toString('binary') 
      } else {
        data[i].img = '';
      }
    }
    setCustomers(data);
    setLoading(false);
  }
  // if(!isLoggedIn) {
  //   window.location.href = '/';
  // }

  useEffect( () => {
    if (!loading && customers.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, customers]);

  // const handleDelete = async (agentCode) => {
  //   console.log(agentCode);
  //   try {
  //     if (window.confirm("Bạn có chắc muốn xóa đại lý này?")) {
  //       const token = sessionStorage.getItem('accessToken');
  //       let res = await deleteAgentById(agentCode, token);
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
    { field: "customerCode", headerName: "ID", width: 90 },
    {
      field: "customerName",
      headerName: "Tên khách hàng",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.customerName}
          </div>
        );
      },
    },
    { field: "dob", headerName: "Ngày sinh", width: 140 },
    {
      field: "adress",
      headerName: "Địa chỉ",
      width: 120,
      
    },
    {
      field: "phone",
      headerName: "SĐT",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" >View</button>
            <button className="productListEdit" >Sản xuất</button>
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
        Khách hàng
      </Typography>
      <DataGrid
        columns={columns}
        rows={customers}
        getRowId={row => row.customerCode}
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
