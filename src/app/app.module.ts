import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { rootReducer, IAppState, INITIAL_STATE, } from './store/';
import { NgReduxRouterModule, NgReduxRouter, UPDATE_LOCATION } from '@angular-redux/router'

import { AppComponent } from './app.component';
import { IntroComponent } from './home/intro/intro.component';
import { HomeComponent } from './home/home.component';
import { ParticlesModule } from 'angular-particle';
import { MobileComponent } from './home/intro/mobile/mobile.component';

import {IntroActions} from './actions/intro.action';
import {VideoActions} from './actions/video.action';

import { FeaturesComponent } from './home/features/features.component';
import { AboutComponent } from './home/about/about.component';

import { SessionService } from './shared/services/session.service';
import { HeadersService } from './shared/services/headers.service';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

import { ResultComponent } from './home/intro/mobile/result/result.component';
import { BiometricsComponent } from './shared/components/biometrics/biometrics.component';
import { VideoIdComponent } from './home/video-id/video-id.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    MobileComponent,
    FeaturesComponent,
    AboutComponent,
    ResultComponent,
    BiometricsComponent,
    VideoIdComponent
  ],
  imports: [
    FormsModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpModule,
    MatSelectModule,
  	ParticlesModule,
    BrowserAnimationsModule,    
    NgReduxRouterModule.forRoot(),
    NgReduxModule,
    AppRoutingModule
  ],
  providers: [
    HeadersService,
    VideoActions,
    IntroActions,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
      ngRedux: NgRedux<IAppState>,
      ngReduxRouter: NgReduxRouter,
      devTools: DevToolsExtension){
    
    const storeEnhancers = devTools.isEnabled() ?
      [ devTools.enhancer() ] :
      []; 

    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      storeEnhancers);

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
  } }
