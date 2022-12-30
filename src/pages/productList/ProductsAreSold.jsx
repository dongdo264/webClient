import { useState, useEffect, useRef } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { Link, Redirect, useHistory } from "react-router-dom";
import { getProductsAreSold } from "../../services/agentService";
import RequestWarranty from '../../components/modal/RequestWarranty';
import ProductSoldDetail from '../../components/modal/ProductSoldDetail';

export default function ProductsAreSold({isLoggedIn}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  const [openWarranty, setOpenWarranty] = useState(false);
  const [openProductDetail, setOpenProduct] = useState(false);
  const [product, setProduct] = useState([]);
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getProductsAreSold(token);
    let data_ = res.data.data;
    const warranty = res.data.warranty;
    for (let i in data_) {
        data_[i].id = parseInt(i) + 1;
        let end = new Date(data_[i].dateOfPurchase);
        let month = warranty[i].warrantyPeriod.split(" ")[0];
        end.setMonth(end.getMonth() + parseInt(month));
        data_[i].end = end.toISOString().slice(0, 10);
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
  const handleOpenModalProduct = (id) => {
    setProduct(data[parseInt(id) - 1]);
    setOpenProduct(!openProductDetail)
  }

  const columns = [
    { 
      field: "model", 
      headerName: "Model", 
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "customerName",
      headerName: "Tên KH",
      width: 134,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
      valueGetter: (params) => {
        return params.getValue(params.row.model, "customer").customerName;
      }
    },
    {
      field: "phone",
      headerName: "Số ĐT",
      width: 112,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
      valueGetter: (params) => {
        return params.getValue(params.row.model, "customer").phone;
      }
    },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 156,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
      valueGetter: (params) => {
        return params.getValue(params.row.model, "agentwarehouse").productCode;
      }
    },
    
    {
      field: "dateOfPurchase",
      headerName: "Ngày mua hàng",
      width: 172,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
    },
    {
      field: "action",
      headerName: "Action",
      width: 158,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        if (params.row.status !== 'Active') {
          return (
            <>
              <button className="userListEdit" onClick={() => handleOpenModalProduct(params.row.id)} >View</button>
            </>
          );
        }
        return (
          <>
            <button className="userListEdit" onClick={() => handleOpenModalProduct(params.row.id)} >View</button>
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
        maxWidth: '992px',
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
            fetchData={fetchData}
        />
        <ProductSoldDetail 
          open={openProductDetail}
          toggleModal={() => setOpenProduct(!openProductDetail)}
          info={product}
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
