import './styles/post.css';

import { BsTrash, BsFillShareFill } from 'react-icons/bs';
import { BiCommentMinus } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Post = ({post, poster_id, poster_profile, poster_name, post_image, post_text, deletePost}) => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likes);
    const [commentCount, setComment] = useState(post.comments.length);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(async () => {
        let match = likes.filter(id => id === user._id);

        if (match.length > 0) {
            document.getElementById(post._id)?.querySelector('.post-footer>.post-like')?.classList.add('active');
        }
        else {
            document.getElementById(post._id)?.querySelector('.post-footer>.post-like')?.classList.remove('active');
        }

        await axios.post(baseURL + '/posts/update-likes/', { 
            poster_id: poster_id,
            post_id: post._id,
            likes: likes 
        });

    }, [post._id, likes]);

    const toggleLike = (event) => {
        if (!event.currentTarget.className.includes('active')) {
            setLikes([...likes, user._id]);
        }
        else {
            setLikes(likes.filter(id => id !== user._id));
        }
    }

    const handleClick = (poster_id, poster_name, poster_profile, post) => {
        navigate(
            "/Dashboard/Post/" + post._id + "/Comment",
            {state: {poster_id: poster_id, poster_name: poster_name, poster_profile: poster_profile, post: post}},
            {replace: true}
        );
    }

    return (
        <div className='post flex' id={post._id}>
            <div className='post-header flex'>
                <img className='poster-image' src={poster_profile} alt=""></img>
                <div className='poster-name'>{poster_name}</div>
            </div>
            <div className='primary-text'>{post_text}</div>
            {post.primary_image &&
                <img src={post_image} className='primary-image' alt=""/>
            }
            {user._id === poster_id &&
                <div className='delete-wrapper flex'>
                    <div className='delete-message'>Delete Post</div>
                    <BsTrash className='trash-button' onClick={() => {return deletePost(post._id);}}/>
                </div>
            }
            <div className='post-footer flex'>
                <div className='post-like action flex' onClick={toggleLike}>
                    <AiFillLike className='post-icon'/>
                    <span>Like</span>
                    {likes.length > 0 &&
                        <div className='like-count count flex'>{likes.length}</div>
                    }
                </div>

                <div 
                    onClick={() => {handleClick(poster_id, poster_name, poster_profile, post)}}
                    className='post-comment action flex'>
                    <BiCommentMinus className='post-icon'/>
                    <span>Comment</span>
                    {commentCount > 0 &&
                        <div className='comment-count count flex'>{commentCount}</div>
                    }
                </div>

                <div className='post-share action flex'>
                    <BsFillShareFill className='post-icon'/>
                    <span>Share</span>
                </div>
            </div>

            
        </div>
    )
}

export default Post;