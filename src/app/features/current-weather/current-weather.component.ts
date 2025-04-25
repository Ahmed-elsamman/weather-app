import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { Subscription } from 'rxjs';

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
  error: any = null;
  loading!: boolean ;
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
