import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");

    async function postNew(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/new", {
                title, 
                author, 
                category
            });
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <div> 
                Welcome to my Blog!
            </div>
            < form onSubmit={postNew}>
                <input label="Post Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                <button type="submit">Add Post</button>
            </form>
        </div>

    );
}

export default Home;