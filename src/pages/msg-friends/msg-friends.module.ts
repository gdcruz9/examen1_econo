import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgFriendsPage } from './msg-friends';

@NgModule({
  declarations: [
    MsgFriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgFriendsPage),
  ],
})
export class MsgFriendsPageModule {}
