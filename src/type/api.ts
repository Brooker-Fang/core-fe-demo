
export interface Product {
  _id: string
  name: string
  price: number
}
export interface UserResponse{
    name: string
    mail: string
  }
export interface UserRequest {
  name: string
  password: string
}
export interface ProductListResponse{
  list: Array<Product>
}
export interface ProductCreate {
  name: string
  price: number
}