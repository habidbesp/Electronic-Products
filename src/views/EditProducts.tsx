import {
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/productService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";
import NavButton from "../components/NavButton";
import SpinnerLight from "../components/Spinner/SpinnerLight";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const product = await getProductById(parseInt(params.id));
    if (!product) {
      return redirect("/");
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "All fields are required";
    return error;
  }

  if (params.id) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}

export default function EditProduct() {
  const error = useActionData();
  const product: Product = useLoaderData();
  const navigation = useNavigation();
  console.log(navigation);

  const availabilityOptions = [
    {
      name: "Available",
      value: true,
    },
    {
      name: "Not Available",
      value: false,
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between space-y-3 sm:flex-row">
        <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
        <NavButton route="/">Back to Products</NavButton>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="put" className="mt-10">
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            In Stock:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center relative mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500"
        >
          {navigation.formAction === `/products/${product.id}/edit` && (
            <span className="absolute">
              <SpinnerLight />
            </span>
          )}
          <span
            className={`${
              navigation.formAction === `/products/${product.id}/edit` &&
              "opacity-0"
            }`}
          >
            Edit Product
          </span>
        </button>
      </Form>
    </>
  );
}
