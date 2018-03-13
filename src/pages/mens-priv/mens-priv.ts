import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app'; 
import { ShareService } from '../../services/share/share';
import { share } from 'rxjs/operator/share';
import { isEmpty } from '@firebase/util';

/**
 * Generated class for the MensPrivPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mens-priv',
  templateUrl: 'mens-priv.html',
})
export class MensPrivPage {
  mensajes: any=[];
  likes: any=[];
  mglk:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private shareService: ShareService, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensPrivPage');
  }
  cargar(){
    this.mensajes=[];
      let msgs: any=[];
      var n=this.shareService.getName();
      var l=this.shareService.getLast();
      var autN;
      var autL;
      let lks:any=[];
    let mk:any=[];

  
      var usrRef=firebase.database().ref('msgs/priv/');
      usrRef.orderByChild("autN").on("child_added", function(data) {
          autN=data.val().autN;
          autL=data.val().autL;
          if (autN==n && autL==l){
            msgs.push(autN+' '+autL+' :'+data.val().msg);
            lks.push(data.val().likes);
        mk.push(data.val().likes+' :'+data.val().autN+' '+data.val().autL+' :'+data.val().msg);
          }
     });
     this.mensajes=msgs;
     this.likes=lks;
     this.mglk=mk;
     if (isEmpty(this.mensajes))
     {
      let alert = this.alertCtrl.create({
        title: 'Informacion',
        subTitle: 'No hay mensajes privados',
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

    var usrRef=firebase.database().ref('msgs/priv/');
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
