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
  dislikes: any=[];
  mglk:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensPubPage');
  }

cargar(){
  this.mensajes=[];
  this.likes=[];
  this.dislikes=[];
  this.mglk=[];
  let nmsgsp=0;
    let msgs: any=[];
    let lks:any=[];
    let dlks:any=[];
    let mk:any=[];

    var usrRef=firebase.database().ref('msgs/pub/');
    usrRef.orderByChild("likes").on("child_added", function(data) {
        msgs.push(data.val().autN+' '+data.val().autL+' :'+data.val().msg);
        lks.push(data.val().likes);
        dlks.push(data.val().dislikes);
        mk.push(data.val().likes+' :'+data.val().autN+' '+data.val().autL+' :'
        +data.val().msg+'       '+data.val().dislikes);
        nmsgsp+=1;
   });

   for (let i=nmsgsp-1;i>=0;i--){
    this.mensajes.push(msgs[i]);
    this.likes.push(lks[i]);
    this.mglk.push(mk[i]);
    this.dislikes.push(dlks[i]);
  }

   /*this.mensajes=msgs;
   this.likes=lks;
   this.mglk=mk;*/
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

dislike(ind:number)
{
  var mg=this.mensajes;
  var msgRef;
  var m;
    var n:number=parseInt(this.dislikes[ind]);
    n-=1;
    console.log(mg[ind]);

    var usrRef=firebase.database().ref('msgs/pub/');

    usrRef.orderByChild("autN").on("child_added", function(data) {
        m=data.val().autN+' '+data.val().autL+' :'+data.val().msg; 

      if (m==mg[ind]){
          msgRef=data.ref;
          console.log(msgRef);
          if (n>=0)
            msgRef.update({'dislikes':n});
      }
   });
   this.dislikes[ind]=n;
this.cargar();
  }
}
