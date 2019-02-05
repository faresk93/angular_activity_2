import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {PostsService} from 'src/app/Service/posts.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-post-list-component',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: any[];
    postsSubscription: Subscription;

    constructor(private postService: PostsService) {
    }

    ngOnInit() {
        this.postService.getPosts();
        this.postsSubscription = this.postService.postsSubject.subscribe(
            (posts: any[]) => {
                this.posts = posts;
            }
        );
        this.postService.emitPostSubject();
    }

    ngOnDestroy() {
        this.postsSubscription.unsubscribe();
    }

    // onSave() {
    //     this.postService.savePostsInDatabase();
    // }

    onFetch() {
        this.postService.getPosts();
    }
}
