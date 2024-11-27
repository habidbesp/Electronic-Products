import {
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  useNavigation,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/productService";
import ProductForm from "../components/ProductForm";
import NavButton from "../components/NavButton";
import SpinnerLight from "../components/Spinner/SpinnerLight";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "All fields are required";
    return error;
  }

  await addProduct(data);
  return redirect("/");
}

export default function NewProduct() {
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <>
      <div className="flex flex-col justify-between space-y-3 sm:flex-row">
        <h2 className="text-4xl font-black text-slate-500">New Product</h2>
        <NavButton route="/">Back to Products</NavButton>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="post" className="mt-10">
        <ProductForm />

        <button
          type="submit"
          className="flex items-center justify-center relative mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500"
        >
          {navigation.formAction === "/products/new" && (
            <span className="absolute">
              <SpinnerLight />
            </span>
          )}
          <span
            className={`${
              navigation.formAction === "/products/new" && "opacity-0"
            }`}
          >
            Register Product
          </span>
        </button>
      </Form>
    </>
  );
}
