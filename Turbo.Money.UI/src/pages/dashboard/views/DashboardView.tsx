
export default function DashboardView({ viewModel, viewModelArgs }) {
    viewModel = viewModel(viewModelArgs);

    return (
        <div>
            <h1 className='tb-page-title'>It's My Money</h1>
            <h4>{viewModel.user.name}</h4>
            <br />
            <img src={viewModel.user.picture} alt={viewModel.user.name} />
            <br />
            <div>
                {viewModel.posts.map((post, idx) => <div key={post.title}>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                </div>)}
            </div>
        </div>
    )
}
