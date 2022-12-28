
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getInfoProduct, getAllProducts } from "../../services/userService";
import Modal from "../../components/modal/Modal";
import OrderModal from "../../components/modal/OrderModal";
import ImportModal from "../../components/modal/ImportModal";
import { updateStatusProduct } from "../../services/agentService";

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
      listUser[i].id = parseInt(i);
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
    data.name = data.productName;
    data.productLine = data.productLine;
    data.img = '';
    if (data.avatar) {
      data.img = new Buffer(data.avatar, 'base64').toString('binary') 
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
    if (arr.length !== 0) {
      for (let i in arr) {
        arr[i].id = parseInt(i) + 1;
      }
    }
    setOrder(arr);
    setOpenOrder(false);
  }

  const confirmSummon = async (id) => {
    if (window.confirm(`Triệu hồi tất cả sản phẩm mã ${data[parseInt(id)].productCode} từ khách hàng?`)) {
      try{
        const token = sessionStorage.getItem('accessToken');
        let update = await updateStatusProduct(data[parseInt(id)].productCode, "Triệu hồi", token)
        if (update.data.errCode === 0) {
          alert("Đã thêm vào danh sách triệu hồi!");
        }
      }catch(err) {

      }
      
    }
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
      width: 156,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 230,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { 
      field: "color", 
      headerName: "Màu sắc", 
      width: 124,
      headerClassName: 'header-column',
      cellClassName: 'even-column' 
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 130,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "action",
      headerName: "Action",
      width: 124,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
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
    
    { 
      field: "productCode", 
      headerName: "ID", 
      width: 90,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 200,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { 
      field: "productLine", 
      headerName: "Dòng sản phẩm", 
      width: 180,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "warrantyPeriod",
      headerName: "Bảo hành",
      width: 140,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "action",
      headerName: "Action",
      width: 240,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={() => toggleModal(params.row.productCode)}>View</button>
            <button className="productListEdit" onClick={() => toggleModalOrder(params.row.productCode)}>Thêm</button>
            <button className="productListEdit" onClick={() => confirmSummon(params.row.id)} >Triệu hồi</button>
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
        mb: 20,
        maxWidth: '882px',
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
      <button className="newUserButton" onClick={() => setOpenImport(!openImport)}>Tạo đơn hàng</button>
    </Box>
      <Box
      sx={{
        height: 400,
        width: '100%',
        maxWidth: '988px',
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
