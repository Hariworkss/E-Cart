import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  allwishlistitem:any=[]   //array to hold wishlist data
  constructor(private api:ApiService){}
  ngOnInit(): void {

    this.api.getwishlistitems().subscribe((result:any)=>{
      console.log(result)
      this.allwishlistitem = result;  //assigned array of data
    },
    (result:any)=>{
      console.log(result.error)
    }
    )
  }
  removewishlistitem(id:any){
    this.api.removewishlistitem(id).subscribe((result)=>{
      this.allwishlistitem = result;
      console.log(result)

    },
    (result:any)=>{
      console.log(result.error)
    }
    )
  }

  //add to cart
  addtocart(product:any){
    console.log(product)
    //add quantity  'cause there's no quantity inside product
     Object.assign(product,{quantity:1})     //adding by assign property
     this.api.addtocart(product).subscribe((result:any)=>{
      this.api.cartcount()
      this.removewishlistitem(product.id)
      alert(result)
     },
     (result:any)=>{
      alert(result.error)
     }
     )

  }
}
