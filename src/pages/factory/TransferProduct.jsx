import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getWarehouse, getAllOrders } from "../../services/factoryService";
import { getInfoOrder } from "../../services/orderService";
import TransferProducts from "../../components/modal/TransferProducts";

export default function TransferProduct() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [openModalTransfer, setOpenTransfer] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [agent, setAgent] = useState([]);
  const [factory, setFactory] = useState([]);
  const [orderdetail, setOrderdetail] = useState([]);
  const [check, setCheck] = useState(true);

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllOrders(token);
    let warehouse_ = await getWarehouse(token);
    setWarehouse(warehouse_.data.data);
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
    let orderdetail_ = res.data.data.orderdetails
    let check_ = true;
    for (let i in orderdetail_) {
      let exist = false;
        for (let j in warehouse) {
          if (warehouse[j].productCode === orderdetail_[i].productCode && warehouse[j].color === orderdetail_[i].color) {
            orderdetail_[i].quantityInStock = warehouse[j].sum;
            if (orderdetail_[i].quantity > warehouse[j].sum) {
              check_ = false;
            }
            exist = true;
            break;
          }
          
        }
        if (!exist) {
          orderdetail_[i].quantityInStock = 0;
          check_ = false;
        }
    }
    setCheck(check_);
    console.log(check_);
    setOrderdetail(orderdetail_);
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
       Đơn hàng
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
      check={check}
    />
    </>
  );
}
