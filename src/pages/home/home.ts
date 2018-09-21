import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  weatherdetails:any;
  searchQuery:string = '';
  map: any;
  markers = [];
  constructor(public navCtrl: NavController, public weatherReport:WeatherProvider) {

  }

  /*public searchbox(ev:any)
  {
    let val = ev.target.value;
    var autocomplete = new google.maps.places.Autocomplete(val);
  }*/

  ngOnInit() {
    this.initMap();
    }
    

  private initMap() {
    var point = {lat: 13.038039, lng: 80.21597};
    let divMap = (<HTMLInputElement>document.getElementById('map'));
    this.map = new google.maps.Map(divMap, {
    center: point,
    zoom: 15,
    disableDefaultUI: true,
    draggable: false,
    zoomControl: true
    });
    
    this.createMapMarker(point);
    }
    
    private createMapMarker(place:any):void {
    var marker = new google.maps.Marker({
    map: this.map,
    position: place
    });
    this.markers.push(marker);
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