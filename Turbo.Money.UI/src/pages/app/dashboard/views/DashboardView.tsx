import { useEffect } from "react";

import IFactoryViewProps from "common/views/IFactoryViewProps";

import IDashboardViewModel from "../viewModels/IDashboardViewModel";

export default function DashboardView({ dataContext }: IFactoryViewProps) {

    const viewModel = dataContext() as IDashboardViewModel;

    useEffect(() => {
        (async () => {
            await viewModel.initializeData();
        })();
    }, []);

    return (
        <div>
            <h1 className='tb-page-title'>It's My Money</h1>
            <h4>{viewModel.user?.name}</h4>
            <br />
            <img src={viewModel.user?.picture} alt={viewModel.user?.name} />
            <br />
            <div>
                {viewModel.posts ? (
                    viewModel.posts.map((post) => <div key={post.title}>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                    </div>)
                ) : (
                    <p>No posts.</p>
                )}
            </div>
        </div>
    )
}
