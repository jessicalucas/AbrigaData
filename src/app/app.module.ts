import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { AbrigadataProvider } from '../providers/abrigadata/abrigadata';
import { PessoaProvider } from '../providers/pessoa/pessoa';
import { GrupoFamiliarProvider } from '../providers/grupo-familiar/grupo-familiar';
import { AtendenteProvider } from '../providers/atendente/atendente';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	  SQLite,
    DatabaseProvider,
    AbrigadataProvider,
    PessoaProvider,
    GrupoFamiliarProvider,
    AtendenteProvider
  ]
})
export class AppModule {}
