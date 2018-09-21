import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jsonp } from '@angular/http';

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
  city:string;
  location:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public weathers:WeatherProvider,public formBuilder:FormBuilder, 
    ) {
      this.location = formBuilder.group({
        city:['', Validators.compose([Validators.pattern('[a-zA-z]*'), Validators.required])],
      })
    this.checkLocationExist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  checkLocationExist()
  {
    this.clears();
    this.storage.length().then((length) => {
      console.log(length);
      if(length == 0)
      {
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition((position) => {resolve([position.coords.latitude, position.coords.longitude])});
        }).then((position) => {
          //console.log(position[0]);//0 for latitude 1 for longitude
          //console.log(position[1]);
          this.latitude = position[0];
          this.longitude = position[1];
         // console.log(this.latitude);
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
