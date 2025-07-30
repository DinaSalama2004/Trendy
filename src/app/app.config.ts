import { loadingInterceptor } from './loading/loading.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling,  } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {provideAnimations}  from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import {importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// function to  to load files form interlization i18n  translate 
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([errorInterceptor , loadingInterceptor])  ),
    provideAnimations(),
    provideToastr(), 
    importProvidersFrom (
      NgxSpinnerModule  ,
      // to enable translate
      TranslateModule.forRoot({
        defaultLanguage:'en',
        loader:{

          provide : TranslateLoader ,
          useFactory:HttpLoaderFactory,
          deps:[HttpClient]

        }
      })
       
    
    ),
    provideRouter(
      routes ,

    //  when the page has conenet large that have scroll i want when open page start from top for example 
    // 3 types 
    // 1- disabled default  means  لما يتحرك من روت ل التانية مش بيرجع السكرول ل فوق 
    // 2-  top  ده بقا بيرجع ل فوق بس لو عملت باك هيرجع بردو ل فوق و ده مش احسن حاج=ة 
    // 3-  enabled  ده علشان احل التوب اني لما ارجع ينزلني عند نفس الحته اللي انا كنت فيها 
    
      withInMemoryScrolling({scrollPositionRestoration:"enabled"})),
    
  
  ]
};


