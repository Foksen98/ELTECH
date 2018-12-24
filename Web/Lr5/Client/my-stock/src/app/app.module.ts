import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { BrokersComponent } from './brokers/brokers.component';
import { StocksComponent } from './stocks/stocks.component';
import { BrokerCardComponent } from './broker-card/broker-card.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { BrokerFormComponent } from './broker-form/broker-form.component';
import { StockFormComponent } from './stock-form/stock-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    BrokersComponent,
    StocksComponent,
    BrokerCardComponent,
    StockCardComponent,
    BrokerFormComponent,
    StockFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
