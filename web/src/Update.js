import React, { useState } from 'react';
import axios from 'axios';

const Update = () => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");

    async function updatePost(e) {
        e.preventDefault();
        try {
            let destination = '/api/posts/' + id;
            await axios.put(destination, {
                id,
                title, 
                author, 
                category
            });
            setSuccessMessage("Post Updated: Head to All Posts to see your applied changes!");
            setErrorMessage(null);
        } catch (error) {
            console.log(error);
            setErrorMessage("Update Post Failed: Make sure post id is valid and all fields are filled with a minimum of 2 characters!");
            setSuccessMessage(null);
        }
    }

    return(
        <div>
            <div>
                <p>
                    <strong>Update a Blog Post</strong>
                </p>
            </div>
            <div> 
                Want to Update a Blog Post? Select the post id that you want to edit, then fill in your post title, author name, and category respectively!
            </div>
            < form onSubmit={updatePost}>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)}/>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                <button type="submit">Update Post</button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
                {successMessage && <div className="error"> {successMessage} </div>}
            </form>
        </div>

    );
}

export default Update;