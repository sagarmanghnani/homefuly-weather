import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

/*
  Generated class for the WeatherConditionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherConditionProvider {

  constructor(public http: Http) {
    console.log('Hello WeatherConditionProvider Provider');
  }

  getData()
  {
    return this.http.get('../../pages/settings/weatherconditions.json').map(res => res.json());
  }

}
