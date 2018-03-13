import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InscribirsePage } from '../pages/inscribirse/inscribirse';
import { PublicarPage} from '../pages/publicar/publicar';
import { BuscarPage} from '../pages/buscar/buscar';
import { MsgPrivPage} from '../pages/msg-priv/msg-priv';
import { MsgFriendsPage} from '../pages/msg-friends/msg-friends';
import { MsgPubPage} from '../pages/msg-pub/msg-pub';
import { VerMsgsPage} from '../pages/ver-msgs/ver-msgs';
import { MensFrPage } from '../pages/mens-fr/mens-fr';
import { MensPrivPage } from '../pages/mens-priv/mens-priv';
import { MensPubPage } from '../pages/mens-pub/mens-pub';
import { ShareService } from '../services/share/share';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBnEXyiYfy37NshEl8ABGFZrtbHtQwfqC4",
  authDomain: "examen1-5f939.firebaseapp.com",
  databaseURL: "https://examen1-5f939.firebaseio.com",
  projectId: "examen1-5f939",
  storageBucket: "examen1-5f939.appspot.com",
  messagingSenderId: "775573550557"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    InscribirsePage,
    PublicarPage,
    BuscarPage,
    MsgPrivPage,
    MsgFriendsPage, 
    MsgPubPage,
    VerMsgsPage,
    MensFrPage,
    MensPrivPage,
    MensPubPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    LoginPage,
    HomePage,
    InscribirsePage,
    PublicarPage,
    BuscarPage,
    MsgPrivPage,
    MsgFriendsPage,
    MsgPubPage,
    VerMsgsPage,
    MensFrPage,
    MensPrivPage,
    MensPubPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShareService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
