import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../../Service/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isAuth: boolean;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                (user) ? this.isAuth = true : this.isAuth = false;
            }
        );
    }

    onSignOut() {
        this.authService.signOutUser();
    }

}
