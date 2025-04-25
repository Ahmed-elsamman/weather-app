import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentWeatherResponse } from '../interfaces/current-weather';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
allDataForWeather:BehaviorSubject<any> = new BehaviorSubject<any>(null);
city: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
city$ = this.city.asObservable(); // Expose city as an observable
isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private  _http: HttpClient) { }

  getCurrentWeather(place_id: string):Observable<CurrentWeatherResponse> {
    this.isLoading.next(true);

   let weather= this._http.get<CurrentWeatherResponse>(`${environment.api}/point?place_id=${place_id}&sections=all&timezone=UTC&language=en&units=metric&key=${environment.api_key}`);
    weather.subscribe((data) => {
        this.allDataForWeather.next(data);
        this.isLoading.next(false);
      });
    return weather;
  }
   
}
