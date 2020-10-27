import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { PlayerVO } from '../../model/vo/PlayerVO';

enum FIREBASE_DB_CONFIG {
  API_KEY = 'AIzaSyD0EbRxP5A_dsrh5slf__r6ZYRzIWeFEos',
  AUTH_DOMAIN = 'my-amazing-life-rs.firebaseapp.com',
  PROJECT_ID = 'my-amazing-life-rs',
}

export function initializeFirebaseApp(): void {
  firebase.initializeApp({
    apiKey: FIREBASE_DB_CONFIG.API_KEY,
    authDomain: FIREBASE_DB_CONFIG.AUTH_DOMAIN,
    projectId: FIREBASE_DB_CONFIG.PROJECT_ID,
  });
}

export async function getUserDataAsync(email: string): Promise<PlayerVO> {
  try {
    const dataObj: firebase.firestore.DocumentSnapshot = await firebase
      .firestore()
      .doc(`profiles/${email}`)
      .get();
    return (dataObj.data() as PlayerVO) || null;
  } catch (err) {
    console.error(err);
  }
}

export async function setUserDataAsync(data: PlayerVO): Promise<void> {
  try {
    await firebase
      .firestore()
      .doc(`profiles/${data.user.email}`)
      .set(serialize(data));
  } catch (err) {
    console.error(err);
  }
}

export function serialize(object: any): any {
  return JSON.parse(JSON.stringify(object));
}
