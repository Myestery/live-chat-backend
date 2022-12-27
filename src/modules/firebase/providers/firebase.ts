import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class Firebase {
  constructor() {
    const serviceAccount = require('../../../../firebase-admin.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    //   admin.auth().verifyIdToken('token')
  }
  
  async verifyToken(token: string) {
    try {
      let user = await admin.auth().verifyIdToken(token);
      return user;
    } catch (error) {
      return false;
    }
  }

  async changePassword(uid, newPassword) {
    return admin.auth().updateUser(uid, {
      password: newPassword
    });
  }

  async getUser(uid) {
    return admin.auth().getUser(uid);
  }

  async getUserFromFireStore(uid) {
    return (await admin.firestore().collection('users').doc(uid).get()).data();
  }
}
