import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import * as firebase from 'firebase/app'; 
import {HomePage} from '../home/home'
import { ShareService } from '../../services/share/share';
/**
 * Generated class for the MsgFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-msg-friends',
  templateUrl: 'msg-friends.html', 
})
export class MsgFriendsPage {
  msg;
  nombre;
  apellido;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,shareService: ShareService) {
      this.nombre=shareService.getName();
      this.apellido=shareService.getLast();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgFriendsPage');
  }
publicar()
{
  var msgRef=firebase.database().ref("/msgs/friends");
  var usuario="yo";

      msgRef.push({
        msg:this.msg,
        autN: this.nombre,
        autL: this.apellido,
        likes:0
      });
 
      let alert = this.alertCtrl.create({
        title: 'Exito!',
        subTitle: 'El mensaje ha sido publicado exitosamente!',
        buttons: ['OK']
      });
      alert.present();
    
      this.navCtrl.push(HomePage); 
}
}
