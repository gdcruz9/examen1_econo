import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { HomePage} from '../home/home';
import { ShareService } from '../../services/share/share';

/**
 * Generated class for the MsgPrivPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-msg-priv',
  templateUrl: 'msg-priv.html',
})
export class MsgPrivPage {
msg;
nombre;
apellido;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl:AlertController, shareService: ShareService) {
    this.nombre=shareService.getName();
    this.apellido=shareService.getLast();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgPrivPage');
  }
  publicar()
  {
      var msgRef=firebase.database().ref('/msgs/priv');

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
