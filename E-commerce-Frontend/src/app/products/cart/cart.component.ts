import { Component,OnInit} from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allcartitems:any=[]; 
  totalprice:number=0;
  paymentstatus:boolean=false;

  username:string=''
  housenumber:string=''
  street:string=''
  pincode:string=''
  state:string=''


  constructor(private cartFB:FormBuilder ,private api:ApiService){}

  addressform=this.cartFB.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    houseno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    streetname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],


  })


  ngOnInit(): void {
    this.api.getcartitems().subscribe((result:any)=>{
      this.allcartitems = result; //array of data
      console.log(this.allcartitems)
      //call getcarttotal
      this.getcarttotal() 

    },
    (result:any)=>{
      console.log(result.error)
    } 
    )
  }
  //remove cart item
  removecartitem(id:any){
    this.api.removecartitem(id).subscribe((result:any)=>{
      this.allcartitems=result
      this.api.cartcount()
      this.getcarttotal()
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  // total price
  getcarttotal(){
    let total = 0;
    this.allcartitems.forEach((item:any)=>{
      total=total+item.grandTotal
      this.totalprice =Math.ceil(total);
    })
  }

  // increment cart count
  incrementcount(id:any){
    this.api.incrementcartcount(id).subscribe((result:any)=>{
      console.log(result)
      this.allcartitems=result;  //assigning the updated result
      this.getcarttotal()
    },
    (result:any)=>{
      alert(result.error)
    }
    )

  }

  //decrement cart count
  decrementcartcount(id:any){
    this.api.decrementcartcount(id).subscribe((result:any)=>{
      console.log(result)
      this.allcartitems=result;  //assigning the updated result
      this.getcarttotal()
    },
    (result:any)=>{
      alert(result.error)
    }
    )

  }

  // submit form
  submitform(){
    if(this.addressform.valid){
      this.paymentstatus=true;
      console.log(this.addressform)
      this.username = this.addressform.value.username ||""
      this.housenumber = this.addressform.value.houseno ||""
      this.street = this.addressform.value.streetname ||""
      this.pincode = this.addressform.value.pincode ||""
      this.state = this.addressform.value.state ||""
    }
    else{
      alert('please enter correct details')
    }
  }

}
