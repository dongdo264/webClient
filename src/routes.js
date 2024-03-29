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
import { Factory, PedalBike, Warehouse, WarehouseOutlined, ManageHistory, Home } from "@mui/icons-material";
import { Assignment } from "@material-ui/icons";

export const adminRoutes = [
  {
    path: "/admin/analyz",
    name: "Home",
    icon: Home
  },
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
      path: "/factory/analyz",
      name: "Home",
      icon: Home,
    },
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
      path: "/agent/analyz",
      name: "Home",
      icon: Home,
    },
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
    },
    {
      path: "/agent/productsimported",
      name: "Lịch sử nhập hàng",
      icon: ManageHistory,
    },
    {
      path: "/agent/orders",
      name: "Đơn hàng",
      icon: Assignment,
    },
  ];
  export const wcenterRoutes = [
    {
      path: "/wc/analyz",
      name: "Home",
      icon: Home,
    },
    {
      path: "/wc/warranty",
      name: "Bảo hành",
      icon: VerifiedUser,
    },
    {
      path: "/wc/history",
      name: "Lịch sử",
      icon: ManageHistory,
    },
  ];