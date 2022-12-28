import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    VerifiedUser, 
    Category,
    PersonAdd, 
    Build, 
    DirectionsBike,
    LocalShipping,
  } from "@material-ui/icons";
import { Factory, PedalBike, Warehouse, WarehouseOutlined } from "@mui/icons-material";

export const adminRoutes = [
    {
      path: "/admin/agents",
      name: "Đại lý",
      icon: Storefront
    },
    {
      path: "/admin/factory",
      name: "Cơ sở sản xuất",
      icon: Factory
    },
    {
      path: "/admin/warrantycenter",
      name: "Trung tâm bảo hành",
      icon: VerifiedUser
    },
    {
      path: "/admin/productlines",
      name: "Dòng sản phẩm",
      icon: Category,
    },
    {
      path: "/admin/products",
      name: "Sản phẩm",
      icon: PedalBike,
    },
    {
        path: "/admin/newUser",
        name: "Cấp tài khoản",
        icon: PersonAdd,
    },
  ];
  
  export const factoryRoutes = [
    {
      path: "/factory/products",
      name: "Sản phẩm",
      icon: PedalBike,
    },
    {
      path: "/factory/warehouse",
      name: "Kho hàng",
      icon: Warehouse,
    },
    {
      path: "/factory/actions",
      name: "Sản xuất",
      icon: Build,
    },
    {
      path: "/factory/transferproducts",
      name: "Chuyển giao sản phẩm",
      icon: LocalShipping,
    },
    {
      path: "/factory/faultyproducts",
      name: "Sản phẩm lỗi",
      icon: Report,
    },
  ];
  export const agentRoutes = [
    {
      path: "/agent/products",
      name: "Sản phẩm",
      icon: PedalBike,
    },
    {
      path: "/agent/warehouse",
      name: "Kho hàng",
      icon: Warehouse,
    },
    {
      path: "/agent/customers",
      name: "Khách hàng",
      icon: PermIdentity,
    },
    {
      path: "/agent/productsaresold",
      name: "Sản phẩm đã bán",
      icon: DirectionsBike,
    },
    {
      path: "/agent/warranty",
      name: "Bảo hành",
      icon: VerifiedUser,
    },
    {
      path: "/agent/summonproducts",
      name: "Triệu hồi sản phẩm",
      icon: PermIdentity,
    }
  ];
  export const wcenterRoutes = [
    {
      path: "/wc/analyz",
      name: "Home",
      icon: PermIdentity,
    },
    {
      path: "/wc/warranty",
      name: "Bảo hành",
      icon: VerifiedUser,
    },
    {
      path: "/wc/history",
      name: "Lịch sử",
      icon: PermIdentity,
    },
  ];