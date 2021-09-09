import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");

async function postName(e) {
    e.preventDefault();
    try {
        await axios.post("http://localhost:3000/post_name", {title, author, category})
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="App">
        < form onSubmit={postName}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    </div>
  );
}

export default App;
