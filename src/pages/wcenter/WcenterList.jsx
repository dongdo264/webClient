import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Box, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { getAllWarrantyCenter } from "../../services/userService";
import { deleteUser } from "../../services/adminService";
import { useRef } from "react";
import { Visibility, Block, CheckCircle } from "@mui/icons-material";

export default function WcenterList({isLoggedIn}) {
  const [wcList, setwcList] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllWarrantyCenter(token);
    let fList = res.data.data;
    setwcList(fList);
    setLoading(false);
  }
  if(!isLoggedIn) {
    window.location.href='/';
  }

  useEffect( async() => {
      if (!loading && wcList.length === 0) {
        fetchData();
      };
      return () => {
        componentMounted.current = false;
      }
    }, [loading, wcList]);

    const handleUpdateActive = async (wcCode) => {
      try {
        if (window.confirm("Cập nhật hoạt động đại lý này")) {
          const token = sessionStorage.getItem('accessToken');
          let res = await deleteUser("Active", wcCode, token);
          if (res.data.errCode === 0) {
            fetchData();
            window.alert("Cập nhật thành công!!")
          }
        }
      } catch(err) {
        console.log(err.response);
      }
    };
    const handleUpdateInActive = async (wcCode) => {
      try {
        if (window.confirm("Cập nhật ngừng hoạt động đại lý này")) {
          const token = sessionStorage.getItem('accessToken');
          let res = await deleteUser("Inactive", wcCode, token);
          if (res.data.errCode === 0) {
            fetchData();
            window.alert("Cập nhật thành công!!")
          }
        }
      } catch(err) {
        console.log(err.response);
      }
    };
  
  const handleDelete = (wcCode) => {
    // setData(.filter((item) => item.wcCode !== wcCode));
  };
  
  const columns = [
    { 
      field: "wcCode", 
      headerName: "Mã trung tâm", 
      width: 140, 
      style: { textAlign: 'center' },
      headerClassName: 'header-column',
      cellClassName: 'odd-column', 
    },
    { 
      field: "wcName", 
      headerName: "Tên trung tâm", 
      width: 150,
      headerClassName: 'header-column',
      cellClassName: 'even-column', 
    },
    {
      field: "wcAdress",
      headerName: "Địa chỉ",
      width: 130,
      headerClassName: 'header-column',
      cellClassName: 'odd-column', 
    },
    {
      field: "wcCity",
      headerName: "Tỉnh/thành",
      width: 130,
      headerClassName: 'header-column',
      cellClassName: 'even-column', 
    },
    {
      field: "wcPhone",
      headerName: "Số ĐT",
      width: 110,
      headerClassName: 'header-column',
      cellClassName: 'odd-column', 
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
        headerClassName: 'header-column',
        cellClassName: 'even-column', 
        valueGetter: (params) => {
          return params.getValue(params.row.wcCode, "account").status;
        }
    },
    {
      field: "action",
      headerName: "Action",
      width: 206,
      headerClassName: 'header-column',
      cellClassName: 'final-column', 
      renderCell: (params) => {
        if (params.getValue(params.row.wcCode, "account").status === "Active") {
          return (
            <>
              <button className="userListEdit view_btn">
                <Visibility className="userEdit_icon"/>View
              </button>
              <button onClick={() => handleUpdateInActive(params.row.wcCode)} className="userListEdit inactive_btn">
                <Block className="userEdit_icon"/> Inactive
              </button>
            </>
          );
        }
        return (
          <>
            <button className="userListEdit view_btn">
              <Visibility className="userEdit_icon"/>View
            </button>
            <button onClick={() => handleUpdateActive(params.row.wcCode)} className="userListEdit active_btn">
              <CheckCircle /> Active
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
    {isLoggedIn ? (
      <div className="userList">
      {/* <div className="userTitleContainer">
      <h1 className="userTitle">Danh sách nhà máy</h1>
      <Link to="/admin/newUser">
        <button className="agentAddButton">Create</button>
      </Link>
    </div>
    <DataGrid
      rows={wcList}
      disableSelectionOnClick
      columns={columns}
      getRowId={row => row.wcCode}
      pageSize={5}
      //checkboxSelection
    /> */}
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
        Trung tâm bảo hành
      </Typography>
      <DataGrid
        columns={columns}
        rows={wcList}
        getRowId={row => row.wcCode}
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
