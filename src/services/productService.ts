import axios from "axios";
import { safeParse, pipe, string, transform, number, parse } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import { parseBoolean } from "../utils";

type ProductData = { [k: string]: FormDataEntryValue };

const url: string = `${import.meta.env.VITE_API_URL}/api/products`;

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      ...data,
      price: +data.price,
    });

    if (result.success) {
      const res = await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
      return res.data;
    } else {
      throw new Error(result.issues[0].message);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error(result.issues[0].message);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error(result.issues[0].message);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());

    const inputData = {
      ...data,
      price: parse(NumberSchema, data.price),
      id,
      availability: parseBoolean(data.availability.toString()),
    };

    const result = safeParse(ProductSchema, inputData);

    if (result.success) {
      const res = await axios.put(`${url}/${result.output.id}`, {
        name: result.output.name,
        price: result.output.price,
        availability: result.output.availability,
      });
      return res.data;
    } else {
      throw new Error(result.issues[0].message);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateAvailability(id: Product["id"]) {
  try {
    await axios.patch(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}
