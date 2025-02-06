import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from './services/socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'table_booking';
  foodItems: any[] = [1,2,3,4,5]; // List to store food items
  socketSubscription!: Subscription;

  constructor(private socketService: SocketService){

  }

  ngOnInit(): void {
    this.socketSubscription=this.socketService.onFoodItemAdded().subscribe((fooditems)=>{
      // this.foodItems.push(fooditems)
      console.log(fooditems)
    })
  }

  ngOnDestroy(): void {
    if(this.socketSubscription){
      this.socketSubscription.unsubscribe()
    }
  }

}
