import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkOrdersPage } from './work-orders';

@NgModule({
  declarations: [
    WorkOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkOrdersPage),
  ],
})
export class WorkOrdersPageModule {}
