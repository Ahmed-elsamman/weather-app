import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
allDataForWeather:any|null
//www.meteosource.com/api/v1/free/point?place_id=cairo&sections=all&timezone=UTC&language=en&units=metric&key=vwaj19gzgy2jdvb3zldxsujqftctmx9p6kril7hy
  constructor(private  _http: HttpClient) { }

  getCurrentWeather(place_id: string) {
    // Mock data for current weather
    return  this._http.get(`${environment.api}/point?place_id=${place_id}&sections=all&timezone=UTC&language=en&units=metric&key=${environment.api_key}`);
  
  }
}
