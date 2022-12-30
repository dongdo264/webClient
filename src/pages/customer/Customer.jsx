import { useState, useEffect, useRef } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect, useHistory } from "react-router-dom";
import { getAllCustomers } from '../../services/customerService';
import CustomerDetail from '../../components/modal/CustomerDetail';
import CustomerModal from '../../components/modal/CustomerModal';
import { Visibility, Edit } from '@material-ui/icons';

export default function Customer({isLoggedIn}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);


  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllCustomers(token);
    let data = res.data.data;
    for (let i in data) {
      data[i].id = parseInt(i);
      if (data[i].avatar) {
        data[i].img = new Buffer(data[i].avatar, 'base64').toString('binary') 
      } else {
        data[i].img = '';
      }
      if (data[i].customer_products.length !== 0) {
        data[i].quantityBought = data[i].customer_products[0].count;
      } else {
        data[i].quantityBought = 0;
      }
    }
    //console.log(data.customer_products.count);
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

  const toggleOpenCustomerModal = (id) => {
    setInfoCustomer(customers[parseInt(id)]);
    setOpenModalDetail(!openModalDetail)
  }
  const toggleModalEdit = (id) => {
    setInfoCustomer(customers[parseInt(id)]);
    setOpenEdit(!openEdit)
  }
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
    { 
      field: "customerCode", 
      headerName: "ID", 
      width: 90,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "customerName",
      headerName: "Tên khách hàng",
      width: 200,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.customerName}
          </div>
        );
      },
    },
    { 
      field: "dob", 
      headerName: "Ngày sinh", 
      width: 140,
      headerClassName: 'header-column',
      cellClassName: 'odd-column' 
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "phone",
      headerName: "SĐT",
      width: 130,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "action",
      headerName: "Action",
      width: 184,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit view_btn" onClick={() => toggleOpenCustomerModal(params.row.id)}>
              <Visibility className="pdLEdit_icon"/>View
            </button>
            <button className="productListEdit edit_btn" onClick={() => toggleModalEdit(params.row.id)}>
              <Edit className="pdLEdit_icon"/>Edit
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
        maxWidth: '1043px',
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
         <CustomerDetail 
          open={openModalDetail}
          toggleModal={() => setOpenModalDetail(!openModalDetail)}
          info={infoCustomer}
         />
         <CustomerModal 
          open={openEdit}
          toggleModal={() => setOpenEdit(!openEdit)}
          info={infoCustomer}
          type={"edit"}
         />
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
