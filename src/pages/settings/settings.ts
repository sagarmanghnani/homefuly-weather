import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jsonp } from '@angular/http';
import {HomePage} from '../home/home';
import {WeatherConditionProvider} from '../../providers/weather-condition/weather-condition';
import * as products from "../../app/weathercondition.json";

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
  formData:any;
  isDataLoaded:boolean = false;
  weatherinfoLoaded:any;
  classes:any = {
    "clearSky":false,
    "rainy":false,
    "foggy":false,
  }
  setimageSrc:string;
  displayDate:any;
  setCss:string;
  temperature:number;
  humidity:any;
  wind:any;
  descriptions:any;
  min:any;
  max:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public weathers:WeatherProvider,public formBuilder:FormBuilder, public modaltCrl:ModalController, public weatherCondition:WeatherConditionProvider,
    ) {
      this.location = formBuilder.group({
        city:['', Validators.compose([Validators.pattern('[a-zA-z]*'), Validators.required])],
      })
    this.checkLocationExist();
    //this.conditionalIcons();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getDate();
  }

  checkLocationExist()
  {
    //this.clears();
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
              this.isDataLoaded = true;
              this.weatherinfoLoaded = res;
              this.storage.set('City', res.name);
              this.conditionalIcons();
              this.setVariable();
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
                this.isDataLoaded = true;
                console.log("else");
                console.log(res);
                this.weatherinfoLoaded = res;
                this.conditionalIcons();
                this.setVariable();
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

  addSearchBox()
  {
    let addModal = this.modaltCrl.create(HomePage);
    addModal.onDidDismiss((item) => {
      if(item)
      {
        this.weatherinfoLoaded = item;
        console.log(this.weatherinfoLoaded);
        this.conditionalIcons();
        this.setVariable(); 
        //console.log(this.weatherinfoLoaded.main.temp);
      }
      
    });
    addModal.present();
  }

  conditionalCss()
  {

  }

  conditionalIcons()
  { 
    var condition = this.weatherinfoLoaded.weather[0].id;
    console.log(condition);
    var options = products[condition];
    console.log(options);
    this.setimageSrc = options.icon;
    this.setCss = options.class;
  }

  getDate()
  {
    var date = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var getDays = weekday[date.getDay()];
    var today = date.toDateString();
     this.displayDate = today.substring(today.indexOf(' '));
  }

  
  setVariable()
  {
    this.temperature = Math.round(this.weatherinfoLoaded.main.temp - 273.15);
    this.descriptions = this.weatherinfoLoaded.weather[0].main;
    this.city = this.weatherinfoLoaded.name;
    this.humidity = this.weatherinfoLoaded.main.humidity;
    this.wind = this.weatherinfoLoaded.wind.speed;
    this.min = this.weatherinfoLoaded.main.temp_min;
    this.max = this.weatherinfoLoaded.main.temp_min;
    console.log(this.city);
  }


}
