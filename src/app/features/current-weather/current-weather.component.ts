import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { Subscription } from 'rxjs';
import { HourlyForecastComponent } from "../hourly-forecast/hourly-forecast.component";
import { CurrentWeatherResponse, DailyForecast, HourlyForecast } from '../../interfaces/current-weather';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, HourlyForecastComponent],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent  implements  OnInit{
  @Input() city: string | undefined;

  currentWeather!:CurrentWeatherResponse;
  hourlyForecast!: HourlyForecast ;
  dailyForecast!: DailyForecast;
  error: any = null;
  loading!: boolean ;
  constructor(private _CurrentWeatherService:CurrentWeatherService) { }

  ngOnInit(): void {
    this.loading = this._CurrentWeatherService.isLoading.getValue();
    this.allDataForWeather();
   

  }



  allDataForWeather() {
    this.loading = true;
    this._CurrentWeatherService.allDataForWeather.subscribe({
       next:(data) => {
      this.currentWeather = data;
      this.hourlyForecast =data.hourly.data;
      this.dailyForecast = data.daily.data;
      this.loading = this._CurrentWeatherService.isLoading.getValue();
      console.log('Weather data: from COMP... 2', this.currentWeather);
    },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error fetching weather data:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
   
    }
     


}
