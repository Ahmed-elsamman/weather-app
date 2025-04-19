import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
allDataForWeather:BehaviorSubject<any> = new BehaviorSubject<any>(null);
isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private  _http: HttpClient) { }

  getCurrentWeather(place_id: string) {
    this.isLoading.next(true);

   let weather= this._http.get(`${environment.api}/point?place_id=${place_id}&sections=all&timezone=UTC&language=en&units=metric&key=${environment.api_key}`);
    weather.subscribe((data) => {
        this.allDataForWeather.next(data);
        this.isLoading.next(false);
      });
  }
}
