import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeatherService } from './services/current-weather.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CurrentWeatherComponent } from './features/current-weather/current-weather.component';
import { HourlyForecastComponent } from "./features/hourly-forecast/hourly-forecast.component";
import { CurrentWeatherResponse } from './interfaces/current-weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CurrentWeatherComponent, HourlyForecastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @Input() city: string|undefined ;
  title = 'weather-app';
  weatherData!: CurrentWeatherResponse;
  constructor(private _CurrentWeatherService: CurrentWeatherService) {}
  ngOnInit(): void {

  this.cityChanges()

  }


  cityChanges(){
    this._CurrentWeatherService.city$.subscribe((newCity) => {
      if (newCity) {
        this.city = newCity;
        this.fetchWeatherData(newCity);
      }
    });
  }

  fetchWeatherData(city: string): void {
    this._CurrentWeatherService.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data; 
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
      }
    });
  }
}