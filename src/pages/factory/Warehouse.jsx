import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getWarehouse } from "../../services/factoryService";

export default function Warehouse() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getWarehouse(token);
    let data = res.data.data;
    for (let i in data) {
        data[i].id = parseInt(i) + 1;
    }
    console.log(data);
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "productCode", headerName: "Mã sản phẩm", width: 200 },
    {
      field: "color",
      headerName: "Màu sắc",
      width: 200,
    },
    {
        field: "sum",
        headerName: "Số lượng trong kho",
        width: 220,
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
            <button className="productListEdit" >View</button>
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
    </>
  );
}