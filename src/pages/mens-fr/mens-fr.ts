import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShareService } from '../../services/share/share';
import * as firebase from 'firebase/app'; 
import { isEmpty } from '@firebase/util';

/**
 * Generated class for the MensFrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mens-fr',
  templateUrl: 'mens-fr.html',
})
export class MensFrPage {
  alertCtrl: any;
  mensajes: any=[];
  likes: any=[];
  mglk:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public shareService: ShareService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensFrPage');
  }

  cargar(){
    this.mensajes=[];
      let msgs: any=[];
      let mg: any=[];
      let auMsgs: any=[];
      let lkMsgs: any=[];
      let amigos:any=[];
      let ams=0;
      let nmsgs=0;
      var n=this.shareService.getName();
      var l=this.shareService.getLast();
      var autN;
      var autL;
      let lks:any=[];
      let mk:any=[];
  
      var amiRef=firebase.database().ref('amigos/'+n+'-'+l);
      amiRef.orderByChild("amigo").on("child_added", function(data) {
          amigos.push(data.val().amigo);
          ams+=1;
      });

      var usrRef=firebase.database().ref('msgs/friends/');
      usrRef.orderByChild("likes").on("child_added", function(data) {
        auMsgs.push(data.val().autN+' '+data.val().autL);
        mg.push(data.val().msg);
        nmsgs+=1;
        lkMsgs.push(data.val().likes)
     });

     for (var i=0;i<nmsgs;i++)
     {
          for (var v=0;v<ams;v++)
          {
              if (auMsgs[i]==amigos[v])
              {
                msgs.push(auMsgs[i]+' : '+mg[i]);
                lks.push(lkMsgs[i]);
                mk.push(lkMsgs[i]+' :'+auMsgs[i]+' :'+mg[i]);
              }
          }
     }

     this.mensajes=msgs;
     this.likes=lks;
     this.mglk=mk;

     if (isEmpty(this.mensajes))
     {
      let alert = this.alertCtrl.create({
        title: 'Informacion',
        subTitle: 'No hay mensajes de amigos',
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
    n+=1;
    console.log(mg[ind]);

    var usrRef=firebase.database().ref('msgs/friends/');

    usrRef.orderByChild("likes").on("child_added", function(data) {
        m=data.val().autN+' '+data.val().autL+' : '+data.val().msg; 

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
