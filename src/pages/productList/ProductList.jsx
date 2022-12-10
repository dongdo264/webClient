import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getAllProducts } from "../../services/factoryService";
import { getInfoProduct } from "../../services/userService";
import Modal from "../../components/modal/Modal";

export default function ProductList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [img, setImg] = useState('');
  const [isOpenModal, setOpenModel] = useState(false);
  const [info, setInfo] = useState([]);

  async function fetchData () {
    setLoading(true);
    const token = sessionStorage.getItem('accessToken');
    let res = await getAllProducts(token);
    let listUser = res.data.data;
    
    for (let i in listUser) {
      if (listUser[i].avatar) {
        listUser[i].img = new Buffer(listUser[i].avatar, 'base64').toString('binary') 
      } else {
        listUser[i].img = '';
      }
    }
    setData(listUser);
    setLoading(false);
  }
  async function fetchInfoProduct (id) {
    const token = sessionStorage.getItem('accessToken');
    let res = await getInfoProduct(id, token);
    let data = res.data.data;
    data.name = data.product.productName;
    data.productLine = data.product.productLine;
    data.img = '';
    if (data.product.avatar) {
      data.img = new Buffer(data.product.avatar, 'base64').toString('binary') 
    }
    console.log(data);
    setInfo(data);
  }
  useEffect(() => {
    if (!loading && data.length === 0) {
      fetchData();
    };
  }, [loading, data])

  const toggleModal = (id) => {
    // console.log("click me!")
    fetchInfoProduct(id);
    setOpenModel(!isOpenModal);
    //console.log(isOpenModal);
    // console.log(id);
  }

  const columns = [
    { field: "productCode", headerName: "ID", width: 90 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "buyPrice", headerName: "Giá xuất xưởng", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      
    },
    {
      field: "warrantyPeriod",
      headerName: "Bảo hành",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={() => toggleModal(params.row.productCode)}>View</button>
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        {/* <button onClick={toggleModal}>Mở modal</button> */}
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
        Sản phẩm
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.productCode}
        //rowsPerPageOptions={[5, 10, 20]}
        pageSize={10}
        sx={{ textAlign: 'center' }}
      />
    </Box>
    </div>
    <Modal 
      open={isOpenModal}
      toggleModal={() => setOpenModel(!isOpenModal)}
      info={info}
    />
    </>
  );
}
