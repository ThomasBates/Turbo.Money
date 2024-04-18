
import IPost from 'models/post/IPost';

export default interface IPublicViewModel {
    posts: IPost[];

    initializeData: () => Promise<void>;
}
