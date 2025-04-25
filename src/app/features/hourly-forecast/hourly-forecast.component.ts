import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [CarouselModule,],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss'
})
export class HourlyForecastComponent {
//  hourlyForecast!: HourlyForecast;
items:any[]=[
  {cloud_cover : {total: 60},
    date:  "2025-04-22T21:00:00",
    icon :  28,
    precipitation: {total: 0, type: 'none'},
    summary: "Partly clear",
    temperature: 29.5,
    weather : "partly_clear",
    wind : {speed: 1.5, dir: 'SSE', angle: 151},},



    {cloud_cover : {total: 60},
    date:  "2025-04-22T21:00:00",
    icon :  28,
    precipitation: {total: 0, type: 'none'},
    summary: "Partly clear",
    temperature: 29.5,
    weather : "partly_clear",
    wind : {speed: 1.5, dir: 'SSE', angle: 151},},
    {cloud_cover : {total: 60},
    date:  "2025-04-22T21:00:00",
    icon :  28,
    precipitation: {total: 0, type: 'none'},
    summary: "Partly clear",
    temperature: 29.5,
    weather : "partly_clear",
    wind : {speed: 1.5, dir: 'SSE', angle: 151},},
    {cloud_cover : {total: 60},
    date:  "2025-04-22T21:00:00",
    icon :  28,
    precipitation: {total: 0, type: 'none'},
    summary: "Partly clear",
    temperature: 29.5,
    weather : "partly_clear",
    wind : {speed: 1.5, dir: 'SSE', angle: 151},},
];

  // constructor( private _CurrentWeatherService: CurrentWeatherService) {}
   ngOnInit(){

    console.log('hourlyForecast from this')

   }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    // responsive: {
    //   0: {
    //     items: 1
    //   },

    nav: true
  }

  }



