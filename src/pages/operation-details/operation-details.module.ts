import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationDetailsPage } from './operation-details';

@NgModule({
  declarations: [
    OperationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OperationDetailsPage),
  ],
})
export class OperationDetailsPageModule {}
