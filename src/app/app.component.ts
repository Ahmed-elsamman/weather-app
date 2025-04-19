import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeatherService } from './services/current-weather.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CurrentWeatherComponent } from './features/current-weather/current-weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CurrentWeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @Input() city: string|undefined ; // Initialize city to null
  title = 'weather-app';
  // city: string | null = this._CurrentWeatherService.city.getValue() || null;

  constructor(private _CurrentWeatherService: CurrentWeatherService) {}
  ngOnInit(): void {
    // Subscribe to city changes
    this._CurrentWeatherService.city$.subscribe((newCity) => {
      if (newCity) {
        this.city = newCity;
        this.fetchWeatherData(newCity);
      }
    });
  }
  fetchWeatherData(city: string): void {
    this._CurrentWeatherService.getCurrentWeather(city);
  }

}