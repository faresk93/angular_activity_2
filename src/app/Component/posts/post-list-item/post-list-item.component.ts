import {Component, Input, OnInit} from '@angular/core';
import { PostsService } from 'src/app/Service/posts.service';
import { Post } from 'src/app/Model/posts/posts.model';

@Component({
    selector: 'app-post-list-item-component',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
    @Input() indexOfPost:number;
    @Input() loveIts:number;
    @Input() postTitle: string;
    @Input() postContent: string;
    @Input() postDate: Date;
    @Input() post:Post;

    constructor(private postService:PostsService) {
    }

    onLoveIt() {
        this.postService.loveIt(this.indexOfPost)
    }

    onHateIt() {
        this.postService.hateIt(this.indexOfPost);

    }

    onDelete(post: Post){
        this.postService.deletePost(post);
    }

    

    ngOnInit() {
    }

}
