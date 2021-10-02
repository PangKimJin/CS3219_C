import React, { useState } from 'react';
import axios from 'axios';

const New = () => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");

    async function postNew(e) {
        e.preventDefault();
        try {
            await axios.post(`/api/posts`, {
                title, 
                author, 
                category
            });
            setSuccessMessage("Post Added: Head to All Posts to see your applied changes!");
            setErrorMessage(null);
        } catch (error) {
            console.log(error);
            setErrorMessage("Add Post Failed: Make sure to fill in all fields!");
            setSuccessMessage(null);
        }
    }

    return(
        <div>
            <div>
                    <p>
                        <strong>Add New Post</strong>
                    </p>
                </div>
            <div> 
                Want to Add a New Blog Post? Fill in your post title, author name, and category respectively!
            </div>
            < form onSubmit={postNew}>
                <input label="Post Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                <button type="submit">Add Post</button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
                {successMessage && <div className="error"> {successMessage} </div>}
            </form>
        </div>

    );
}

export default New;