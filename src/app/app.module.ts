import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import {NgxChartsModule}  from '@swimlane/ngx-charts'

const config: SocketIoConfig = {
  url: environment.wsUrl, options: {transports:['websocket', 'polling']}
};


import { AppComponent } from './app.component';
import { GraficaComponent } from './components/grafica/grafica.component';

@NgModule({
  declarations: [
    AppComponent,
    GraficaComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }