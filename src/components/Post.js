function Post(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
    
    }

    return (
        <form class="post-form">
            <div class="post-container">
                <h1 class="text-center">Create new Post</h1>
                <hr/>
                <input type="text" placeholder="Enter email..." name="email" id="email" value="" onChange="" required/>
                <input type="password" placeholder="Enter password..." name="password" id="password" value="" onChange="" required/>
                <hr/>
                <button type="submit" class="postbtn">Login</button>
            </div>
        </form>
    )
}
export default Post;