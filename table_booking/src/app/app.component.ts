import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AuthenticationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'table_booking';
}
