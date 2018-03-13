import { Component } from '@angular/core';
import { NavController,NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app'; 
import { PublicarPage} from '../publicar/publicar';
import { BuscarPage} from '../buscar/buscar';
import { VerMsgsPage} from '../ver-msgs/ver-msgs';
import { ShareService } from '../../services/share/share';
import { LoginPage } from '../login/login';
import { isEmpty } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
}) 
export class HomePage {
usuario;
amigs: any=[];
  constructor(public navCtrl: NavController,public navParams: NavParams,
    public shareService: ShareService, public alertCtrl:AlertController) {
    this.usuario=shareService.getName()+' '+shareService.getLast();

  } 

  buscar()
  {
    this.navCtrl.push(BuscarPage);
  }

  publicar()
  {
    this.navCtrl.push(PublicarPage);
  }

  verMgs()  
  {
    this.navCtrl.push(VerMsgsPage);
  }

  salir()
  {
    var al=this.alertCtrl;
    var nav=this.navCtrl;

    firebase.auth().signOut().then(function() {
     let alert = al.create({
      title: 'Exito!',
      subTitle: 'Ha salido exitosamente!',
      buttons: ['OK']
    });
    alert.present();
    nav.push(LoginPage);
   }, function(error) {
    let alert = al.create({
      title: 'Error!',
      subTitle: 'Hay problemas para salir',
      buttons: ['OK']
    });
    alert.present();
   });
  }
 
  amigos()
  {
    let ams: any=[];
    var shs=this.shareService;
    var amiRef=firebase.database().ref('amigos/'+shs.getName()+'-'+shs.getLast());
    amiRef.orderByChild("amigo").on("child_added", function(data) {
        ams.push(data.val().amigo);
    });

   this.amigs=ams;
   if (isEmpty(this.amigs))
    {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'No tiene amigos',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
