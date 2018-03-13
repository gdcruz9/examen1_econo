import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app'; 
import { HomePage } from '../home/home';
import { isTrueProperty } from 'ionic-angular/util/util';
import { ShareService } from '../../services/share/share';

/**
 * Generated class for the InscribirsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-inscribirse',
  templateUrl: 'inscribirse.html',
})
export class InscribirsePage {

  usuariosRef:any;
  nombre;
  apellido;
  email;
  passwd;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public afDatabase: AngularFireDatabase,private alertCtrl: AlertController,
    public shareService:ShareService) {
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscribirsePage');
  }

  inscribir()
  {
      var inscRef=firebase.database().ref("/usuarios");
      var err =0;
      var shs=this.shareService;
      var al=this.alertCtrl;
      var em=this.email;
      var pw=this.passwd;

      firebase.auth().createUserWithEmailAndPassword(em, pw).catch(function(error){
          err=1;
    });

    if (err==0){
    inscRef.push({
      name:this.nombre,
      last:this.apellido,
      em:this.email,
      pswd:this.passwd
    });

    let alert = al.create({
      title: 'Exito!',
      subTitle: 'Ha sido inscrito exitosamente!',
      buttons: ['OK']
    });
    alert.present();

    shs.setName(this.nombre);
    shs.setLast(this.apellido);
    this.navCtrl.push(HomePage); 
    }
    else{
    let alertErr = al.create({
      title: 'Error!',
      subTitle: 'Error en la inscripcion',
      buttons: ['OK']
    });
    alertErr.present();}
  }

}
