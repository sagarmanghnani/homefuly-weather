import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
//declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  weatherdetails:any;
  constructor(public navCtrl: NavController, public weatherReport:WeatherProvider) {

  }

}


































/*ngOnInit()
  {
    this.initmap()
  }*/

  /*ionViewDidLoad() {
    this.initmap();
    }

  initmap()
  {
    var point = {lat:13, lng:80};
    var map = new google.maps.Map(document.getElementById('map'), {center:new google.maps.LatLng(43.071584, -89.380120),
    zoom:15})
    var marker = new google.maps.Marker({position: new google.maps.LatLng(43.071584, -89.380120), map:map})
  }*/