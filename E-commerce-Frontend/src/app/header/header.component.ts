import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartcount:number=0
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.cartitemcount.subscribe((data:any)=>{
      console.log(data)
      this.cartcount = data;

    })
  }

  search(event:any){
    console.log(event.target.value) //key press value
    this.api.searchTerm.next(event.target.value)    //assignin value to searchterm in api , using next() of behaviour subject ,ie searchterm is beaviour subject now
  
    
  }
}
