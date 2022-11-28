import "../agentList/agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getAllFactories } from "../../services/adminService";

export default function FactoryList() {
  const [factoryList, setFactoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchData () {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    let res = await getAllFactories(token);
    let fList = res.data.data;
    setFactoryList(fList);
    setLoading(false);
  }

  useEffect(() => {
        if (!loading && factoryList.length === 0) {
        fetchData();
        };
    }, [loading, factoryList]);

  
  const handleDelete = (factoryCode) => {
    // setData(.filter((item) => item.factoryCode !== factoryCode));
  };
  
  const columns = [
    { field: "factoryCode", headerName: "Mã nhà máy", width: 150, style: { textAlign: 'center' }},
    { field: "factoryName", headerName: "Tên nhà máy", width: 170 },
    {
      field: "factoryAdress",
      headerName: "Địa chỉ",
      width: 130,
    },
    {
      field: "factoryCity",
      headerName: "Tỉnh/thành",
      width: 160,
    },{
      field: "factoryPhone",
      headerName: "Số ĐT",
      width: 130,
    },{
        field: "status",
        headerName: "Status",
        width: 130,
        valueGetter: (params) => {
          return params.getValue(params.row.factoryCode, "account").accStatus;
        }
    },{
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/factory/" + params.row.factoryCode}>
              <button className="userListEdit">Edit</button>
            </Link>
            <button onClick={() => handleDelete(params.row.factoryCode)} className="userListEdit">Delete</button>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
        <div className="userTitleContainer">
        <h1 className="userTitle">Danh sách nhà máy</h1>
        <Link to="/newUser">
          <button className="agentAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={factoryList}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row.factoryCode}
        pageSize={5}
        //checkboxSelection
      />
    </div>
  );
}
