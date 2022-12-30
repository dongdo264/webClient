import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from "@material-ui/data-grid";
import { ArrowUpwardTwoTone, DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { getAllProductLines } from "../../services/userService";
import { useRef } from "react";
import NewProduct from "../../components/modal/NewProduct";
import ProductLineDetail from "../../components/modal/ProductLineDetail";
import NewProductLine from "../../components/modal/NewProductLine";
import { Visibility, Edit } from "@material-ui/icons";

export default function ProductLine({ isLoggedIn }) {
  const [productLineList, setProductLineList] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalProductline, setOpenModalProductline] = useState(false);
  const [type, setType] = useState(null);
  const [productline, setProductline] = useState([]);
  async function fetchData() {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllProductLines(token);
    let listUser = res.data.data;
    setProductLineList(listUser);
    for (let i in listUser) {
      listUser[i].id = parseInt(i);
    }
    console.log(productLineList)
    setLoading(false);
  }
  if (!isLoggedIn) {
    window.location.href = '/';
  }

  useEffect(() => {
    if (!loading && productLineList.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, productLineList]);


  const handleOpenModal = (type_, id) => {
    if (type === "create") {
      setType(type_);
      setProductline(productLineList[parseInt(id)]);
      setOpenModalEdit(!openModalEdit);
      return;
    }
    setType(type_);
    setProductline(productLineList[parseInt(id)]);
    setOpenModalEdit(!openModalEdit)
  } 


  const columns = [
    {
      field: "productLine",
      headerName: "Dòng sản phẩm",
      width: 170,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "textDescription",
      headerName: "Thông tin mô tả",
      width: 200,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
    },
    {
      field: "createAt",
      headerName: "Ngày ra mắt",
      width: 154,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
    },
    {
      field: "products.count",
      headerName: "Số sản phẩm",
      width: 150,
      headerClassName: 'header-column',
      cellClassName: 'even-column',
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'odd-column',
      //   valueGetter: (params) => {
      //     return params.getValue(params.row.agentCode, "account").accStatus;
      //   }
    },
    {
      field: "action",
      headerName: "Action",
      width: 186,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        return (
          <>
            <button className="userListEdit view_btn" onClick={() => handleOpenModal("view", params.row.id)}>
              <Visibility className="userEdit_icon"/> View
            </button>
            <button className="userListEdit edit_btn" onClick={() => handleOpenModal("edit", params.row.id)}>
              <Edit className="userEdit_icon"/>Edit
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="userList">
            {/* <div className="userTitleContainer">
              <h1 className="userTitle">Dòng sản phẩm</h1>
              <button className="agentAddButton" onClick={() => { setOpenModalProductline(!openModalProductline) }}>Create</button>
            </div> */}
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
                Dòng sản phẩm
                <button
                  className="agentAddButton"
                  onClick={() => { setOpenModalProductline(!openModalProductline) }}
                  style={
                    {
                      'float': 'right',
                      'position': 'relative',
                      'top': '50%',
                      'transform': 'translateY(50%)'
                    }
                  }
                >
                  Create
                </button>
              </Typography>

              <DataGrid
                sx={{
                  border: 'none' // also tried setting to none 
                }}
                rows={productLineList}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row.productLine}
                pageSize={5}
              //checkboxSelection
              />
            </Box>
          </div>

          <NewProductLine
            open={openModalProductline}
            toggleModal={() => setOpenModalProductline(!openModalProductline)}
            fetchData={() => fetchData()}
          />
          <ProductLineDetail 
            open={openModalEdit}
            toggleModal= {() => setOpenModalEdit(!openModalEdit)}
            type={type}
            data={productline}
            fetchData={() => fetchData()}
          />
        </>
      ) : (
        <>
        </>
      )}
    </>

  );
}
