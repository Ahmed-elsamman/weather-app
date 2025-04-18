import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from '../../services/current-weather.service';
import { error, log } from 'console';
import { CommonModule } from '@angular/common';
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
    this._CurrentWeatherService.getCurrentWeather(place_id).subscribe({
      next: (data: any) => {
        this.loading = true;
        this._CurrentWeatherService.allDataForWeather = data;
        this.loading = false;
        console.log('Weather data:', data);
      },
      error: (err: any) => {
        this.error = err;
        this.loading = false;
        // console.error('Error fetching weather data:', err);
      }
    });
    
  }

  onLocationButtonClick(): void {
    if (this.city) {
      this.getCurrentWeather(this.city);
      // console.log('City:', this.city);
    } else {
      this.getDeviceLocation();
    }
  }

  private getDeviceLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.loading = true;
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.fetchCityFromCoordinates(this.latitude, this.longitude);
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.loading = false;
          // console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  private fetchCityFromCoordinates(lat: number, lon: number): void {
    const geocodingApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

    this.http.get<any>(geocodingApiUrl).subscribe({
      next: (data) => {
        this.loading = true;
        this.city = data.city || data.locality || 'Unknown';
        console.log('Fetched city:', this.city);
        this.getCurrentWeather(this.city);
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
        // console.error('Error fetching city from coordinates:', err);
      }
    });
  }
}