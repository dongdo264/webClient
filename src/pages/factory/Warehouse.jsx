import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getWarehouse } from "../../services/factoryService";
import { getAgentWarehouse } from "../../services/agentService";
import ChooseQuantity from "../../components/modal/ChooseQuantity";
import CustomerModal from "../../components/modal/CustomerModal";
import ChooseCustomer from "../../components/modal/ChooseCustomer";

export default function Warehouse(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [displayOrder, setDisplayOrder] = useState('none');
  const [order, setOrder] = useState([]);
  const [openModalQuantity, setOpenModalQuantity] = useState(false);
  const [infoAdd, setInfoAdd] = useState([]);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [openChoose, setOpenChoose] = useState(false);
  const componentMounted = useRef(true)

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res;
    if (props.role === 1) {
      res = await getWarehouse(token);
    } else if (props.role === 3) {
      res = await getAgentWarehouse(token);
    }
    let data_ = res.data.data;
    for (let i in data_) {
        data_[i].id = parseInt(i) + 1;
    }
    setData(data_);
    setLoading(false);
  }

  useEffect(() => {
    if (order.length !== 0) {
      setDisplayOrder('block');
    } else {
      setDisplayOrder('none');
    }
  }, [order])
  useEffect(() => {
    
    if (!loading && data.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, data])


  const toggleModal = (id) => {
    setInfoAdd(data[parseInt(id)])
    setOpenModalQuantity(!openModalQuantity);
  }

  const addNewItem = (item) => {
    let arr = [...order]
    Object.preventExtensions(order[order.length - 1]);
    arr[order.length] = item;
    setOrder(arr);
    setOpenModalQuantity(false);
  }

  const deleteItem = (item) => {
    let arr = order.filter((e) => {
        return e.productCode !== item.productCode && e.color !== item.color
    })
    setOrder(arr);
  }

  const columnOrder = [
    { 
      field: "id", 
      headerName: "STT", 
      width: 100,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    { 
      field: "productCode", 
      headerName: "Mã sản phẩm", 
      width: 160,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    { 
      field: "productName", 
      headerName: "Tên sản phẩm", 
      width: 180,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "color",
      headerName: "Màu sắc",
      width: 150,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
        field: "quantity",
        headerName: "Số lượng đặt hàng",
        width: 220,
        headerClassName: 'header-column',
        cellClassName: 'odd-column'
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
      
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={() => deleteItem(params.row)} >Xóa</button>
            <button className="productListEdit" >Sửa</button>
          </>
        );
      },
    },
  ];

  const columns = [
    { 
      field: "id", 
      headerName: "STT", 
      width: 100,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    { 
      field: "productCode", 
      headerName: "Mã sản phẩm", 
      width: 160,
      headerClassName: 'header-column',
      cellClassName: 'even-column' 
    },
    { 
      field: "productName", 
      headerName: "Tên sản phẩm", 
      width: 180,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "color",
      headerName: "Màu sắc",
      width: 150,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
        field: "sum",
        headerName: "Số lượng trong kho",
        width: 220,
        headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
      
    // },
    {
      field: "action",
      headerName: "Action",
      width: 116,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        if (props.role === 1) {
          return (
            <>
              <button className="productListEdit">View</button>
            </>
          );
        } else if (params.row.sum > 0) {
          return (
            <>
              <button className="productListEdit" onClick={() => toggleModal(params.row.id - 1)}>Thêm vào đơn</button>
            </>
          );
        }
        
      },
    },
  ];

  return (
    <>
      <div className="productList">
      <Box
      sx={{
        height: 300,
        width: '100%',
        display: displayOrder,
        mb: 20,
        maxWidth: '976px',
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
        Đơn hàng
      </Typography>
      <DataGrid
        columns={columnOrder}
        rows={order}
        getRowId={(row) => row.id}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
      <button className="newUserButton" onClick={() => setOpenCustomerModal(!openCustomerModal)}>Tạo đơn hàng</button>
      <button className="newUserButton" onClick={() => setOpenChoose(!openChoose)}>Khách hàng cũ</button>
    </Box>
      <Box
      sx={{
        height: 400,
        width: '100%',
        maxWidth: '942px',
        mb: 10,
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
        Kho hàng
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
    </Box>
    </div>
      <ChooseQuantity 
        open={openModalQuantity}
        toggleModal={() => setOpenModalQuantity(!openModalQuantity)}
        info={infoAdd}
        addNewItem={(item) => addNewItem(item)}
      />
      <CustomerModal 
        open={openCustomerModal}
        toggleModal={() => setOpenCustomerModal(!openCustomerModal)}
        data={order}
      />
      <ChooseCustomer 
        open={openChoose}
        toggleModal={() => setOpenChoose(!openChoose)}
        data={order}
      />
    </>
  );
}
