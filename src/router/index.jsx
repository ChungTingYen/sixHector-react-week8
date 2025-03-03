import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import BackLayout from "../layouts/BackLayout";
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  NotFoundPage,
  CartPage,
  LoginPage,
  ProductDetailPageBySide,
  CheckoutFormPage,
  OrderListsPage,
  CheckoutPaymentPageFromOrders,
  ProductsPageFromWishList
} from "../pages/front";
import { ProductLitPage, AdminHomePage, OrderListPage } from "../pages/back";
const routes = [
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "products",
        element: <ProductsPage />,
        children: [
          { path: "productBySide/:id", element: <ProductDetailPageBySide /> },
        ],
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "checkout-form", element: <CheckoutFormPage /> },
      { path: "orderLists", element: <OrderListsPage /> },
      { path: "payment/:id", element: <CheckoutPaymentPageFromOrders /> },
      { path: "wishList", element: <ProductsPageFromWishList /> },
    ],
  },
  {
    path: "admin",
    element: <BackLayout />,
    children: [
      { path: "", element: <AdminHomePage /> },
      { path: "productList", element: <ProductLitPage /> },
      { path: "orderList", element: <OrderListPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createHashRouter(routes);

export default router;
