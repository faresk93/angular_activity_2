export class Post{
    public id:number;
    public loveIts:number;
    public created_at:string;

    constructor(
        public title:string,
        public content:string,
        ){
    }
}
