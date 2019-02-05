import {Injectable} from '@angular/core';
import {Post} from '../Model/posts/posts.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    now = Date();
    posts: Post[] = [];
    postsSubject = new Subject<Post[]>();

    constructor(private httpClient: HttpClient) {
        this.fetchData();
    }

    emitPostSubject() {
        this.postsSubject.next(this.posts.slice());
    }

    loveIt(index: number) {
        let loveIts = this.posts[index].loveIts;
        this.posts[index].loveIts = ++loveIts;
        let post = this.posts[index];
        this.emitPostSubject();
        this.httpClient.put('http://127.0.0.1:8000/api/posts/' + post.id, post)
            .subscribe(
                () => {
                    this.fetchData();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    hateIt(index: number) {
        let loveIts = this.posts[index].loveIts;
        this.posts[index].loveIts = --loveIts;
        let post = this.posts[index];
        this.httpClient.put('http://127.0.0.1:8000/api/posts/' + post.id, post)
            .subscribe(
                () => {
                    this.fetchData();
                },
                (error) => {
                    console.log(error);
                }
            );
        this.emitPostSubject();
    }

    addPost(title: string, content: string) {

        const newPost = {
            title: '',
            content: '',
            loveIts: 0,
            createdAt: null
        };
        newPost.title = title;
        newPost.content = content;
        newPost.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');


        this.httpClient.post('http://127.0.0.1:8000/api/posts.json', newPost)
            .subscribe(
                () => {
                    console.log('save complete');
                    this.fetchData();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    deletePost(post: Post) {
        this.httpClient.delete('http://127.0.0.1:8000/api/posts/' + post.id)
            .subscribe(
                () => {
                    console.log('delete complete');
                    this.fetchData();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    fetchData() {
        this.httpClient.get<any[]>('http://127.0.0.1:8000/api/posts.json')
            .subscribe(
                (response) => {
                    this.posts = response;
                    this.emitPostSubject();
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
