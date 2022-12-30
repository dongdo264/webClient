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
    { 
      field: "id", 
      headerName: "STT", 
      width: 100,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    { 
      field: "model", 
      headerName: "Model", 
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
    },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 160,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "wcCode",
      headerName: "Mã trung tâm",
      width: 168,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
    },
    {
        field: "createAt",
        headerName: "Ngày gửi",
        width: 158,
        headerClassName: 'header-column',
        cellClassName: 'odd-column',
    },
    {
      field: "note",
      headerName: "Ghi chú",
      width: 150,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
  },
    {
      field: "status",
      headerName: "Status",
      width: 114,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
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
        maxWidth: '1000px',
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
