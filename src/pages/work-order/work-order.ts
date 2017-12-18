import { OperationCategoryPage } from './../operation-category/operation-category';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as moment from 'moment'
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ModalStartDocPage } from '../modal-start-doc/modal-start-doc'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-work-order',
  templateUrl: 'work-order.html',
})
export class WorkOrderPage {
  public options: CameraOptions = {
    quality: 50,
    correctOrientation: true,
    targetHeight: 1080,
    targetWidth: 1920,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  public order: any = {}
  constructor(public camera: Camera, public file: File, public data: DataProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    if(navParams.get("order")) {
      this.order = navParams.get("order");  
      if(this.order.GPSCOORDINATES.length > 0) {
        this.order.GPSCOORDINATES = this.order.GPSCOORDINATES
          .split(',') 
          .map(coordinate => Number(coordinate).toFixed(6))
          .join(',')
      } 
    } 
  }

  ionViewDidLoad() {
  }

  onAckModal = (data) => {  
    return new Promise((resolve, reject) =>{
      if(data.isAck){
        this.updateWOStart()
        this.order.ACKNOWLEDGEMENT = 'XX'
      }
      this.order.isChanged = true;
      resolve();
    });

  }
  updateWOStart(){
    this.order.GPSCOORDINATES = '10.000000,11.000000'
    this.order.STARTDATE = new Date() 
    this.order.FINISHDATE = new Date() 
    this.order.STARTTIME = moment(new Date()).format('HHmmss')
    this.order.FINISHTIME = new Date()   
    delete this.order.photos
    this.data.updateWorkOrder(this.order)
  }
  

  startTracking() {
    console.log('start tracking')
    // this.order.GPSCOORDINATES = `${resp.coords.latitude.toFixed(6)},${resp.coords.longitude.toFixed(6)}`

    if(this.order.STARTTIME == '000000'){
      //show modal
      if(this.order.ACTIVITYTYPE == 'FUL'){
        if(this.order.documentUrl != ''){
          let modal = this.modalCtrl.create(ModalStartDocPage, {callback: this.onAckModal, order: this.order});
          modal.present();
        }
      }
      else{
        this.updateWOStart();
      }
            
    }
    else{
      //don't show modal
      //Update Start Time
      this.updateWOStart();
    }
    
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log('I have location')
    //   this.order.GPSCOORDINATES = `${resp.coords.latitude.toFixed(6)},${resp.coords.longitude.toFixed(6)}`
    //   this.order.STARTDATE = new Date() 
    //   this.order.FINISHDATE = new Date() 
    //   this.order.STARTTIME = moment(new Date()).format('HHmmss')
    //   this.order.FINISHTIME = new Date()   
    //   this.data.updateWorkOrder(this.order)
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
  }

  showOperations(order){
    if(order.STARTTIME == '000000') return this.showAlert2()
    this.navCtrl.push(OperationCategoryPage, { order: order });
  }

  showAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Start Work!',
      subTitle: 'Please start work to see operations',
      buttons: ['OK']
    });
    alert.present();
  }

  takePicture() {


    const photoFileName = this.data.createPhotoFileName(this.order.ORDERID);
    this.camera.getPicture(this.options).then(imageURI => {
      let originalPath = imageURI.substring(0, imageURI.lastIndexOf("/")+1);
      let originalFileName = imageURI.substring(imageURI.lastIndexOf("/")+1, imageURI.length);
      return Promise.resolve({originalPath, originalFileName})
    })
    .then(({originalPath, originalFileName}) => this.file.copyFile(originalPath, originalFileName, this.file.dataDirectory, photoFileName))    
    .then(entry => {
      if(!this.order.photoLinks) Object.assign(this.order, {photoLinks: []}) //workOrder.photoLinks = []
      if(!this.order.photos) Object.assign(this.order, {photos: []}) // workOrder.photos = []
      this.order.photos.push({operationId: null, name: photoFileName})
      this.order.photoLinks.push(this.data.normalizeURL(this.file.dataDirectory) + photoFileName)
      this.order.isChanged = true        
      this.data.updateWorkOrder(this.order)
      if(this.data.getNetworkStatus()) {
        this.data.uploadOfflinePhoto(photoFileName, 'image/jpeg')
      }
      console.log('photo added')
    })
    .catch(err => console.log(err))

  }


}
