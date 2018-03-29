import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import { IntroReducer } from './../reducers/intro.reducer';
import { VideoReducer } from './../reducers/video.reducer';

export interface IAppState {
  intro: any,
  video: any
}

export const INITIAL_STATE: IAppState = {
  intro: {
    backgroundPosition: 1
  },
  video: {
  	documentType: {}
  }
};


export const rootReducer = combineReducers<IAppState>({
  intro:  IntroReducer,
  video:  VideoReducer,
  router: routerReducer
});