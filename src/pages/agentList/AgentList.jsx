import "./agentList.css";
import { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getAllAgents } from "../../servive/adminService";

export default function AgentList() {
  const [agentList, setAgentList] = useState([]);
  useEffect( async () => {
    let res = await getAllAgents();
    let listUser = res.data.data;
    console.log(listUser);
    setAgentList(listUser);
  }, []);

  const handleDelete = (agentCode) => {
    // setData(.filter((item) => item.agentCode !== agentCode));
  };
  
  const columns = [
    { field: "agentCode", headerName: "Mã đại lý", width: 150, style: { textAlign: 'center' }},
    { field: "agentName", headerName: "Tên đại lý", width: 200 },
    {
      field: "agentAdress",
      headerName: "Địa chỉ",
      width: 120,
    },
    {
      field: "agentCity",
      headerName: "Tỉnh/thành",
      width: 160,
    },{
      field: "agentPhone",
      headerName: "Số ĐT",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.agentCode}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.agentCode)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={agentList}
        //disableSelectionOnClick
        columns={columns}
        getRowId={row => row.agentCode}
        pageSize={5}
        //checkboxSelection
      />
    </div>
  );
}
