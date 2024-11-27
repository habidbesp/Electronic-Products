import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as availabilityAction,
} from "./views/Products";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProducts";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import { action as productDetailsAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: availabilityAction,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "products/:id/edit", // ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "products/:id/delete",
        action: productDetailsAction,
      },
    ],
  },
]);
