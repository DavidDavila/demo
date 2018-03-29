import { IntroActions } from '../actions/intro.action';
import { Reducer, AnyAction } from 'redux';

export const IntroReducer: Reducer<any> = (lastState: any = {backgroundPosition : 1}, action: AnyAction): any  => {
  switch(action.type) {
    case IntroActions.SET_BACKGROUND_POSITION: 
    	return {backgroundPosition:action.payload};
  }
  return lastState;
}