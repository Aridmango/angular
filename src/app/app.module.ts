import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrencyComponent } from './currency/currency.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { TableComponent } from './core/home/table/table.component';
import { SocialComponent } from './core/home/social/social.component';
import { FormatLargeNums } from './core/home/table/formatLargeNums.pipe';
import { CryptocompareComponent } from './core/home/social/cryptocompare/cryptocompare.component';
import { ChartsComponent } from './currency/charts/charts.component'


const appRoutes: Routes = [
  { path: 'currency/:id', component: CurrencyComponent },
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    HeaderComponent,
    HomeComponent,
    TableComponent,
    SocialComponent, 
    FormatLargeNums, 
    CryptocompareComponent, 
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes) //registers the routes with angular
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
