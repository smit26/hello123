import { OperationPage } from './../pages/operation/operation';
import { OperationDetailsPage } from './../pages/operation-details/operation-details';
import { OperationCategoryPage } from './../pages/operation-category/operation-category';
import { WorkOrderPage } from './../pages/work-order/work-order';
import { ModalStartDocPage } from './../pages/modal-start-doc/modal-start-doc';
import { NotificationHistoryPage } from './../pages/notification-history/notification-history'
import { ModalCloseWoPage } from './../pages/modal-close-wo/modal-close-wo'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Items } from '../mocks/providers/items';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { VectorVue } from './app.component';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { DocumentViewer } from '@ionic-native/document-viewer';
import 'firebase/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DataProvider } from '../providers/data/data';
import { PdfViewerComponent } from 'ng2-pdf-viewer';


export const firebaseConfig  = {
  apiKey: "AIzaSyBMaZFLQ4hQmaJOP_LUMW0bvkcJx9UA9Mk",
  authDomain: "vector-vue-work-manager.firebaseapp.com",
  databaseURL: "https://vector-vue-work-manager.firebaseio.com",
  projectId: "vector-vue-work-manager",
  storageBucket: "",
  messagingSenderId: "272688894114"
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    VectorVue,
    WorkOrderPage,
    OperationCategoryPage,
    OperationDetailsPage,
    OperationPage,
    ModalStartDocPage,
    PdfViewerComponent,
    NotificationHistoryPage,
     ModalStartDocPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(VectorVue),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    VectorVue,
    WorkOrderPage,
    OperationCategoryPage,
    OperationDetailsPage,
    OperationPage,
    ModalStartDocPage,
    NotificationHistoryPage,
     ModalStartDocPage
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    Network,
    File,
    FileTransfer,
    Geolocation,
    DocumentViewer
  ]
})
export class AppModule { }
