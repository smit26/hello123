import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorDetailPage } from './supervisor-detail';

@NgModule({
  declarations: [
    SupervisorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorDetailPage),
  ],
})
export class SupervisorDetailPageModule {}
