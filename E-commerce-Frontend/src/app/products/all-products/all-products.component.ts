import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
 allProducts:any=[]
 searchTerm:string=''

constructor(private api:ApiService){}
  ngOnInit(): void{
    this.api.getallproducts().subscribe((result:any)=>{
      console.log(result);   //array of products[20]
      this.allProducts = result;
    })
    // this.searchTerm= this.api.searchTerm
    //getting value from api.searchterm 
    this.api.searchTerm.subscribe((result)=>{
      this.searchTerm = result;
      console.log(this.searchTerm)
    })

  }

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
