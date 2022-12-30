import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Box, Typography } from '@mui/material';
import { useRef } from "react";
import { getAllWarrantyActions } from '../../services/warrantyService';
import { getAllWarrantyClaim } from "../../services/agentService";
import WarrantyDetail from "../../components/modal/WarrantyDetail";


export default function HistoryWarranty({isLoggedIn, role}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openWarrantyDetail, setOpenWarrantyDetail] = useState(false);
  const [warranty, setWarranty] = useState([]);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let data_;
    if (role === 3) {
      let res = await getAllWarrantyClaim(token);
      data_ = res.data.data;
    } else if (role === 2) {
      let res = await getAllWarrantyActions(token);
      data_ = res.data.data;
    }
    let res = [];
    for (let i in data_) {
      data_[i].id = parseInt(i);
      if (data_[i].status === "Hoàn tất" || data_[i].status === "Sản phẩm lỗi") {
        res.push(data_[i]);
      }
    }
    setData(res);
    //console.log(res.data.data)
    setLoading(false);
  }
  if(!isLoggedIn) {
    window.location.href='/';
  }

  useEffect(() => {
      if (!loading && data.length === 0) {
        fetchData();
      };
      return () => {
        componentMounted.current = false;
      }
    }, [loading, data]);


//   const handleToggleDetail = (id) => {
//     setWarranty(data[parseInt(id)]);
//     setOpenWarrantyDetail(!openWarrantyDetail)
//   }

  
  const columns = [
    { 
      field: "warrantyCode", 
      headerName: "Mã bảo hành", 
      width: 156,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    { 
      field: "agentCode", 
      headerName: "Đại lý", 
      width: 112,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 160,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "createAt",
      headerName: "Ngày gửi",
      width: 128,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "finishAt",
      headerName: "Ngày hoàn thành",
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
      field: "action",
      headerName: "Action",
      width: 130,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        
        return (
          <>
           <button className="userListEdit" >View</button>
          </>
        );
      },
    },
  ];

  return (
    <>
    {isLoggedIn ? (
      <div className="userList">
    <Box
      sx={{
        height: 400,
        width: '100%',
        maxWidth: '1005px',
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
        Bảo hành
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={row => row.warrantyCode}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
         </Box>
  </div>
    ) : (
      <>
      </>
    )}
    </>
    
  );
}
