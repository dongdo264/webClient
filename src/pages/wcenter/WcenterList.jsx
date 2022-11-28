import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getAllWarrantyCenter } from "../../services/adminService";

export default function WcenterList({isLoggedIn}) {
  const [wcList, setwcList] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchData () {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    let res = await getAllWarrantyCenter(token);
    let fList = res.data.data;
    setwcList(fList);
    setLoading(false);
  }

  useEffect(() => {
    if(!isLoggedIn) {
      window.location.href='/';
    }
        if (!loading && wcList.length === 0) {
        fetchData();
        };
    }, [loading, wcList]);

  
  const handleDelete = (wcCode) => {
    // setData(.filter((item) => item.wcCode !== wcCode));
  };
  
  const columns = [
    { field: "wcCode", headerName: "Mã trung tâm", width: 160, style: { textAlign: 'center' }},
    { field: "wcName", headerName: "Tên trung tâm", width: 160 },
    {
      field: "wcAdress",
      headerName: "Địa chỉ",
      width: 130,
    },
    {
      field: "wcCity",
      headerName: "Tỉnh/thành",
      width: 160,
    },{
      field: "wcPhone",
      headerName: "Số ĐT",
      width: 130,
    },{
        field: "status",
        headerName: "Status",
        width: 130,
        valueGetter: (params) => {
          return params.getValue(params.row.wcCode, "account").accStatus;
        }
    },{
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/wc/" + params.row.wcCode}>
              <button className="userListEdit">Edit</button>
            </Link>
            <button onClick={() => handleDelete(params.row.wcCode)} className="userListEdit">Delete</button>
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
    />
  </div>
    ) : (
      <>
      </>
    )}
    </>
    
  );
}
