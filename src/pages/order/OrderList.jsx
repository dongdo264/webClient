import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getAllOrder } from "../../services/orderService";
import { getProfileUser } from "../../services/userService";
import OrderDetail from "../../components/modal/OrderDetail";

export default function OrderList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [infoOrder, setInfoOrder] = useState([]);
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllOrder(token);
    let data = res.data.data;
    for (let i in data) {
        data[i].id = parseInt(i) + 1;
    }
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!loading && data.length === 0) {
      fetchData();
    };
  }, [loading, data])


  const handleOpenModal = (id) => {
    const selected = data[parseInt(id) - 1];
    console.log(selected.orderdetails)
    setInfoOrder(selected);
    setOpenModal(!openModal);
  }

  const columns = [
    { field: "id", headerName: "STT", width: 130 },
    { field: "orderNumber", headerName: "Mã đơn hàng", width: 200 },
    {
      field: "factoryCode",
      headerName: "Mã nhà máy",
      width: 180,
    },
    {
        field: "orderDate",
        headerName: "Ngày yêu cầu",
        width: 180,
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
            <button className="productListEdit" onClick={() => handleOpenModal(params.row.id)}>View</button>
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
        height: 400,
        width: '100%',
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
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
    </Box>
    </div>
    <OrderDetail 
        open={openModal}
        toggleModal={() => setOpenModal(!openModal)}
        data={infoOrder}
        info={infoOrder.orderdetails}
        // agent={agent}
        // factory={factory}
    />
    </>
  );
}
