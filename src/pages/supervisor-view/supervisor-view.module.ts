import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupervisorViewPage } from './supervisor-view';

@NgModule({
  declarations: [
    SupervisorViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SupervisorViewPage),
  ],
})
export class SupervisorViewPageModule {}
