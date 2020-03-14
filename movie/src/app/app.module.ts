import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HnResolver } from '@shared/router-resolver';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestroyModulesService } from './destroy-modules';
import { HttpInterceptorService } from './shared/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DestroyModulesService,
    HnResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
