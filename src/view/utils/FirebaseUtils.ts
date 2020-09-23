import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

enum FIREBASE_DB_CONFIG {
  API_KEY = 'AIzaSyDILNasiVhaX5X4VEJPmhlFCawZZg3juIc',
  AUTH_DOMAIN = 'myaml-fc053.firebaseapp.com',
  PROJECT_ID = 'myaml-fc053',
}

export enum firebaseError {
  NETWORK_CONNECTION_FAILED = 'auth/network-request-failed',
  USER_NOT_FOUND = 'auth/user-not-found',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
}

export async function autoSignIn(
  credential: firebase.auth.AuthCredential,
): Promise<firebase.auth.UserCredential> {
  return firebase.auth().signInWithCredential(credential);
}

export function initializeFirebaseApp(): void {
  firebase.initializeApp({
    apiKey: FIREBASE_DB_CONFIG.API_KEY,
    authDomain: FIREBASE_DB_CONFIG.AUTH_DOMAIN,
    projectId: FIREBASE_DB_CONFIG.PROJECT_ID,
  });
}

export async function signIn(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  return new Promise<firebase.auth.UserCredential>(
    (
      resolve: (value?: firebase.auth.UserCredential) => void,
      reject: (reason: any) => void,
    ) => {
      const auth: firebase.auth.Auth = firebase.auth();
      return auth
        .signInWithEmailAndPassword(email, password)
        .then(async (value: firebase.auth.UserCredential) => {
          const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
            email,
            password,
          );
          resolve(value);
        })
        .catch(reject);
    },
  );
}

export async function signOut(): Promise<void> {
  return firebase.auth().signOut();
}

export async function signUp(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  return new Promise<firebase.auth.UserCredential>(
    (
      resolve: (
        value?:
          | firebase.auth.UserCredential
          | PromiseLike<firebase.auth.UserCredential>,
      ) => void,
      reject: (reason: any) => void,
    ) => {
      const auth: firebase.auth.Auth = firebase.auth();
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then((value: firebase.auth.UserCredential) => {
          resolve(value);
        })
        .catch(reject);
    },
  );
}

export async function getUserDataByEmail(email: string): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const collection: firebase.firestore.CollectionReference = await firebase
        .firestore()
        .collection('profiles');
      const queryResult: firebase.firestore.Query<
        firebase.firestore.DocumentData
      > = collection.where('email', '==', email);
      const documentData: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData
      > = await queryResult.get();
      const dataArray: firebase.firestore.DocumentData[] = [];
      documentData.forEach(doc => {
        dataArray.push(doc.data());
      });
      dataArray.length > 1
        ? reject({
            message: 'multiple accounts',
          })
        : resolve(dataArray.getFirst());
    } catch (error) {
      reject(error);
    }
  });
}

export async function getFSDataAsync(docId: string): Promise<any> {
  try {
    const dataObj: firebase.firestore.DocumentSnapshot = await firebase
      .firestore()
      .doc(docId)
      .get();
    return dataObj.data();
  } catch (err) {
    console.error(err);
  }
}

export async function removeFsDataAsync(docId: string): Promise<void> {
  return firebase
    .firestore()
    .doc(docId)
    .delete();
}

export async function setFSDataAsync(docId: string, data: any): Promise<void> {
  try {
    await firebase
      .firestore()
      .doc(docId)
      .set(serialise(data));
  } catch (err) {
    console.error(err);
  }
}

export function serialise(object: any): any {
  return JSON.parse(JSON.stringify(object));
}
