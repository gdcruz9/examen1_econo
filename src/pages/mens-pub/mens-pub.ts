import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app'; 
import { isEmpty } from '@firebase/util';
import { ShareService } from '../../services/share/share';

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
  public alertCtrl:AlertController, public shareService: ShareService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensPubPage');
  }

cargar(){
  this.mensajes=[];
  this.likes=[];
  this.dislikes=[];
  this.mglk=[];
  var msgRef;
  var lksRef;
  var shs=this.shareService;
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
    var usrRef=firebase.database().ref('msgs/pub/');
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
  var bl=false;
  var bl2=false;
  var shs=this.shareService;
  let disliker=shs.getName()+'-'+shs.getLast();

  var n:number=parseInt(this.dislikes[ind]);
  var l:number=parseInt(this.likes[ind]);

    n+=1;
    l-=1;

    var usrRef=firebase.database().ref('msgs/pub/');

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
