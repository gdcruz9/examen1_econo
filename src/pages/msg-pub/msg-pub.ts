import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { HomePage} from '../home/home';
import { ShareService } from '../../services/share/share';

/**
 * Generated class for the MsgPubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-msg-pub',
  templateUrl: 'msg-pub.html',
})
export class MsgPubPage {
msg;
nombre;
apellido;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public alertCtrl:AlertController, shareService: ShareService) {
      this.nombre=shareService.getName();
      this.apellido=shareService.getLast();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgPubPage');
  }

  publicar()
  {
      var msgRef=firebase.database().ref('/msgs/pub');

     msgRef.push({
        msg:this.msg,
        autN: this.nombre,
        autL: this.apellido,
        likes:0
      });

      let alert = this.alertCtrl.create({
        title: 'Exito!',
        subTitle: 'Su mensaje privado ha sido publicado',
        buttons: ['OK']
      });

      alert.present();

      this.navCtrl.push(HomePage);
  }
}
