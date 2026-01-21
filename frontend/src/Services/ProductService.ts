import axios from "axios";
import { AddProductRequestDto } from "../Interfaces/Product/add-product-dto";
import { ProductResponseDto } from "../Interfaces/Product/product-response-dto";
import { UpdateProductRequestDto } from "../Interfaces/Product/update-product-dto";
import { ListItemModel } from "../Interfaces/listItemModel";

export class ProductService {

private static BaseUrl = "https://localhost:7147/api/Product";
 
 
  static async AddProduct(data: AddProductRequestDto) {

  const form = new FormData();

  form.append("Name", data.name);
  form.append("Description", data.description);
  form.append("Price", data.price.toString());
  form.append("CategoryId", data.categoryId);

  data.images.forEach((file) => {
    form.append("Images", file);
  });

  return axios.post("https://localhost:7147/api/Product", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}


  public static async GetAllProducts() : Promise<ProductResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
 }

  public static async GetProductByCategory(categoryId : string) : Promise<ProductResponseDto[]>{
    var result = await axios.get(`${this.BaseUrl}/${categoryId}`);
    return result.data;
 }

 public static async GetProductById(id : string) : Promise<ProductResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);
    return result.data;
 }

 public static async UpdateProduct(id: string , model : UpdateProductRequestDto) : Promise<void>{
    await axios.put(`${this.BaseUrl}/${id}`, model);
 }

 public static async DeleteProduct(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
 }

 public static async SearchProduct(searchTerm : string) : Promise<ProductResponseDto[]>{
    var result = await axios.get(`${this.BaseUrl}/${searchTerm}`);
    return result.data;
 }

 public static async GetSelectList(): Promise<ListItemModel[]>{
   const result = await axios.get<ListItemModel[]>(`${this.BaseUrl}/GetProductSelectList`);
   return result.data;
 }
}