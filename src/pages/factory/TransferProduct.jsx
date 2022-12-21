import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getAllProducts, getAllOrders } from "../../services/factoryService";
import { getInfoOrder } from "../../services/orderService";
import TransferProducts from "../../components/modal/TransferProducts";

export default function TransferProduct() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openModalTransfer, setOpenTransfer] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [agent, setAgent] = useState([]);
  const [factory, setFactory] = useState([]);
  const [orderdetail, setOrderdetail] = useState([]);

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllOrders(token);
    let data = res.data.data;
    setData(data);
    setLoading(false);
  }

  async function fetchDataOrder (id) {
    const token = sessionStorage.getItem('accessToken');
    let res = await getInfoOrder(id, token);
    console.log(res.data);
    let data = res.data.data;
    setAgent(res.data.agent);
    setFactory(res.data.factory);
    setDataOrder(data);
    setOrderdetail(res.data.data.orderdetails);
  }

  useEffect(() => {
    if (!loading && data.length === 0) {
      fetchData();
    };
  }, [loading, data])


  const toggleModalTransfer = (id) => {
    fetchDataOrder(id);
    setOpenTransfer(!openModalTransfer);
  }

  const columns = [
    { field: "orderNumber", headerName: "Mã đơn hàng", width: 200 },
    {
      field: "agentCode",
      headerName: "Mã đại lý",
      width: 200,
    },
    {
        field: "orderDate",
        headerName: "Ngày yêu cầu",
        width: 200,
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
            <button className="productListEdit" onClick={() => toggleModalTransfer(params.row.orderNumber)}>View</button>
            <button className="productListEdit" >Sản xuất</button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        {/* <button onClick={toggleModal}>Mở modal</button> */}
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
        Quản lý đơn hàng
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.orderNumber}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
    </Box>
    </div>
    <TransferProducts
      open={openModalTransfer}
      toggleModal={() => setOpenTransfer(!openModalTransfer)}
      data={dataOrder}
      agent={agent}
      factory={factory}
      orderdetail={orderdetail}
    />
    </>
  );
}
