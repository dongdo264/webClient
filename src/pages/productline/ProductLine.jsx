import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { ArrowUpwardTwoTone, DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { getAllProductlines } from "../../services/adminService";
import { useRef } from "react";

export default function ProductLine({isLoggedIn}) {
  const [productLineList, setProductLineList] = useState([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true)
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

//   const handleDelete = async (agentCode) => {
//     console.log(agentCode);
//     try {
//       if (window.confirm("Bạn có chắc muốn xóa đại lý này?")) {
//         const token = sessionStorage.getItem('accessToken');
//         let res = await deleteAgentById(agentCode, token);
//         if (res.data.errCode === 0) {
//           fetchData();
//           window.alert("Xóa thành công!!")
//         }
//       }
//     } catch(err) {
//       console.log(err.response);
//     }
//   };
  
  const columns = [
    { field: "productLine", headerName: "Dòng sản phẩm", width: 170},
    {
      field: "textDescription",
      headerName: "Thông tin mô tả",
      width: 300,
    },
    {
        field: "products.count",
        headerName: "Số sản phẩm",
        width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 170,
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
        <div className="userList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Dòng sản phẩm</h1>
          <Link to="/admin/newUser">
            <button className="agentAddButton">Create</button>
          </Link>
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
      ) : (
        <>
        </>
      )}
      </>
      
  );
}
