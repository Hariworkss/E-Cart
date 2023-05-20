import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to hold search value
  searchTerm = new BehaviorSubject('')              //assigning behaviour sub  to send string to dif/t components

  // to hold cart count
  cartitemcount = new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    this.cartcount()
   }

  BASE_URL='http://localhost:5000'
  //api call for getallproducts
  getallproducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  //api call for viewproduct
  viewproduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }
  
  //api call - add to wishlist
  addtowishlist(id:any,title:any,price:any,image:any){
    const body = {
      id,title,price,image
    }
    return this.http.post(`${this.BASE_URL}/wishlist/add-to-wishlist`,body)
  }

  //api call - get all items from wishlist
  getwishlistitems(){
    return this.http.get(`${this.BASE_URL}/wishlist/get-wishlist`)
  }

  //api - remove wishlist item
  removewishlistitem(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-wishlist-item/${id}`)
  }

  //add to cart
  addtocart(product:any){
    const body = {
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.BASE_URL}/cart/add-to-cart`,body)
  }
  
  //get all cart-items
  getcartitems(){
    return this.http.get(`${this.BASE_URL}/cart/get-cart`)
  }

  // cart item count
  cartcount(){
    this.getcartitems().subscribe((result:any)=>{
      this.cartitemcount.next(result.length);  //passing array length to cartitemcount-behavioursubject with next method
    })
  }

  // remove cart item
  removecartitem(id:any){
    return this.http.delete(`${this.BASE_URL}/cart/remove-cart-item/${id}`)

  }

  //increment cart item
  incrementcartcount(id:any){
    return this.http.get(`${this.BASE_URL}/cart/increment-count/${id}`)

  }

  //deccrement cart item
  decrementcartcount(id:any){
    return this.http.delete(`${this.BASE_URL}/cart/decrement-count/${id}`)

  }

}
