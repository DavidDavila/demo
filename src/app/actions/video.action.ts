import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable()
export class VideoActions {
  static SET_DOCUMENT = 'SET_DOCUMENT';
  static SET_VIDEO = 'SET_VIDEO';

  setVideo(video: number): AnyAction {
    return { type: VideoActions.SET_VIDEO, payload: video };
  }

  setDocumentType(doc: number): AnyAction {
    return { type: VideoActions.SET_DOCUMENT, payload: doc };
  }
}