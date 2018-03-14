import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { HomePage} from '../home/home'

/**
 * Generated class for the MsgFrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-msg-fr',
  templateUrl: 'msg-fr.html',
})
export class MsgFrPage {
msg;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgFrPage');
  }

  publicar()
  {
      var msgRef=firebase.database().ref('/msgs/friends');

      msgRef.push({
        mssg:this.msg,
        user:'yo',
        likes:0,
        dislikes:0
      })

      let alert = this.alertCtrl.create({
        title: 'Exito!',
        subTitle: 'Su mensaje privado ha sido publicado',
        buttons: ['OK']
      });

      alert.present();

      this.navCtrl.push(HomePage);
  }

}
