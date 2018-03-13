import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgPubPage } from './msg-pub';

@NgModule({
  declarations: [
    MsgPubPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgPubPage),
  ],
})
export class MsgPubPageModule {}
