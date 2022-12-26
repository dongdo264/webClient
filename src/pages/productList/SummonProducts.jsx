import { useState, useEffect, useRef } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect, useHistory } from "react-router-dom";
import { getProductsAreSold } from "../../services/agentService";
import RequestWarranty from '../../components/modal/RequestWarranty';
import ProductSoldDetail from '../../components/modal/ProductSoldDetail';
import UpdateWarrantyDetail from '../../components/modal/UpdateWarrantyDetail';
import { updateStatusProduct } from '../../services/agentService';

export default function SummonProducts({isLoggedIn}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  const [openWarranty, setOpenWarranty] = useState(false);
  const [openProductDetail, setOpenProduct] = useState(false);
  const [product, setProduct] = useState([]);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getProductsAreSold(token);
    let data_ = res.data.data;
    let arr = data_.filter((e) => {
        return e.status === "Triệu hồi" || e.status === "Đã liên hệ triệu hồi" || e.status === "Đã nhận lại sản phẩm"
    })
    for (let i in arr) {
        arr[i].id = parseInt(i) + 1;
    }
    
    setData(arr);
    setLoading(false);
  }
  // if(!isLoggedIn) {
  //   window.location.href = '/';
  // }

  useEffect( () => {
    if (!loading && data.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, data]);



  const handleOpenModal = (id) => {
    setProduct(data[parseInt(id) - 1]);
    setOpenWarranty(!openWarranty)
  }
  const handleOpenModalProduct = (id) => {
    setProduct(data[parseInt(id) - 1]);
    setOpenProduct(!openProductDetail)
  }
  const handleOpenModalUpdate = (id) => {
    setProduct(data[parseInt(id) - 1]);
    if (data[parseInt(id) - 1].status === 'Đã nhận lại sản phẩm') {
        setOpenWarranty(!openWarranty)
    } else {
        setOpenModalUpdate(!openModalUpdate)
    }
  }

  const columns = [
    { field: "model", headerName: "Model", width: 100},
    {
      field: "customerName",
      headerName: "Tên KH",
      width: 150,
      valueGetter: (params) => {
        return params.getValue(params.row.model, "customer").customerName;
      }
    },
    {
      field: "phone",
      headerName: "Số ĐT",
      width: 120,
      valueGetter: (params) => {
        return params.getValue(params.row.model, "customer").phone;
      }
    },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 130,
      valueGetter: (params) => {
        return params.getValue(params.row.model, "agentwarehouse").productCode;
      }
    },
    
    {
      field: "dateOfPurchase",
      headerName: "Ngày mua hàng",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        
          return (
            <>
              <button className="userListEdit" onClick={() => handleOpenModalProduct(params.row.id)} >View</button>
              <button className="userListEdit" onClick={() => handleOpenModalUpdate(params.row.id)} >Edit</button>
            </>
          );
     }
    }
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
        Sản phẩm triệu hồi
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={row => row.model}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
        </Box>
        <RequestWarranty 
            open={openWarranty}
            toggleModal={() => setOpenWarranty(!openWarranty)}
            data={product}
            fetchData={fetchData}
        />
        <ProductSoldDetail 
          open={openProductDetail}
          toggleModal={() => setOpenProduct(!openProductDetail)}
          info={product}
        />
        <UpdateWarrantyDetail 
            open={openModalUpdate}
            toggleModal={() => setOpenModalUpdate(!openModalUpdate)}
            data={product}
            fetchData={() => fetchData()}
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
