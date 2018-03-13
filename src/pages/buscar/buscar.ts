import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app'; 
import {HomePage} from '../home/home';
import { ShareService } from '../../services/share/share';
import { empty } from 'rxjs/Observer';
import { isEmpty } from '@firebase/util';

/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {
nombre;

personas: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public shareService: ShareService, public alertCtrl:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }
 
  buscar()
  {
    this.personas=[];
    let pers: any=[];
    var n=this.nombre;
    var usrRef=firebase.database().ref('usuarios/');
    usrRef.orderByChild("name").on("child_added", function(data) {
      if (data.val().last==n || data.val().name==n){
        console.log(data.val().name);
        console.log(data.val().last);
        pers.push(data.val().name+' '+data.val().last);
      }
   });
   this.personas=pers;
   if (isEmpty(this.personas))
    {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'La busqueda no arroja resultados',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  show(ind:number)
  {
    var n=this.shareService.getName();
    var l=this.shareService.getLast();
    var a=this.personas[ind];

    var usrRef=firebase.database().ref('amigos/'+n+'-'+l);
    usrRef.push({'amigo':a});
    let alert = this.alertCtrl.create({
      title: 'Exito!',
      subTitle: 'Ahora sigues a '+a,
      buttons: ['OK']
    });
    alert.present();
  }
}
