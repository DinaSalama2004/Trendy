import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { FooterComponent } from "../../pages/footer/footer.component";

@Component({
  selector: 'app-blank',
  imports: [NavbarComponent, FooterComponent ,RouterOutlet ],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
