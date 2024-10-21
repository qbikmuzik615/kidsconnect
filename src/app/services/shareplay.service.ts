import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var GroupActivities: any;
declare var FaceTime: any;

@Injectable({
  providedIn: 'root'
})
export class SharePlayService {
  private gameUpdateSubject = new Subject<any>();
  private turnChangeSubject = new Subject<boolean>();

  constructor() {}

  startSharePlaySession(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (GroupActivities) {
        const activity = new GroupActivities.Activity();
        activity.start().then(() => {
          console.log('SharePlay session started');
          resolve();
        }).catch((error: any) => {
          console.error('Failed to start SharePlay session', error);
          reject(error);
        });
      } else {
        console.warn('GroupActivities not available');
        reject('GroupActivities not available');
      }
    });
  }

  configureGroupActivity(gameId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (GroupActivities) {
        const activity = new GroupActivities.Activity({
          type: gameId,
          title: `Let's play ${gameId}!`,
          preview: `Join me for a game of ${gameId}`
        });
        activity.activate().then(() => {
          console.log('Group activity configured');
          resolve();
        }).catch((error: any) => {
          console.error('Failed to configure group activity', error);
          reject(error);
        });
      } else {
        console.warn('GroupActivities not available');
        reject('GroupActivities not available');
      }
    });
  }

  joinGroupActivity(gameId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (GroupActivities) {
        GroupActivities.Activity.current.then((activity: any) => {
          if (activity && activity.type === gameId) {
            console.log('Joined group activity');
            resolve();
          } else {
            console.error('No matching group activity found');
            reject('No matching group activity found');
          }
        }).catch((error: any) => {
          console.error('Failed to join group activity', error);
          reject(error);
        });
      } else {
        console.warn('GroupActivities not available');
        reject('GroupActivities not available');
      }
    });
  }

  sendGameUpdate(type: string, data: any) {
    if (FaceTime && FaceTime.sendMessage) {
      FaceTime.sendMessage({ type, data });
    }
    this.gameUpdateSubject.next({ type, data });
  }

  onGameUpdate(type: string, callback: (data: any) => void) {
    if (FaceTime && FaceTime.onMessage) {
      FaceTime.onMessage((message: any) => {
        if (message.type === type) {
          callback(message.data);
        }
      });
    }
    this.gameUpdateSubject.subscribe((update) => {
      if (update.type === type) {
        callback(update.data);
      }
    });
  }

  changeTurn(isMyTurn: boolean) {
    this.turnChangeSubject.next(isMyTurn);
  }

  onTurnChange(callback: (isMyTurn: boolean) => void) {
    this.turnChangeSubject.subscribe(callback);
  }
}