import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { ArrowUpwardTwoTone, DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { getAllProductlines } from "../../services/adminService";
import { useRef } from "react";
import NewProduct from "../../components/modal/NewProduct";
import NewProductLine from "../../components/modal/NewProductLine";

export default function ProductLine({isLoggedIn}) {
  const [productLineList, setProductLineList] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
  const [openModal, setOpenModal] = useState(false);
  const [openModalProductline, setOpenModalProductline] = useState(false);
  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllProductlines(token);
    let listUser = res.data.data;
    setProductLineList(listUser);
    console.log(productLineList)
    setLoading(false);
  }
  if(!isLoggedIn) {
    window.location.href = '/';
  }

  useEffect( () => {
    if (!loading && productLineList.length === 0) {
      fetchData();
    };
    return () => {
      componentMounted.current = false;
    }
  }, [loading, productLineList]);


  
  const columns = [
    { field: "productLine", headerName: "Dòng sản phẩm", width: 170},
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
          <button className="userListEdit">View</button>
          <button className="userListEdit">Edit</button>
            {/* <Link to={"/admin/agent/" + params.row.agentCode}>
              <button className="userListEdit">Edit</button>
            </Link> */}
            
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.agentCode)}
            /> */}
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
            <button className="agentAddButton" onClick={() => {setOpenModalProductline(!openModalProductline)}}>Create</button>
        </div>
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
      </div> 
      <NewProduct
          open={openModal}
          toggleModal={() => setOpenModal(!openModal)}
      /> 
      <NewProductLine 
        open={openModalProductline}
        toggleModal={() => setOpenModalProductline(!openModalProductline)}
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
