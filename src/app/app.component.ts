import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
        var config = {
            apiKey: 'AIzaSyD2cOca9bxoF3m1ARf7-SzdA2KBJwMi0r0',
            authDomain: 'angular-activity-a8a17.firebaseapp.com',
            databaseURL: 'https://angular-activity-a8a17.firebaseio.com',
            projectId: 'angular-activity-a8a17',
            storageBucket: '',
            messagingSenderId: '821926797582'
        };
        firebase.initializeApp(config);
    }

}
