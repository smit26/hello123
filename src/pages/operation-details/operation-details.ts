import { File } from '@ionic-native/file';
import { Component, ApplicationRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { DataProvider } from '../../providers/data/data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the OperationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operation-details',
  templateUrl: 'operation-details.html',
})
export class OperationDetailsPage {

  orderNum;
  public operation: any = {};
  public order: any = {}
  public options: CameraOptions = {
    quality: 50,
    correctOrientation: true,
    targetHeight: 1080,
    targetWidth: 1920,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }

  constructor(public appRef: ApplicationRef, public navCtrl: NavController, public file: File, public camera: Camera, public navParams: NavParams, public data: DataProvider, public alertCtrl: AlertController) {
    this.operation = navParams.get("operation");
    this.order = navParams.get("order");
    // this.data.getOperationPhotos(this.operation, this.order)
  }

  ionViewDidLoad() {}

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    this.saveOperationChanges()
  }

  updateOperation(operation: any, isGood: boolean) {
    isGood ? this.operation.STATE = 'G' : this.operation.STATE = 'NG'

    this.appRef.tick()
  }

  saveOperationChanges() {
    this.operation.isChanged = true
    this.order.operationChanged = true
    console.log(this.order)
    this.data.updateWorkOrder(this.order)  
  }

  takePicture() {
    
    // take photo and add it to work order

    const photoFileName = this.data.createPhotoFileName(this.order.ORDERID);
    this.camera.getPicture(this.options).then(imageURI => {
      let originalPath = imageURI.substring(0, imageURI.lastIndexOf("/")+1);
      let originalFileName = imageURI.substring(imageURI.lastIndexOf("/")+1, imageURI.length);
      return Promise.resolve({originalPath, originalFileName})
    })
      .then(({originalPath, originalFileName}) => this.file.copyFile(originalPath, originalFileName, this.file.dataDirectory, photoFileName))    
      // .then(entry => this.offlineData.readData('workOrders'))
      .then(entry => {
      // .then(workOrders => Promise.resolve(workOrders.filter(workOrder => workOrder.ORDERID == this.order.ORDERID)[0]))
      // .then(workOrder => {
        if(!this.order.photoLinks) this.order.photoLinks = []
        if(!this.order.photoLinks.photos) this.order.photoLinks.photos = []
        this.order.photos.push({operationId: this.operation.ACTIVITY, name: photoFileName})
        this.order.photoLinks.push(this.data.normalizeURL(this.file.dataDirectory) + photoFileName)
        this.operation.photos.push({operationId: this.operation.ACTIVITY, name: photoFileName})
        this.operation.photoLinks.push(this.data.normalizeURL(this.file.dataDirectory) + photoFileName)        
        this.order.photoLinks.isChanged = true        
        // this.order = workOrder
        this.order.OrderOperations.results.map(operation => {
          if(operation.ACTIVITY == this.operation.ACTIVITY) 
            operation = this.operation
        })

        //almir
        if(this.data.getNetworkStatus()) {
          this.data.uploadOfflinePhoto(photoFileName, 'image/jpeg')
        } else {
          console.log('added photos')
          // this.offlineData.createBulkData('uploadPhotos', [{name: photoFileName}])
        }

    }).catch(err => console.log(err))

  }

}
