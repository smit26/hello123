import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkOrderPage } from './work-order';

@NgModule({
  declarations: [
    WorkOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkOrderPage),
  ],
})
export class WorkOrderPageModule {}
