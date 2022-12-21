import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getAllProducts, getAllActions } from "../../services/factoryService";

export default function ProductionTable() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllActions(token);
    let data = res.data.data;
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!loading && data.length === 0) {
      fetchData();
    };
  }, [loading, data])


//   const toggleModalProduction = (id) => {
//     setOpenProduction(!openProduction);
//   }

  const columns = [
    { field: "batchCode", headerName: "Mã lô", width: 120 },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 160,
    },
    {
      field: "color",
      headerName: "Màu sắc",
      width: 130,
    },
    {
        field: "quantityInStock",
        headerName: "Số lượng",
        width: 130,
    },
    { field: "MFG", headerName: "Ngày sản xuất", width: 160 },
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
            <button className="productListEdit" >View</button>
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
        Quản lý hoạt động
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
    </>
  );
}
