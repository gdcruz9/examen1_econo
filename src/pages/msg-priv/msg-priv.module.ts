import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgPrivPage } from './msg-priv';

@NgModule({
  declarations: [
    MsgPrivPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgPrivPage),
  ],
})
export class MsgPrivPageModule {}
