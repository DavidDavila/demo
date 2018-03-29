import { VideoActions } from '../actions/video.action';
import { Reducer, AnyAction } from 'redux';

export const VideoReducer: Reducer<any> = (lastState: any = {documentType : undefined}, action: AnyAction): any  => {
  switch(action.type) {
    case VideoActions.SET_DOCUMENT: 
    	return {documentType: action.payload};
    case VideoActions.SET_VIDEO: 
    	return {video : action.payload, documentType: lastState.documentType }
  }
  return lastState;
}