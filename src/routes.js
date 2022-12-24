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
    Report
  } from "@material-ui/icons";

export const adminRoutes = [
    {
      path: "/admin/agents",
      name: "Đại lý",
      icon: PermIdentity
    },
    {
      path: "/admin/factory",
      name: "Cơ sở sản xuất",
      icon: PermIdentity
    },
    {
      path: "/admin/warrantycenter",
      name: "Trung tâm bảo hành",
      icon: PermIdentity
    },
    {
      path: "/admin/productlines",
      name: "Dòng sản phẩm",
      icon: PermIdentity,
    },
    {
        path: "/admin/newUser",
        name: "Cấp tài khoản",
        icon: PermIdentity,
    },
  ];
  
  export const factoryRoutes = [
    {
      path: "/factory/products",
      name: "Sản phẩm",
      icon: PermIdentity,
    },
    {
      path: "/factory/warehouse",
      name: "Kho hàng",
      icon: PermIdentity,
    },
    {
      path: "/factory/actions",
      name: "Sản xuất",
      icon: PermIdentity,
    },
    {
      path: "/factory/transferproducts",
      name: "Chuyển giao sản phẩm",
      icon: PermIdentity,
    },
  ];
  export const agentRoutes = [
    {
      path: "/agent/products",
      name: "Sản phẩm",
      icon: PermIdentity,
    },
    {
      path: "/agent/warehouse",
      name: "Kho hàng",
      icon: PermIdentity,
    },
    {
      path: "/agent/customers",
      name: "Khách hàng",
      icon: PermIdentity,
    },
    {
      path: "/agent/productsaresold",
      name: "Sản phẩm đã bán",
      icon: PermIdentity,
    },
    {
      path: "/agent/warranty",
      name: "Bảo hành",
      icon: PermIdentity,
    }
  ];
  export const wcenterRoutes = [
    {
      path: "/wc/warranty",
      name: "Bảo hành",
      icon: PermIdentity,
    },
    {
      path: "/wc/abc",
      name: "Hết ý tưởng",
      icon: PermIdentity,
    },
    ,
    {
      path: "/agent/warranty",
      name: "Bảo hành",
      icon: PermIdentity,
    }
  ];