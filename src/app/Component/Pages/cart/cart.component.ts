import { Component, numberAttribute, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { cart, Model } from '../../../service/model.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  standalone: false,

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Model[] = [];
  totalPrice: number = 0;
  cartCount:number =0;
  deleteItems: cart[] =[]
  public dataSource: any = [];
  public displayedColumns: string[] = ["imageName", "imageDescription", "price", "imageData", "quantity", "Action"];
  // roleId: number = 0;
  // userId: number = 0;
  // quantity: number=0;
  // imageId: number=0;
  // cartId:number=0;
  

  constructor(public router: Router, public service: ServiceService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("No user logged in");
      return;
    }
    this.service.getAddToCart(userId).subscribe(
      (res:any) => {
        this.cartItems = res as Model[];
        // const cartId = this.cartItems.map(item => item.cartId);
        // localStorage.setItem('cartId', JSON.stringify(cartId));
        this.dataSource = new MatTableDataSource<Model>(this.cartItems);
        this.calculateTotal();
      },
     error => alert("Failed to get cart items for this user")
    );
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("Price",this.totalPrice)
  }

  // updateQuantity(img: Model, quantity: number): void {
  //   const userId=img.userId;
  //   const cartId=img.cartId;
  //   const Quantity=img.quantity;
  //   const cartObj={
  //     userId: userId,
  //     cartId: cartId,
  //     quantity:Quantity
  //   }
  //   this.service.editCart(cartObj).subscribe((res:Model[])=>{
  //     let user = JSON.stringify(localStorage.getItem('cartId'));
  //     // let userId = user && JSON.stringify(user);
  //     if(user !== null && parseInt(user) == this.cartId){
  //     if (quantity < 1) return;
  //     img.quantity = quantity;
  //     this.calculateTotal();
  //     console.log("edited",res);
  //     }
  //   })
  // //}
  // }
  updateQuantity(img:Model,quantity:number):void{
    if (quantity < 1) return;
    this.service.editCart(img.cartId,quantity).subscribe((res:any)=>{
      //let user = localStorage.getItem('cartId');
      // if(img.cartId !== null && img.cartId == img.cartId)
      // {
      img.quantity = quantity;
      this.calculateTotal();
      console.log("edited",res);
      //}
    })
  }

  removeItem(cartId: number) {
    this.service.deleteCart(cartId).subscribe((res:any)=>{
      this.cartItems = this.cartItems.filter(item => item.imageId !== cartId);
      this.calculateTotal();
      // this.cartItems.splice(index);
      // this.calculateTotal();
      window.location.reload();
      console.log("deleted",res)
    })
  }

  // updateItem(selectedRecord:Model){
  //   this.service.editCart(this.cartId,this.quantity,this.userId).subscribe((res:any)=>{
  //     Object.assign({},selectedRecord);
  //     console.log("edited",res)
  //   })
  // }

  

  home() {
    this.router.navigate(['/dashboard']);
  }

  onLogOut() {
    localStorage.removeItem("login");
    localStorage.removeItem("roleId");
    localStorage.removeItem("userId");
    this.router.navigate(["/login"]);
  }

}
