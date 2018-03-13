import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensFrPage } from '../mens-fr/mens-fr';
import { MensPrivPage } from '../mens-priv/mens-priv';
import { MensPubPage } from '../mens-pub/mens-pub';

/**
 * Generated class for the VerMsgsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-msgs',
  templateUrl: 'ver-msgs.html',
})
export class VerMsgsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerMsgsPage');
  }

  MsgPriv()
  {
    this.navCtrl.push(MensPrivPage);
  }

  MsgFr()
  {
    this.navCtrl.push(MensFrPage);
  }

  MsgPub()
  {
    this.navCtrl.push(MensPubPage);
  }
} 
 