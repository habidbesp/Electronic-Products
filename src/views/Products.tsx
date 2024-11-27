import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/productService";
import { Product } from "../types";
import ProductDetails from "../components/ProductDetails";
import NavButton from "../components/NavButton";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  if (data.id) {
    await updateAvailability(+data.id);
    return;
  }
}

export default function Products() {
  const products: Product[] = useLoaderData();

  return (
    <>
      <div className="flex flex-col justify-between space-y-3 sm:flex-row">
        <h2 className="text-4xl font-black text-slate-500">Products</h2>

        <NavButton route="products/new">Add Products</NavButton>
      </div>
      <div className="sm:p-2 overflow-x-auto">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
      {!products.length && (
        <div className="h-60 w-auto flex items-center justify-center">
          <h1 className="text-2xl text-center">
            There are not products in the data base.
          </h1>
        </div>
      )}
    </>
  );
}
