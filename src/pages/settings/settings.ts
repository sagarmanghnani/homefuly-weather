import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  weatherInfo:any;
  latitude:any;
  longitude:any;
  key:any = [];
  values:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public weathers:WeatherProvider) {
    this.checkLocationExist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  checkLocationExist()
  {
    //this.clears();
    this.storage.length().then((length) => {
      console.log(length);
      if(length == 0)
      {
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition((position) => resolve(position));
        }).then((value) => {
         
          this.latitude = value.coords.latitude;
          this.longitude = value.coords.longitude;
          console.log(this.latitude);
          //this.storage.set('latitude', this.latitude);
          //this.storage.set('longitude', this.longitude);
          new Promise((resolve, reject) => {
            this.weatherInfo = this.weathers.getWeather(this.latitude, this.longitude)
            resolve();
          }).then(() => {
            this.weatherInfo.subscribe(res => {
              console.log(res);
              this.storage.set('City', res.name);
            })
          });
        })
      }
      else
      {
          this.storage.get('City').then(value => {
            new Promise((resolve, reject)=>{
              this.weatherInfo = this.weathers.getWeatherCity(value)
              resolve();
            }).then(() => {
              this.weatherInfo.subscribe(res => {
                console.log("else");
                console.log(res);
              })
            })
          })
      }
    })
  }

  clears()
  {
    this.storage.clear();
  }
  


}
