import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Mode } from 'fs';
import { cart, editForm, Model } from './model.model';
import { HttpClient, HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';
import { json } from 'stream/consumers';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string = environment.apiBaseURL;
  list: Model[]=[];
  cart: cart[]=[]
   formData: editForm = new editForm();
  //formData: editForm = new editForm();
  formsubmitted: boolean = false;
  handleError: any;
  private cartData = new BehaviorSubject<Model[]>([]);  //BehaviorSubject-new suscriber recieves the last emitted value

  sharedData(data: any): void {
    const currentCart = this.cartData.value;
    currentCart.push(data);
    this.cartData.next(currentCart);
  }

  getCartData(){
    return this.cartData;
  }

  // onAddToCart$: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  getImage():Observable<Model[]>{
    return this.http.get<Model[]>('https://localhost:7016/api/User/get/all/image')
  }

  uploadImage(file: File, roleId: number, imageName: string,imageDescription: string,userId:number,price:string,quantity:number): Observable<any> {  //Observable-to handle variety of asynchronous operation
    const formData = new FormData();
    formData.append('File', file);   //appends new value on existing key in formdata
    formData.append('RoleId', roleId.toString());
    formData.append('ImageName', imageName);
    formData.append('ImageDescription',imageDescription);
    formData.append('Price',price);
    formData.append('UserId',userId.toString());
    formData.append('quantity',quantity.toString());

    return this.http.post('https://localhost:7016/api/User/upload', formData);
  }

  putList(roleId: number, imageName: string, imageDescription: string, userId: number, price: string, quantity: number): Observable<any> {
    const formData = new FormData();
    // formData.append('File', file);
    formData.append('RoleId', roleId.toString());
    formData.append('ImageName', imageName);
    formData.append('ImageDescription',imageDescription);
    formData.append('Price',price);
    formData.append('UserId',userId.toString());
    return this.http.put('https://localhost:7016/api/User/Update',formData);
  }

  deleteList(id:number){
    return this.http.delete('https://localhost:7016/api/User/Delete'+'/'+id);
  }
  
  addToCart(obj:any):Observable<any>{
    return this.http.post('https://localhost:7016/api/User/addToCart',obj)
  }

  getAddToCart(userId: any): Observable<Model[]> {
    return this.http.get<Model[]>(`https://localhost:7016/api/User/CasrIdDTO${userId}`);
  }

  deleteCart(cartId:number){
    return this.http.delete(`https://localhost:7016/api/User/deleteCart${cartId}`)
  }

  // editCart(){
  //       return this.http.put('https://localhost:7016/api/User/updateCartItemQuantity',this.formData);
  // }

  postUser(userId:number,roleId:number,userName:string,password:string,firstName:string,lastName:string,mobilePhone:string){
    const formData = new FormData();
    formData.append('userId',userId.toString());
    formData.append('roleId',roleId.toString());
    formData.append('userName',userName);
    formData.append('password',password);
    formData.append('firstName',firstName);
    formData.append('lastName',lastName);
    formData.append('mobilePhone',mobilePhone);
    let Token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKd3RTdWJqZWN0IiwianRpIjoiNjJlZDQ3MmQtMjEwNi00YjVmLWE5NGItMDUyMmM3OGM0NTA3IiwidXNlck5hbWUiOiJha2FzaCIsIkZpcnN0TmFtZSI6ImFrYXNoIiwiZXhwIjoxNzM2OTQ0MjcyLCJpc3MiOiJKd3RJc3N1ZXIiLCJhdWQiOiJKd3RBdWRpZW5jZSJ9.aNiJ8ZHHGR-UsZtUiVEiTerVuM9IH3hyOVm4s5eJ2EM";
    let object = new HttpHeaders().set('Authorization','bearer '+Token);
    return this.http.post('https://localhost:7016/api/User/User',formData,{headers:object});
  }

  editCart(cartId: number, quantity: number):Observable<any>{
    // const payload = {cartId, quantity}
    // const formData = new FormData();
    // formData.append('cartId',cartId.toString());
    // formData.append('quantity',quantity.toString());
    return this.http.put('https://localhost:7016/api/User/updateCartItemQuantity',{"cartId": cartId,"quantity":quantity});
  }

  // editCart(cartId:number,quantity:number):Observable<any>{
  //   const formData = new FormData();
  //   formData.append('cartId',cartId.toString());
  //   formData.append('quantity',quantity.toString())
  //   return this.http.put(`https://localhost:7016/api/User/updateCartItemQuantity${cartId}`,formData);
  // }
}
