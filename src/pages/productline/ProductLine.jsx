import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from "@material-ui/data-grid";
import { ArrowUpwardTwoTone, DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { getAllProductLines } from "../../services/userService";
import { useRef } from "react";
import NewProduct from "../../components/modal/NewProduct";
import ProductLineDetail from "../../components/modal/ProductLineDetail";
import NewProductLine from "../../components/modal/NewProductLine";

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
    { field: "productLine", headerName: "Dòng sản phẩm", width: 170 },
    {
      field: "textDescription",
      headerName: "Thông tin mô tả",
      width: 200,
    },
    {
      field: "createAt",
      headerName: "Ngày ra mắt",
      width: 160,
    },
    {
      field: "products.count",
      headerName: "Số sản phẩm",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      //   valueGetter: (params) => {
      //     return params.getValue(params.row.agentCode, "account").accStatus;
      //   }
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <>
          <button className="userListEdit" onClick={() => handleOpenModal("view", params.row.id)} >View</button>
          <button className="userListEdit" onClick={() => handleOpenModal("edit", params.row.id)} >Edit</button>
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
            <div className="userTitleContainer">
              <h1 className="userTitle">Dòng sản phẩm</h1>
              <button className="agentAddButton" onClick={() => { setOpenModalProductline(!openModalProductline) }}>Create</button>
            </div>
            <Box
              sx={{
                height: 400,
                width: '100%',
              }}
            >
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
