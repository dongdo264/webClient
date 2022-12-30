import "../productList/productList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef, useSelector } from "react";
import { getAllProductsImported } from "../../services/agentService";
import { backToFactory } from "../../services/agentService";
import { KeyboardReturn } from "@material-ui/icons";

export default function HistoryImported() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataBack, setDataBack] = useState([]);
  //   const [warehouse, setWarehouse] = useState([]);
  //   const [openModalTransfer, setOpenTransfer] = useState(false);
  //   const [dataOrder, setDataOrder] = useState([]);
  //   const [agent, setAgent] = useState([]);
  //   const [factory, setFactory] = useState([]);
  //   const [orderdetail, setOrderdetail] = useState([]);
  //   const [check, setCheck] = useState(true);

  async function fetchData() {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllProductsImported(token);
    let data = res.data.data;
    for (let i in data) {
      data[i].id = parseInt(i);
    }
    setData(data);
    setLoading(false);
  }
  useEffect(() => {
    if (!loading && data.length === 0) {
      fetchData();
    };
  }, [loading, data])


  const handleSubmit = async (event, id) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem('accessToken');
      if (window.confirm("Chuyển lại sản phẩm ế về cơ sở sản xuất")) {
        let submit = await backToFactory(data[parseInt(id)], token);
        if (submit.data.errCode === 0) {
          alert("Đã chuyển lại sản phẩm về cơ sở sản xuất!");
          fetchData();
        }
      }
    } catch (err) {

    }
  }

  const columns = [
    {
      field: "batchCode",
      headerName: "Mã lô hàng",
      width: 142,
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
      field: "quantityImported",
      headerName: "Số lượng nhập",
      width: 164,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "quantitySold",
      headerName: "Đã bán",
      width: 118,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "createAt",
      headerName: "Ngày nhập",
      width: 140,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "action",
      headerName: "Action",
      width: 176,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        if (params.row.quantityImported > params.row.quantitySold) {
          return (
            <>
              <button className="productListEdit return_btn" onClick={(event) => handleSubmit(event, params.row.id)}>
                <KeyboardReturn className="pdLEdit_icon"/> Chuyển về nhà máy
              </button>
            </>
          );
        }
        return (
          <>

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
            maxWidth: '915px',
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
            Lịch sử nhập kho
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
