import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationCategoryPage } from './operation-category';

@NgModule({
  declarations: [
    OperationCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OperationCategoryPage),
  ],
})
export class OperationCategoryPageModule {}
