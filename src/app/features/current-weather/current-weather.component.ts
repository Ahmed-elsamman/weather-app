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
  loading!: boolean ;
  constructor(private _CurrentWeatherService:CurrentWeatherService) { }

  ngOnInit(): void {
    this.loading = this._CurrentWeatherService.isLoading.getValue();
    console.log('Loading status from COMP... 1', this.loading);
    this.allDataForWeather();
    console.log('Loading status from COMP... 3', this.loading);

  }
  allDataForWeather() {
    this.loading = true;
    console.log('Fetching all data for weather from COMP... 1 ',this._CurrentWeatherService.allDataForWeather.getValue());
    this._CurrentWeatherService.allDataForWeather.subscribe({
       next:(data) => {
      this.currentWeather = data.current;
      this.loading = this._CurrentWeatherService.isLoading.getValue();
      console.log('Loading status from COMP... 2', this.loading);
      console.log('Weather data: from COMP... 2', this.currentWeather);
    }
    ,error: (error) => {
      this.error = error;
      console.error('Error fetching weather data:', error);
    }
  });
    }
     
    
   
  

}
