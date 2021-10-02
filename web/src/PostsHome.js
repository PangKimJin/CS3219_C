import React from 'react';
import axios from 'axios';
import Post from './Post';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';

export default class PostsHome extends React.Component {
    state = {
      posts: []
    
    }
    
    componentDidMount() {
        axios.get(`/api/posts`)
        .then(res => {
            const posts = res.data;
            this.setState({ posts });
        })
    }
    
    render() {
        return (
            <div>
                <ul>
                    <div>
                        <p>
                            <strong>List of All Blog Posts</strong>
                        </p>
                    </div>
                    { this.state.posts.map(post => <div>{post.id}. [{post.category}] {post.title} - {post.author}</div>)}
                </ul>
            </div>
        )
    }
  }