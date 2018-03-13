import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app'; 
import { isEmpty } from '@firebase/util';

/**
 * Generated class for the MensPubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mens-pub',
  templateUrl: 'mens-pub.html',
})
export class MensPubPage {
  mensajes: any=[];
  likes: any=[];
  mglk:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensPubPage');
  }

cargar(){
  this.mensajes=[];
    let msgs: any=[];
    let lks:any=[];
    let mk:any=[];

    var usrRef=firebase.database().ref('msgs/pub/');
    usrRef.orderByChild("autN").on("child_added", function(data) {
        msgs.push(data.val().autN+' '+data.val().autL+' :'+data.val().msg);
        lks.push(data.val().likes);
        mk.push(data.val().likes+' :'+data.val().autN+' '+data.val().autL+' :'+data.val().msg);
   });
   this.mensajes=msgs;
   this.likes=lks;
   this.mglk=mk;
   if (isEmpty(this.mensajes))
   {
    let alert = this.alertCtrl.create({
      title: 'Informacion',
      subTitle: 'No hay mensajes publicos',
      buttons: ['OK']
    });
    alert.present();
   }
}

like(ind:number)
{
  var mg=this.mensajes;
  var msgRef;
  var m;
    var n:number=parseInt(this.likes[ind]);
console.log(typeof(this.likes[ind]));
    n+=1;

    var usrRef=firebase.database().ref('msgs/pub/');
    usrRef.orderByChild("autN").on("child_added", function(data) {
        console.log(data.val().msg); 
        m=data.val().autN+' '+data.val().autL+' :'+data.val().msg; 
      if (m==mg[ind]){
          msgRef=data.ref;
          console.log(msgRef);
          msgRef.update({'likes':n});
      }
   });
   this.likes[ind]=n;
this.cargar();
}
}
