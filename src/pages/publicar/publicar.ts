import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MsgFriendsPage } from '../msg-friends/msg-friends';
import { MsgPrivPage } from '../msg-priv/msg-priv';
import { MsgPubPage } from '../msg-pub/msg-pub';

/**
 * Generated class for the PublicarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicarPage');
  }
 
  MsgPriv()
  {
    this.navCtrl.push(MsgPrivPage);
  }

  MsgFr()
  {
    this.navCtrl.push(MsgFriendsPage);
  }

  MsgPub()
  {
    this.navCtrl.push(MsgPubPage);
  }

}
