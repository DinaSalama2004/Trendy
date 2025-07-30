import { Component } from '@angular/core';
import { NgxSpinnerComponent } from "ngx-spinner";
import { NavbarComponent } from "./pages/navbar/navbar.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { RouterLink, RouterOutlet  ,RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent , RouterLink , RouterLinkActive , NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-commerce';
}
