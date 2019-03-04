import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { BrokersComponent } from './brokers/brokers.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: 'brokers', component: BrokersComponent},
  {path: 'stocks', component: StocksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
