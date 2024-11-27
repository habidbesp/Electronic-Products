import {
  ActionFunctionArgs,
  Form,
  NavLink,
  NavLinkRenderProps,
  redirect,
  useFetcher,
  useNavigation,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/productService";
import SpinnerLight from "./Spinner/SpinnerLight";
import SpinnerDark from "./Spinner/SpinnerDark";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const isAvailable = product.availability;

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`flex items-center justify-center relative ${
              isAvailable ? "text-black" : "text-red-600"
            } min-w-[125px] max-w-[125px] mx-auto whitespace-nowrap overflow-hidden text-ellipsis rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {fetcher.state !== "idle" && (
              <span className="absolute">
                <SpinnerDark />
              </span>
            )}

            <span
              className={`${
                fetcher.state !== "idle" && "opacity-0"
              } text-ellipsis`}
            >
              {isAvailable ? "Available" : "Out of stock"}
            </span>
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <NavLink
            to={`/products/${product.id}/edit`}
            className="flex items-center justify-center relative bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-500"
          >
            {({ isPending }: NavLinkRenderProps) => (
              <>
                {isPending && (
                  <span className="absolute">
                    <SpinnerLight />
                  </span>
                )}
                <span className={`${isPending && "opacity-0"}`}>Edit</span>
              </>
            )}
          </NavLink>
          <Form
            method="DELETE"
            className="w-full"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("Do you really want to delete this item?")) {
                e.preventDefault();
              }
            }}
          >
            <button
              className="flex items-center justify-center relative bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:cursor-pointer hover:bg-red-500"
              type="submit"
            >
              {navigation.formAction === `/products/${product.id}/delete` && (
                <span className="absolute">
                  <SpinnerLight />
                </span>
              )}
              <span
                className={`${
                  navigation.formAction === `/products/${product.id}/delete` &&
                  "opacity-0"
                }`}
              >
                Delete
              </span>
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
}
