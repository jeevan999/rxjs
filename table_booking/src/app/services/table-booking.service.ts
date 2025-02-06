import { Injectable } from '@angular/core';
import {io,Socket} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class TableBookingService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8000');
   }
}
