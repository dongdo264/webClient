import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getAllFaultyProducts } from "../../services/factoryService";

export default function FaultyProduct() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllFaultyProducts(token);
    let data_ = res.data.data;
    for (let i in data_) {
      data_[i].id = parseInt(i) + 1;
    }
    console.log(data_)
    setData(data_);
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
    { field: "id", headerName: "STT", width: 110 },
    { field: "model", headerName: "Model", width: 110 },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 160,
    },
    {
      field: "wcCode",
      headerName: "Mã trung tâm",
      width: 150,
    },
    {
        field: "createAt",
        headerName: "Ngày gửi",
        width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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
        Sản phẩm lỗi
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.errCode}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
    </Box>
    </div>
    </>
  );
}
