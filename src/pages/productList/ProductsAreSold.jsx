import { useState, useEffect, useRef } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect, useHistory } from "react-router-dom";
import { getProductsAreSold } from "../../services/agentService";
import RequestWarranty from '../../components/modal/RequestWarranty';

export default function ProductsAreSold({isLoggedIn}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  const [openWarranty, setOpenWarranty] = useState(false);
  const [product, setProduct] = useState([]);
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getProductsAreSold(token);
    let data_ = res.data.data;
    for (let i in data_) {
        data_[i].id = parseInt(i) + 1;
        console.log(data_[i])
    }
    setData(data_);
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

  const columns = [
    { field: "model", headerName: "Model", width: 130},
    { field: "customerCode", headerName: "Mã khách hàng", width: 170 },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 120,
      valueGetter: (params) => {
        return params.getValue(params.row.model, "agentwarehouse").productCode;
      }
    },
    {
        field: "color",
        headerName: "Màu sắc",
        width: 120,
        valueGetter: (params) => {
          return params.getValue(params.row.model, "agentwarehouse").color;
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
            <button className="userListEdit">View</button>
            <button className="userListEdit" onClick={() => handleOpenModal(params.row.id)} >Bảo hành</button>
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
        Sản phẩm đã bán
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
