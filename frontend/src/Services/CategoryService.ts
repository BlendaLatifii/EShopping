import axios from "axios";
import { AddCategoryRequestDto } from "../Interfaces/Category/add-category";
import { CategoryResponseDto } from "../Interfaces/Category/category-response-dto";
import { UpdateCategoryRequestDto } from "../Interfaces/Category/update-category";
import { ListItemModel } from "../Interfaces/listItemModel";

export class CategoryService {

private static BaseUrl = "https://localhost:7147/api/Category";
 
 
  public static async AddCategory(model : AddCategoryRequestDto ) : Promise<void>{
    await axios.post(`${this.BaseUrl}`, model);
  }

  public static async GetAllCategories() : Promise<CategoryResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
 }

 public static async GetCategoryById(id : string) : Promise<CategoryResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);

    return result.data;
 }

 public static async UpdateCategory(id: string , model : UpdateCategoryRequestDto) : Promise<void>{
    await axios.put(`${this.BaseUrl}/${id}`, model);
 }

 public static async DeleteCategory(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
 }

 public static async GetSelectList(): Promise<ListItemModel[]>{
    const result = await axios.get<ListItemModel[]>(`${this.BaseUrl}/GetCategorySelectList`);
    return result.data;
  }
  
  public static async CountCategories() : Promise<number>{
  const result = await axios.get(`${this.BaseUrl}/count-categories`);
  return result.data;
 }
}