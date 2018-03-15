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
  dislikes: any=[];
  mglk:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private shareService: ShareService, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensPrivPage');
  }
  cargar(){
    this.mensajes=[];
    this.likes=[];
    this.dislikes=[];
    this.mglk=[];
      let msgs: any=[];
      var n=this.shareService.getName();
      var l=this.shareService.getLast();
      var autN;
      var autL;
      let nmsgsp=0;
      let lks:any=[];
      let dlks:any=[];
    let mk:any=[];

  
      var usrRef=firebase.database().ref('msgs/priv/');
      usrRef.orderByChild("likes").on("child_added", function(data) {
          autN=data.val().autN;
          autL=data.val().autL;
          if (autN==n && autL==l){
            msgs.push(autN+' '+autL+' :'+data.val().msg);
            lks.push(data.val().likes);
            dlks.push(data.val().dislikes);
            mk.push(data.val().likes+' :'+data.val().autN+' '+data.val().autL+' :'
            +data.val().msg+'       '+data.val().dislikes);
            nmsgsp+=1;
          }
     });

     for (let i=nmsgsp-1;i>=0;i--){
      this.mensajes.push(msgs[i]);
      this.likes.push(lks[i]);
      this.mglk.push(mk[i]);
      this.dislikes.push(dlks[i]);
    }

    /* this.mensajes=msgs;
     this.likes=lks;
     this.mglk=mk;*/
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
  var lksRef;
  var dlksRef;
  var bl=false;
  var bl2=false;
  var shs=this.shareService;
    var n:number=parseInt(this.likes[ind]);
    var d:number=parseInt(this.dislikes[ind]);

    n+=1;
    d-=1;
    
    let liker=shs.getName()+'-'+shs.getLast();
    var usrRef=firebase.database().ref('msgs/priv/');
    usrRef.orderByChild("autN").on("child_added", function(data) {
        m=data.val().autN+' '+data.val().autL+' :'+data.val().msg; 
      if (m==mg[ind]){
        msgRef=data.ref;
        
        lksRef=firebase.database().ref(msgRef.path.pieces_[0]+'/'+msgRef.path.pieces_[1]
                      +'/'+msgRef.path.pieces_[2]+'/usrlikes');

        lksRef.orderByChild('usrlike').on("child_added",function(data){
          
          if (data.val().usrlike==liker)
            bl=true;
        })

        if (bl==false){
        dlksRef=firebase.database().ref(msgRef.path.pieces_[0]+'/'+msgRef.path.pieces_[1]
                      +'/'+msgRef.path.pieces_[2]+'/usrdislikes');

        dlksRef.orderByChild('usrdislike').on("child_added",function(data){

          if (data.val().usrdislike==liker)
              bl2=true;
          })

        if (bl2==true)
        {
          msgRef.update({'dislikes':d});
          dlksRef.remove();
        }

        msgRef.update({'likes':n});
        lksRef.push({'usrlike': liker}); 
      }
    }
   });

   this.likes[ind]=n;
   this.dislikes[ind]=d;
this.cargar();
}

dislike(ind:number)
{
  var mg=this.mensajes;
  var msgRef;
  var m;
  var dlksRef;
  var lksRef;
  var shs=this.shareService;
  let disliker=shs.getName()+'-'+shs.getLast();
  var bl=false;
  var bl2=false;

  var n:number=parseInt(this.dislikes[ind]);
  var l:number=parseInt(this.likes[ind]);

    n+=1;
    l-=1;

    var usrRef=firebase.database().ref('msgs/priv/');

    usrRef.orderByChild("autN").on("child_added", function(data) {
        m=data.val().autN+' '+data.val().autL+' :'+data.val().msg; 

      if (m==mg[ind]){
        msgRef=data.ref;
        
        dlksRef=firebase.database().ref(msgRef.path.pieces_[0]+'/'+msgRef.path.pieces_[1]
                      +'/'+msgRef.path.pieces_[2]+'/usrdislikes');

        dlksRef.orderByChild('usrdislike').on("child_added",function(data){
          console.log('dislk: '+data.val().usrdislike)
          if (data.val().usrdislike==disliker)
            bl=true;
        })

        if (bl==false){
        lksRef=firebase.database().ref(msgRef.path.pieces_[0]+'/'+msgRef.path.pieces_[1]
                      +'/'+msgRef.path.pieces_[2]+'/usrlikes');

        lksRef.orderByChild('usrlike').on("child_added",function(data){

          if (data.val().usrlike==disliker)
              bl2=true;
          })

        if (bl2==true)
        {
          msgRef.update({'likes':l});
          lksRef.remove();
          /*lksRef.update({'liker':null});*/
        }

        msgRef.update({'dislikes':n});
        dlksRef.push({'usrdislike': disliker}); 
      }
    }
   });
   this.dislikes[ind]=n;
   this.likes[ind]=l;
this.cargar();
  }
}
