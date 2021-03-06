import {Injectable} from '@angular/core';
import {Post} from '../Model/posts/posts.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    now = Date();
    posts: Post[] = [];

    postsSubject = new Subject<Post[]>();

    constructor(private httpClient: HttpClient) {
    }

    emitPostSubject() {
        this.postsSubject.next(this.posts.reverse().slice());
    }

    loveIt(index: number) {
        let loveIts = this.posts[index].loveIts;
        this.posts[index].loveIts = ++loveIts;
        this.emitPostSubject();
    }

    hateIt(index: number) {
        let loveIts = this.posts[index].loveIts;
        this.posts[index].loveIts = --loveIts;
        this.emitPostSubject();
    }

    // addPost(title: string, content: string) {
    //     const newPost = {
    //         id: 0,
    //         title: '',
    //         content: '',
    //         loveIts: 0,
    //         created_at: Date()
    //     };
    //     newPost.id = this.posts[(this.posts.length - 1)].id + 1;
    //     newPost.title = title;
    //     newPost.content = content;
    //
    //     this.posts.push(newPost);
    //     this.emitPostSubject();
    // }

    addPost(newPost: Post) {
        this.posts.push(newPost);
        this.savePosts();
        this.emitPostSubject();
    }

    deletePost(post: Post) {
        const bookIndex = this.posts.findIndex(
            (postToBeRemoved) => {
                if ((postToBeRemoved === post)) {
                    return true;
                }
            }
        );
        this.posts.splice(bookIndex, 1);
        this.emitPostSubject();
    }

    savePostsInDatabase() {
        // var url =
        this.httpClient.put('https://angular-activity-a8a17.firebaseio.com/posts.json', this.posts)
            .subscribe(
                () => {
                    console.log('save complete');
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    fetchPostsFromDatabase() {
        // var url =
        this.httpClient.get<any[]>('https://angular-activity-a8a17.firebaseio.com/posts.json')
            .subscribe(
                (response) => {
                    this.posts = response;
                    this.emitPostSubject();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    savePosts() {
        firebase.database().ref('/posts').set(this.posts);
    }

    getPosts() {
        firebase.database().ref('/posts')
            .on('value', (data) => {
                this.posts = data.val() ? data.val() : [];
                this.emitPostSubject();
            });
    }
}
