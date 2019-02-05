import {Component, OnInit} from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PostsService} from 'src/app/Service/posts.service';
import {Router} from '@angular/router';
import {Post} from 'src/app/Model/posts/posts.model';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

    postForm: FormGroup;

    constructor(private postService: PostsService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.postForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            content: ['', [Validators.required, Validators.minLength(4)]],
        });
    }

    onSubmit() {
        const formValue = this.postForm.value;
        const newPost = new Post(formValue['title'], formValue['content'])
        this.postService.addPost(newPost);
        this.router.navigate(['posts']);
    }

}

