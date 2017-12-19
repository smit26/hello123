import { Http, Headers, RequestOptionsArgs  } from '@angular/http'
import { Injectable, EventEmitter, Output, ApplicationRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { sortBy, filter } from 'lodash'
import { Api } from '../api/api'
import * as moment from 'moment'

@Injectable()
export class DataProvider {

  @Output()
  workOrdersChange: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  maintenancePhotosChange: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  operationOrderChange: EventEmitter<any> = new EventEmitter<any>()

  public headers: Headers = new Headers()
  public baseUrl: string = 'https://ejziq61i3m.execute-api.us-west-2.amazonaws.com/dev'
  public workOrders: any = []

  constructor(public file: File, 
    public transfer: FileTransfer,
    public network: Network, 
    public http: Http, 
    public afAuth: AngularFireAuth, 
    public afs: AngularFirestore,
    public api: Api,
    public appRef: ApplicationRef
  ) {
    console.log('Hello DataProvider Provider');
  }

  getNetworkStatus() {
    return ['wifi', '2g', '3g', '4g'].indexOf(this.network.type) > -1;
  }

  normalizeURL (url) {
    return url ? url.replace('file://', '') : url
  }


  generateUUID() {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  createPhotoFileName (workOrderId: string) {
    const guidWithoutDash = this.generateUUID().replace(/[-]/g, '')
    return `${workOrderId}_${guidWithoutDash}.jpeg`
  };

  uploadOfflinePhoto(fileName, contentType) {
    const options = {
      fileKey: "file",
      fileName: fileName,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      timeout: 3600000,
      httpMethod:'PUT',
      encodeURI: false,
      headers: {
        'Content-Type': 'image/jpeg',
        'Connection': 'close'
      }
    };

    const fileTransfer = this.transfer.create();
    this.loginToAws({username: "smit1", password: "smit123"})  
    .subscribe(tokens => {
      console.log(tokens)
      const token = tokens.json().tokens.idToken.jwtToken
      localStorage.setItem('token', token)
      console.log('token: ', token)
      this.headers.delete('Authorization')
      this.headers.append('Authorization', token)
      this.getUploadLink(fileName)
      .subscribe(result => {
        fileTransfer.upload(this.file.dataDirectory + fileName, result.json().body, options) 
          .then(success => console.log('file uploaded'))
          .catch(err => console.log('upload failed ', err))
      })
    })

  }

  getDownloadLink(fileName) {
    let basicOptions:RequestOptionsArgs = {
      headers: this.headers,
    }
    return this.http.get(`${this.baseUrl}/get-download-url?name=${fileName}`, basicOptions)    
  }

  getUploadLink(fileName) {
    let basicOptions:RequestOptionsArgs = {
      headers: this.headers,
    }
    return this.http.get(`${this.baseUrl}/get-upload-url?name=${fileName}`, basicOptions)    
  }

  downloadFile(link, fileName) {
    const fileTransfer = this.transfer.create();
    fileTransfer.download(link, this.normalizeURL(this.file.dataDirectory) + fileName)
      .then(success => {
        console.log('downloaded new file, ', fileName)
        this.appRef.tick()
      })
      .catch(err => console.log('err, ', err))
  }

  getMaintenancePhotos(isRefresh: boolean) {
    if(this.getNetworkStatus() && isRefresh) 
      return this.getOnlineMaintenancePhotos()
    else 
      return Observable.fromPromise(this.getOfflineMaintenancePhotos())
  }

  getOfflineMaintenancePhotos() {
    return Promise.resolve()
    // return this.readData('maintenancePhotos')
  }

  getOnlineMaintenancePhotos() {
    let basicOptions:RequestOptionsArgs = {
      headers: this.headers,
    }
    return this.http.get(`${this.baseUrl}/maintenance-photos`, basicOptions)    
  }

  loginToAws(credentials) {
    let basicOptions:RequestOptionsArgs = {}
    return this.http.post(`${this.baseUrl}/login`, { username: credentials.username, password: credentials.password })
  }

  getWorkOrders() {
    this.loginToAws({username: "smit1", password: "smit123"})  
    .subscribe(tokens => {
      console.log(tokens)
      const token = tokens.json().tokens.idToken.jwtToken
      localStorage.setItem('token', token)
      console.log('token: ', token)
      this.headers.delete('Authorization')
      this.headers.append('Authorization', token)
      this.api.post('refreshWorkOrders', {token: token, plannerGroup: 'A1G'}).subscribe(data => console.log(data))  
    }, err => console.log(err))
  }

  getWorkOrderStatus(wo) {
    let status = 'Due soon'
    if (moment(wo.SCHEDULEDEND, 'YYYYMMDD').month() < moment(new Date()).month()) {status = 'Late'}  
    if (moment(wo.SCHEDULEDEND, 'YYYYMMDD').month() > moment(new Date()).month())  {status = 'Scheduled'}
    return status
  }

  getWorkOrderPhotos(workOrders) {
    let photoPromise
    let photosPromises = []    
    workOrders.map(wo => {
      // create photo link, check if photo exists, if not then do download
      wo.status = this.getWorkOrderStatus(wo)

      // const maint = maintenancePhotos.filter(photo => photo.maintPlanId == wo.MAINTPLAN) || []  
      // wo.maintenancePhotos = !! maint.length ? maint[0].photos : []    
      //temp 
      wo.maintenancePhotos = []      

      if(!wo.photos) wo.photos = []          
      wo.photos = wo.photos.concat(wo.maintenancePhotos)                    
      wo.photoLinks = []

      
      // wo.WorkOrderOnlyMaintenancePhotos = wo.maintenancePhotos.filter(photo => !photo.operationId)
      wo.WorkOrderOnlyPhotos = wo.photos.filter(photo => photo && !photo.operationId)      
      
      wo.WorkOrderOnlyPhotos.map(photo => {
        if(this.getNetworkStatus()) {
          photoPromise = this.file.checkFile(this.file.dataDirectory, photo.name)
            .then(success => wo.photoLinks.push(this.normalizeURL(this.file.dataDirectory) + photo.name))
            .catch(err => {
              this.getDownloadLink(photo.name).subscribe(response => {
                wo.photoLinks.push(response.json().body) //all photos
                
                this.downloadFile(response.json().body, photo.name)
              })   
            })
        } else {
          photoPromise = Promise.resolve(wo.photoLinks.push(this.normalizeURL(this.file.dataDirectory) + photo.name))              
        }
        photosPromises.push(photoPromise)
      })
      return wo                      
    })
    Promise.all(photosPromises).then(() => {
      workOrders.photoLinks = sortBy(workOrders.photoLinks)
      // this.maintenancePhotosChange.emit(maintenancePhotos)    
      console.log(workOrders.length)    
      workOrders = workOrders.filter(order => {
        return order.SYSTEMSTATUS.substring(0, 4) != 'TECO' || order.closedWhenOffline
      }) 
      console.log('sorted  filtered' )
      // this.workOrdersChange.emit(this.workOrders) 
      workOrders = sortBy(workOrders, 'ORDERID')
      console.log(workOrders)
      this.workOrders = workOrders
      // this.appRef.tick()
    }) 
  }

  //copied from older offlin-data.ts
  getOperationPhotos(operation, workOrder, ) {   
    let maintenancePhotos = workOrder.maintenancePhotos           
    let photoPromise
    let photosPromises = []    
    // create photo link, check if photo exists, if not then do download
    const maint = maintenancePhotos.filter(photo => photo.maintPlanId == workOrder.MAINTPLAN) || []  
    operation.maintenancePhotos = !! maint.length ? maint[0].photos : []
    operation.maintenancePhotos = operation.maintenancePhotos.filter(photo => photo.operationId == operation.ACTIVITY)
    operation.photoLinks = []
    if(!operation.photos) operation.photos = []
    operation.photos = workOrder.photos.filter(photo => photo.operationId == operation.ACTIVITY)
    operation.photos = operation.photos.concat(operation.maintenancePhotos)     
    operation.photos.map(photo => {
      if(this.getNetworkStatus()) {
        photoPromise = this.file.checkFile(this.file.dataDirectory, photo.name)
          .then(success => operation.photoLinks.push(this.normalizeURL(this.file.dataDirectory) + photo.name))
          .catch(err => {
            this.getDownloadLink(photo.name).subscribe(response => {
              operation.photoLinks.push(response.json().body) //all photos
              this.downloadFile(response.json().body, photo.name)
            })   
          })
      } else {
        photoPromise = Promise.resolve(operation.photoLinks.push(this.normalizeURL(this.file.dataDirectory) + photo.name))              
      }
      photosPromises.push(photoPromise)
    })
    Promise.all(photosPromises).then(() => {
      console.log('all operation photos are here')
    })    
  }


  getOnlineNotifications(orderId) {
    let basicOptions:RequestOptionsArgs = {
      headers: this.headers,
    }
    return this.http.get(`${this.baseUrl}/notifications?orderId=${orderId}`, basicOptions)   
  }

  updateWorkOrder(wo) {
    console.log('update Wo' ,wo)
    wo.isChanged = true
    const woDocument = this.afs.doc<any>(`workOrders/${wo.id}`).ref;
    woDocument.update(wo)  
  }



}
