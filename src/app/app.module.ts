import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './Component/auth/signup/signup.component';
import {SigninComponent} from './Component/auth/signin/signin.component';
import {NewPostComponent} from './Component/posts/new-post/new-post.component';
import {AuthService} from './Service/auth.service';
import {AuthGuardService} from './Service/auth-guard.service';
import {PostsService} from './Service/posts.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './Component/header/header.component';
import {PostListComponent} from './Component/posts/post-list/post-list.component';
import {PostListItemComponent} from './Component/posts/post-list-item/post-list-item.component';

const appRoutes: Routes = [
    {path: 'auth/signup', component: SignupComponent},
    {path: 'auth/signin', component: SigninComponent},
    {path: 'posts', canActivate: [AuthGuardService], component: PostListComponent},
    {path: 'posts/new', canActivate: [AuthGuardService], component: NewPostComponent},
    {path: '', redirectTo: 'posts', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        AppComponent,
        PostListComponent,
        PostListItemComponent,
        NewPostComponent,
        SignupComponent,
        SigninComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AuthService,
        AuthGuardService,
        PostsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
