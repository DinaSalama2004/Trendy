import { Component, computed, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { Router, RouterLink  ,RouterLinkActive} from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translat/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive , TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit   {

isLoggin=input<boolean>(false)  // better in performance compared to old way 
private readonly router=inject(Router)
private readonly cartService=inject(CartService)
isDarkMode = signal<boolean> (false);
private readonly platformId = inject(PLATFORM_ID);
readonly numOfItemsInCart = computed(() => this.cartService.numberOfCartItems());
  constructor( private flowbiteService: FlowbiteService , private translateService:MyTranslateService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.flowbiteService.loadFlowbite(() => initFlowbite());

      // Check initial theme from <html> attribute
      const htmlElement = document.documentElement;
      const isDark = htmlElement.getAttribute('data-theme') === 'dark';
      this.isDarkMode.set(isDark);
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      const isCurrentlyDark = htmlElement.getAttribute('data-theme') === 'dark';

      if (isCurrentlyDark) {
        htmlElement.removeAttribute('data-theme');
        this.isDarkMode.set(false);
      } else {
        htmlElement.setAttribute('data-theme', 'dark');
        this.isDarkMode.set(true);
      }
    }
  }






  signOut():void{
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }


  changeLang():void{
    

    if(localStorage.getItem('lang')==='en')
    {
    this.translateService.changeLang('en')

    }
    else{
    this.translateService.changeLang('arb')

    }

    
  }
}