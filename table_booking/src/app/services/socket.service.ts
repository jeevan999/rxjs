import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8000'); // Connect to the backend server
  }

  // Listen for the 'foodItemAdded' event
  onFoodItemAdded(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('foodItemAdded', (data) => {
        observer.next(data);
      });

      // Cleanup on unsubscribe
      return () => {
        this.socket.off('foodItemAdded');
      };
    });
  }
}
