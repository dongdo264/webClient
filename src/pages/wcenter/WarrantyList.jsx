import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Box, Typography } from '@mui/material';
import { useRef } from "react";
import { getAllWarrantyActions } from '../../services/warrantyService';
import { getAllWarrantyClaim } from "../../services/agentService";
import WarrantyDetail from "../../components/modal/WarrantyDetail";


export default function WarrantyList({isLoggedIn, role}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openWarrantyDetail, setOpenWarrantyDetail] = useState(false);
  const [warranty, setWarranty] = useState([]);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res;
    if (role === 3) {
      res = await getAllWarrantyClaim(token);
    } else if (role === 2) {
      res = await getAllWarrantyActions(token);
    }
    let data_ = res.data.data;
    for (let i in data_) {
      data_[i].id = parseInt(i);
      if (!data_[i].finishAt) {
        data_[i].finishAt = "N/A";
      }
    }
    setData(data_);
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

  
  const handleDelete = (wcCode) => {
    // setData(.filter((item) => item.wcCode !== wcCode));
  };

  const handleToggleDetail = (id) => {
    setWarranty(data[parseInt(id)]);
    setOpenWarrantyDetail(!openWarrantyDetail)
  }

  
  const columns = [
    { field: "warrantyCode", headerName: "Mã bảo hành", width: 160,},
    { field: "agentCode", headerName: "Đại lý", width: 160 },
    {
      field: "productCode",
      headerName: "Mã sản phẩm",
      width: 130,
    },
    {
      field: "createAt",
      headerName: "Ngày gửi",
      width: 160,
    },
    {
      field: "finishAt",
      headerName: "Ngày hoàn thành",
      width: 130,
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
    },{
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
           <button className="userListEdit" >View</button>
            <button className="userListEdit" onClick={() => handleToggleDetail(params.row.id)} >Edit</button>
            
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
         <WarrantyDetail 
          open={openWarrantyDetail}
          toggleModal={() => setOpenWarrantyDetail(!openWarrantyDetail)}
          data={warranty}
         />
  </div>
    ) : (
      <>
      </>
    )}
    </>
    
  );
}
