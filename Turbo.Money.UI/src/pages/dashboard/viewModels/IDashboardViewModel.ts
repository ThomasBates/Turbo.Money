
import IPost from 'models/post/IPost';
import IUserInfo from 'models/user/IUserInfo';

export default interface IDashboardViewModel {
    user: null | IUserInfo;
    posts: IPost[];

    initializeData: () => Promise<void>;
}
