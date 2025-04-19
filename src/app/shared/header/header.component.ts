import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  city!: string ;
  latitude: number | null = null;
  longitude: number | null = null;
  error: any;
  loading: boolean = false;
  // allDataForWeather
  constructor(
    private _CurrentWeatherService: CurrentWeatherService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  this.onLocationButtonClick()
  }
  
  toggleTheme(): void {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
  }


  getCurrentWeather(place_id: string): void {
    this._CurrentWeatherService.getCurrentWeather(place_id)
    this._CurrentWeatherService.city.next(place_id);
    console.log('Fetching current city from header :', this._CurrentWeatherService.city.getValue());
    
  }
    


  onLocationButtonClick(): void {
    if (this.city) {
      this.getCurrentWeather(this.city);

    } else {
      this.getDeviceLocation();

    }
  };

  private getDeviceLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.fetchCityFromCoordinates(this.latitude, this.longitude);
        },
        (error) => {
          this.error = error;
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  private fetchCityFromCoordinates(lat: number, lon: number): void {
    const geocodingApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

    this.http.get<any>(geocodingApiUrl).subscribe({
      next: (data) => {
        this.city = data.city || data.locality || 'Unknown';
        this.getCurrentWeather(this.city);
          },
      error: (err) => {
        this.error = err;
      }
    });
  }
}