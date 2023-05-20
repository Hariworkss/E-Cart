import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{
  productId:string='';

  discountper:number=0

  product:any={}
  constructor(private viewactivatedRoute:ActivatedRoute , private api:ApiService){}

  ngOnInit(): void{
    this.viewactivatedRoute.params.subscribe((data:any)=>{
      console.log(data.id)
      this.productId=data.id;
    })
    this.api.viewproduct(this.productId).subscribe((result:any)=>{
      console.log(result)
      this.product=result;
      // logic for discount %
      this.discountper = Math.trunc((6/this.product.price)*100)  //converted to percentage and sliced to decimal
      console.log(this.discountper)
      

    },
    (result:any)=>{
      console.log(result.error)
    }
    )

  }

  //add to wishlist
  addtoWishlist(){
    const {id,title,price,image} = this.product
    //api call
    this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
      alert(result)
      console.log(result)
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  // add to cart
  addtocart(product:any){
    console.log(product)
    //add quantity  'cause there's no quantity inside product
     Object.assign(product,{quantity:1})     //adding by assign property
     this.api.addtocart(product).subscribe((result:any)=>{
      alert(result)
      this.api.cartcount()
     },
     (result:any)=>{
      alert(result.error)
     }
     )

  }

}
