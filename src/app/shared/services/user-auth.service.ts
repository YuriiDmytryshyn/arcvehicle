import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Profile } from '../classes/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  localStorageUser: any;
  cheackSignIn: Subject<boolean> = new Subject<boolean>();
  userRef: AngularFirestoreCollection<any> = null;
  private dbPath = '/users';

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) { this.userRef = this.db.collection(this.dbPath); }

  signUp(email: string, password: string, phone: string, region: string, comments: string, discount: number | string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = new Profile(userResponse.user.email, phone, region, comments, discount);
        this.db.collection('users').add({ ...user })
        this.db.collection('users').ref.where('email', '==', userResponse.user.email).onSnapshot(
          snap => {
            snap.forEach(user => {
              const myUser = {
                id: user.id,
                ...user.data() as any
              }
              localStorage.setItem('user', JSON.stringify(myUser));
              this.cheackSignIn.next(true);
              this.router.navigateByUrl('profile');
            })
          })
      })
      .catch(err => console.log(err));
  };

  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        this.db.collection('users').ref.where('email', '==', userResponse.user.email)
          .onSnapshot(snap => {
            snap.forEach(user => {
              const myUser = {
                id: user.id,
                ...user.data() as any
              };
              localStorage.setItem('user', JSON.stringify(myUser));
              this.cheackSignIn.next(true);
              this.localStorageUser = JSON.parse(localStorage.getItem('user'));
              {
                this.router.navigateByUrl('profile');
              }
            })
          })
      })
      .catch(err => console.log(err));
  };

  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.cheackSignIn.next(false);
        this.router.navigateByUrl('home');
      })
      .catch(err => console.log(err));
  };

  updateUserData(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update({ ...data });
  };

  updateUserOrder(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update({ ...data });
  };

}
