import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable()
export class IntroActions {
  static SET_BACKGROUND_POSITION = 'SET_BACKGROUND_POSITION';

  setBackgroundPosition(error: number): AnyAction {
    return { type: IntroActions.SET_BACKGROUND_POSITION, payload: error };
  }
}