import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [id, setId] = useState("");

    async function deletePost(e) {
        e.preventDefault();
        try {
            let destination = '/api/posts/' + id;
            await axios.delete(destination, {
                id,
            });
            setSuccessMessage("Post Deleted: Head to All Posts to see your applied changes!");
            setErrorMessage(null);
        } catch (error) {
            console.log(error);
            setErrorMessage("Delete Post Failed: Make sure to fill in a valid post id!");
            setSuccessMessage(null);
        }
    }

    return(
        <div>
            <div>
                    <p>
                        <strong>Delete a Blog Post</strong>
                    </p>
                </div>
            <div> 
                Want to Delete a Blog Post? Select the post id that you want to delete!
            </div>
            < form onSubmit={deletePost}>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)}/>
                <button type="submit">Delete Post</button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
                {successMessage && <div className="error"> {successMessage} </div>}
            </form>
        </div>
    );
}

export default Delete;