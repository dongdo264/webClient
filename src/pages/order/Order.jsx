
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getInfoProduct, getAllProducts } from "../../services/userService";
import Modal from "../../components/modal/Modal";
import OrderModal from "../../components/modal/OrderModal";
import ImportModal from "../../components/modal/ImportModal";

export default function Order() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isOpenModal, setOpenModel] = useState(false);
  const [info, setInfo] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [order, setOrder] = useState([]);
  const [displayButton, setDisplay] = useState('none');

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllProducts(token);
    let listUser = res.data.data;
    
    for (let i in listUser) {
      if (listUser[i].avatar) {
        listUser[i].img = new Buffer(listUser[i].avatar, 'base64').toString('binary') 
      } else {
        listUser[i].img = '';
      }
    }
    setData(listUser);
    setLoading(false);
  }
  async function fetchInfoProduct (id) {
    const token = sessionStorage.getItem('accessToken');
    let res = await getInfoProduct(id, token);
    let data = res.data.data;
    data.name = data.product.productName;
    data.productLine = data.product.productLine;
    data.img = '';
    if (data.product.avatar) {
      data.img = new Buffer(data.product.avatar, 'base64').toString('binary') 
    }
    console.log(data);
    setInfo(data);
  }
  useEffect(() => {
    if (order.length !== 0) {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
    if (!loading && data.length === 0) {
      fetchData();
    };
  }, [loading, data, order])

  const toggleModal = (id) => {
    fetchInfoProduct(id);
    setOpenModel(!isOpenModal);
  }

  const toggleModalOrder = (id) => {
    fetchInfoProduct(id);
    setOpenOrder(!openOrder);
  }

  const deleteItem = (item) => {
    let arr = order.filter((e) => {
        return e.productCode !== item.productCode && e.color !== item.color
    })
    setOrder(arr);
  }

  const addNewItem = (item) => {
    let arr = [...order]
    Object.preventExtensions(order[order.length - 1]);
    arr[order.length] = item;
    setOrder(arr);
    setOpenOrder(false);
  }

  const columnOrder = [
    { field: "productCode", headerName: "ID", width: 90 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "color", headerName: "Màu sắc", width: 200 },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={() => deleteItem(params.row)}>Xóa</button>
            <button className="productListEdit" onClick={() => toggleModalOrder(params.row.productCode)}>Sửa</button>
          </>
        );
      },
    },
  ];

  const columns = [
    { field: "productCode", headerName: "ID", width: 90 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "buyPrice", headerName: "Giá xuất xưởng", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      
    },
    {
      field: "warrantyPeriod",
      headerName: "Bảo hành",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={() => toggleModal(params.row.productCode)}>View</button>
            <button className="productListEdit" onClick={() => toggleModalOrder(params.row.productCode)}>Thêm vào đơn</button>
          </>
        );
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
        display: displayButton,
        mb: 20
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
        getRowId={(row) => row.productCode}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
      <button className="newUserButton" onClick={() => setOpenImport(!openImport)}>Tạo đơn hàng</button>
    </Box>
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
        Sản phẩm
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.productCode}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
    </Box>

    
    </div>
    <ImportModal
      open={openImport}
      info={order}
      toggleModal={() => setOpenImport(!openImport)}
    />
    <Modal 
      open={isOpenModal}
      toggleModal={() => setOpenModel(!isOpenModal)}
      info={info}
    />
    <OrderModal 
      open={openOrder}
      toggleModal={() => setOpenOrder(!openOrder)}
      info={info}
      addNewItem={(item) => addNewItem(item)}
    />
    </>
  );
}
