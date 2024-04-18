
import IPost from "models/post/IPost";

export default interface IPostDataProvider {

    getPosts: () => Promise<IPost[]>;
}
