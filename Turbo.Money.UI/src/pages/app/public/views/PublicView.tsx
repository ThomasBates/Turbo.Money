import { useEffect } from "react";

import IFactoryViewProps from "common/views/IFactoryViewProps";

import IPublicViewModel from "../viewModels/IPublicViewModel";

export default function PublicView({ dataContext }: IFactoryViewProps) {

    const viewModel = dataContext() as IPublicViewModel;

    useEffect(() => {
        (async () => {
            await viewModel.initializeData();
        })();
    }, []);

    return (
        <div className="tb-public">
            <h1 className='tb-page-title'>It's My Money</h1>
            <div>
                {viewModel.posts &&
                    viewModel.posts.map(post => <div key={post.title}>
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                    </div>)}
            </div>
        </div>
    );
}
