import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { InscribirsePage } from '../inscribirse/inscribirse';
import { ShareService } from '../../services/share/share';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
 
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',  
}) 
export class LoginPage {

  currentUser:any;
  email;
  password;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public shareService: ShareService) 
    {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 
  entrar() 
  {    
    var th=this;
    var nm:any;
    var ls:any;
    var ema=this.email;
    var shs=this.shareService;
    var al=this.alertCtrl;

    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(function(result){
      console.log("exito");

      var usrRef=firebase.database().ref('usuarios/');
      usrRef.orderByChild("name").on("child_added", function(data) {
        if (data.val().em==ema) {
          nm=data.val().name;
          ls=data.val().last;

        shs.setName(nm);
        shs.setLast(ls);
        th.navCtrl.push(HomePage);  
        }
     });
    })
    .catch(function(error) {
      let alert = al.create({
        title: 'Error!',
        subTitle: 'Error de autenticacion!',
        buttons: ['OK']
      });
      alert.present();
   });

   /*this.navCtrl.push(HomePage);  */
  }
 
  login() {
    var al=this.alertCtrl;
    var shs=this.shareService;
    var nav=this.navCtrl;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
       var token = result.credential.accessToken;
       var user = result.user;
      shs.setName(result.user.displayName)
      shs.setLast('');
      nav.push(HomePage);
    }).catch(function(error) {
      let alert = al.create({
        title: 'Exito!',
        subTitle: 'Ha sido inscrito exitosamente!',
        buttons: ['OK']
      });
      alert.present();
    });
  } 

inscribir()
{
  this.navCtrl.push(InscribirsePage);

}  

}

