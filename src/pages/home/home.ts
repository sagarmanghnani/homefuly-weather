import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
import {catchError, flatMap} from 'rxjs/operators';
import 'rxjs/add/operator/mergeMap';
import { Storage } from '@ionic/storage';


declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

    

export class HomePage implements OnInit {
  
    autocompleteItems: any;
    autocomplete: any;
    acService:any;
    placesService: any;
    city:string;
    state:string;
    address:string;
    country:string;
    tempWeatherinfo:string;
    lat:any;
    lon:any;
    weatherInfo:any;
    firstObservable:any;
    secondObservable:any;
    constructor(public navCtrl: NavController, public weathers:WeatherProvider, public viewCtrl:ViewController, public storage:Storage) {

    }

    ngOnInit() {
      this.acService = new google.maps.places.AutocompleteService();        
      this.autocompleteItems = [];
      this.autocomplete = {
          query: ''
      };        
  }

  updateSearch()
  {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
  }

  let self = this;
  let config = {
    types:['geocode'],
    input:this.autocomplete.query,
     
  }

  this.acService.getPlacePredictions(config, function(predictions, status){
    self.autocompleteItems = [];
    console.log(predictions);
    predictions.forEach(prediction => {
      self.autocompleteItems.push(prediction);
    });
  });

  }


  selectCity(item)
  {
    this.address = item.description;
    var cityIndex = this.address.indexOf(',');
    this.city = this.address.substring(0, cityIndex);
    var countryIndex = this.address.lastIndexOf(',');
    this.country = this.address.substring(countryIndex + 2, this.address.length);
    if(item)
    {
      this.autocomplete.query = item.description;
      this.autocompleteItems = [''];
    }
  }

  sendDetails()
  {
    this.firstObservable = this.weathers.getGeocode(this.city, this.country).map(res => res.json());
    this.firstObservable.mergeMap(res => this.weathers.getWeather(res.results[0].geometry.location.lat,res.results[0].geometry.location.lng)).subscribe(res => {
      this.storage.clear();
      this.storage.set("City", this.city);
      this.viewCtrl.dismiss(res)});
  }

  close()
  {
    this.viewCtrl.dismiss();
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