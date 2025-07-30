import { isPlatformBrowser } from '@angular/common';
import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {


  private renderer: Renderer2;
  // rendererFactory use it prefered  it's platform-safe
  constructor(private rendererFactory: RendererFactory2, private translateService: TranslateService, @Inject(PLATFORM_ID) private platformId: object) {

    this.renderer = rendererFactory.createRenderer(null, null);
    if (isPlatformBrowser(platformId)) {
      // 1) set default value 
      translateService.setDefaultLang('en')
      // 2)get language from localStorage 
      let language = localStorage.getItem('lang')
      // 3) use language 
      if (language) {
        this.translateService.use(language)
      }

      // 4) then change direction based on language 
      this.changeDirection()
    }

  }



  changeDirection(): void {

    if (localStorage.getItem('lang') == 'en') {

      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr')
      localStorage.setItem('lang', 'arb')
    }
    else {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl')
      localStorage.setItem('lang', 'en')

    }
  }


  changeLang( lang:string ): void{
 
    // 1) update localStorage 
    localStorage.setItem('lang' ,lang )

    // 2) use language  
    this.translateService.use(lang)

    // 3) change direction 
    this.changeDirection()
     
  }
}
