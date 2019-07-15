import React, {Component} from 'react';
import api from '../services/api';
import io from 'socket.io-client';




import './Feed.css';
import more from '../assets/more.png';
import like from '../assets/like.png';
import send from '../assets/send.png';
import comment from '../assets/comment.png';




class Feed extends Component{
    state = {
        feed: [],
    };


    async componentDidMount(){
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    }


    registerToSocket = () => {
        const socket = io('http://localhost');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ... this.state.feed ]});
        });

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post)
            });
        });
    }



    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }



    render(){
        return (
            <section id="post-list">


                {this.state.feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span><b>{post.author}</b></span>
                            <span className="place">{post.place}</span>
                        </div>

                        <img width="20"  src={more} alt='Mais'></img>
                    </header>
                    <img src={`http://localhost/files/${post.image}`} />
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img width="30" src={like} alt="like" />
                            </button>
                            <img width="30" src={comment} alt="comment" />
                            <img width="30" src={send} alt="send" />
                        </div>
                        <strong>{post.likes} curtidas</strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
                ))}


            </section>
        )
    };
}

export default Feed;