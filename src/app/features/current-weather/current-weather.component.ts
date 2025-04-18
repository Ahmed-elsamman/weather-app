import { Component } from '@angular/core';
import { CurrentWeatherService } from '../../services/current-weather.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent {
  currentWeather: any;
  error: any;
  loading: boolean = false;
  constructor(private _CurrentWeatherService:CurrentWeatherService) { }

  ngOnInit(): void {
    this.allDataForWeather();
  }
  allDataForWeather() {
    this.loading = true;
    console.log('Fetching all data for weather...',this._CurrentWeatherService.allDataForWeather);
    
   }
  // getWeather(): void {
  //   this.loading = true;
  //   this._CurrentWeatherService.allDataForWeather?.subscribe({
  //     next: (data: any) => {
  //       this.currentWeather = data.current;
  //       this.loading = false;
  //     },
  //     error: (err: any) => {
  //       this.error = err;
  //       this.loading = false;
  //       console.error('Error fetching weather data:', err);
  //     }
  //   });
  // }

}
