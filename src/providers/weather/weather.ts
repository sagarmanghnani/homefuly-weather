import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKeyWeather = "3cf05012b4055608cf3b66234acc1f43";
  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
  }

  getWeather(lat, lon)
  {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+this.apiKeyWeather).map(res => res.json());
  }

  getWeatherCity(city)
  {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKeyWeather);
  }

  getGeocode(city, country)
  {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ city + "+" + country + "&key=" + "AIzaSyCVA_4jw6LE8aRbeIbHjZV0ZObC-s3ag-k");
  }



}
