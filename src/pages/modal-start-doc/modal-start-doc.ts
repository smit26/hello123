import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DataProvider } from '../../providers/data/data';
import { DocumentViewer } from '@ionic-native/document-viewer';

@IonicPage()
@Component({
  selector: 'page-modal-start-doc',
  templateUrl: 'modal-start-doc.html',
})
export class ModalStartDocPage {

  public order: any = {}
  public passCallback: any; 
  urldata:any;
  pdfUrl: String ='';
  public ackData: any = {
    isAck: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,  public document: DocumentViewer,
    public modalCtrl: ModalController, public viewCtrl: ViewController,public alertCtrl: AlertController, public data: DataProvider) {

      //this.document.viewDocument('assets/doc/sample.pdf', 'application/pdf', this.options2);
     

      
      //this.data = offlineData.getDocumentUrl(this.order.EQUIDESC, true);
      //this.pdfUrl = this.data.pdfUrl;
  }   

  ngOnInit() {
    console.log("Got the Order from WO");
    this.passCallback = this.navParams.get('callback') 
    this.order = this.navParams.get('order')
    console.log("before PDF ", this.order)
    this.pdfUrl = this.order.documentUrl;
    console.log(" URL ", this.pdfUrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalStartDocPage');
  }
  
  Accepted(){
    console.log("I accept is CLICKED");
    this.ackData.isAck = true;
    this.showError('You acknowledge that you have read the document')
    // this.navCtrl.push(WorkOrderPage, {callback: this.passCallback(this.ackData), order: this.order})
    
    
  }

  showError(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Acknowledged',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    this.viewCtrl.dismiss({callback: this.passCallback(this.ackData), order: this.order});

  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

 

}
