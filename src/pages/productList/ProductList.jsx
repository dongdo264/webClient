import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Box, Typography } from '@mui/material';
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect, useRef , useSelector } from "react";
import { getInfoProduct,getAllProducts } from "../../services/userService";
import Modal from "../../components/modal/Modal";
import Production from "../../components/modal/Production";
import { updateStatusProduct } from "../../services/agentService";
import { Visibility } from "@material-ui/icons";
import NewProduct from "../../components/modal/NewProduct";
import { Edit, SettingsBackupRestore, MiscellaneousServices } from "@mui/icons-material";

export default function ProductList(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isOpenModal, setOpenModel] = useState(false);
  const [info, setInfo] = useState([]);
  const [openProduction, setOpenProduction] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [type, setType] = useState("");
  

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
    data.name = data.productName;
    data.productLine = data.productLine;
    data.img = '';
    if (data.avatar) {
      data.img = new Buffer(data.avatar, 'base64').toString('binary') 
    }
    console.log(data);
    setInfo(data);
  }
  useEffect(() => {
    console.log(props);
    if (!loading && data.length === 0) {
      fetchData();
    };
  }, [loading, data])

  useEffect(() => {
    if (props.role === 10) {
      setAddProduct(true);
    }
  })

  const toggleModal = (id) => {
    fetchInfoProduct(id);
    setOpenModel(!isOpenModal);
  }

  const toggleModalEdit = (id) => {
    fetchInfoProduct(id);
    setType("edit");
    setOpenAdd(!openAdd);
  }

  const toggleModalAdd = () => {
    setType("");
    setOpenAdd(!openAdd);
  }



  const toggleModalProduction = (id) => {
    fetchInfoProduct(id);
    setOpenProduction(!openProduction);
  }

  const confirmSummon = async (id) => {
    if (window.confirm(`Triệu hồi tất cả sản phẩm mã ${id} từ khách hàng?`)) {
      try{
        const token = sessionStorage.getItem('accessToken');
        let update = await updateStatusProduct(id, "Triệu hồi", token)
        if (update.data.errCode === 0) {
          alert("Đã thêm vào danh sách triệu hồi!");
        }
      }catch(err) {

      }
      
    }
  }

  const columns = [
    { field: "productCode", 
      headerName: "ID", 
      width: 90,
      headerClassName: 'header-column',
      cellClassName: 'odd-column', 
    },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      width: 242,
      headerClassName: 'header-column name-column',
      cellClassName: 'even-column',
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "createAt", 
      headerName: "Ngày ra mắt", 
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: 'header-column',
      cellClassName: 'even-column'
    },
    {
      field: "warrantyPeriod",
      headerName: "Bảo hành",
      width: 100,
      headerClassName: 'header-column',
      cellClassName: 'odd-column'
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      headerClassName: 'header-column',
      cellClassName: 'final-column',
      renderCell: (params) => {
        if (props.role === 10) {
          return (
            <>
              <button className="productListEdit view_btn" onClick={() => toggleModal(params.row.productCode)}>
                <Visibility className="pdLEdit_icon"/>View
              </button>
              <button className="productListEdit edit_btn" onClick={() => toggleModalEdit(params.row.productCode)}>
                <Edit className="pdLEdit_icon"/>Edit
              </button>
              <button className="productListEdit backup_btn" onClick={() => confirmSummon(params.row.productCode)}>
                <SettingsBackupRestore className="pdLEdit_icon"/>Triệu hồi
              </button>
            </>
          );
        } else {
          if (params.row.status === "Active") {
            return (
              <>
                <button className="productListEdit view_btn" onClick={() => toggleModal(params.row.productCode)}>
                  <Visibility className="pdLEdit_icon"/>View
                </button>
                <button className="productListEdit product_btn" onClick={() => toggleModalProduction(params.row.productCode)}>
                 <MiscellaneousServices className="pdlEdit_icon"/>Sản xuất
                </button>
              </>
            );
          }
          return (
            <>
              <button className="productListEdit view_btn" onClick={() => toggleModal(params.row.productCode)}>
                <Visibility className="pdLEdit_icon"/>View
              </button>
            </>
          );
        }
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
        Sản phẩm
        {addProduct ? (
          <>
          <button
            className="agentAddButton"
            onClick={toggleModalAdd}
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
        </>
        ) : (
          <>
          </>
        )}
        
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
    <Production 
      open={openProduction}
      toggleModal={() => setOpenProduction(!openProduction)}
      info={info}
    />
    <NewProduct
          open={openAdd}
          toggleModal={() => setOpenAdd(!openAdd)}
          data={info}
          type={type}
          fetchData={() => fetchData()}
      /> 
    </>
  );
}
