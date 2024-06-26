
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenderComponent } from './components/render/render.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficaComponent } from './components/grafica/grafica.component';
import { environment } from './environments/environment';
import {HttpClientModule} from '@angular/common/http'

const config: SocketIoConfig = {
  url: environment.wsUrl, options: {transports:['websocket', 'polling']}
};

@NgModule({
  declarations: [
    AppComponent,
    RenderComponent,
    GraficaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgApexchartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
