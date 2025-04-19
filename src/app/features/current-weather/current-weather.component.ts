import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent  implements  OnInit{
  @Input() city: string | undefined;

  currentWeather: any=null;
  error: any;
  loading!: boolean ;
  // city: string | null = this._CurrentWeatherService.city.getValue() || null;
  constructor(private _CurrentWeatherService:CurrentWeatherService) { }

  ngOnInit(): void {
    this.loading = this._CurrentWeatherService.isLoading.getValue();
    this.allDataForWeather();
   

  }



  allDataForWeather() {
    this.loading = true;
    console.log('Fetching all data for weather from COMP... 1 ',this._CurrentWeatherService.allDataForWeather.getValue());
    this._CurrentWeatherService.allDataForWeather.subscribe({
       next:(data) => {
      this.currentWeather = data;
      this.loading = this._CurrentWeatherService.isLoading.getValue();
      console.log('Weather data: from COMP... 2', this.currentWeather);
    }
    ,error: (error) => {
      this.error = error;
      console.error('Error fetching weather data:', error);
    }
  });
    }
     
    
    // fetchWeather(): void {
    //   this.loading = true;
    //   this._CurrentWeatherService.getCurrentWeather(this.city).subscribe({
    //     next: (data) => {
    //       this.currentWeather = data.current;
    //       this.loading = false;
    //     },
    //     error: (err) => {
    //       this.error = err;
    //       console.error('Error fetching weather data:', err);
    //       this.loading = false;
    //     }
    //   });
    // }
  

}
