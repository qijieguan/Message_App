import './styles/community-post.css';
import { AiFillLike  } from 'react-icons/ai';
import { BsShareFill } from 'react-icons/bs';
import { BiCommentMinus } from 'react-icons/bi';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';

const CommunityPost = ({communityID, communityName, communityProfile, post}) => {

    const [likes, setLikes] = useState(post && post.likes);
    const [commentCount, setComment] = useState(post ? post.comments.length : []);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(async () => {
        if (post) { highlightLikes(); }
    }, [likes]);


    const highlightLikes = () => {
        let match = likes.filter(id => id === user._id);

        if (match.length > 0) {
            document.getElementById(post._id)?.querySelector('.community-page-footer>.community-page-likes')?.classList.add('active');
        }
        else {
            document.getElementById(post._id)?.querySelector('.community-page-footer>.community-page-likes')?.classList.remove('active');
        }
    }

    const toggleLike = async (event) => {
        let result;

        if (!event.currentTarget.className.includes('active')) { result = [...likes, user._id]; }
        else { result = likes.filter(id => id !== user._id); }

        await axios.post(baseURL + '/communities/community-post/update-likes/', { 
            community_id: communityID,
            post_id: post._id,
            likes: result
        });

        post.likes = result;
        setLikes(result);
    }

    const viewComment = () => {
        navigate(
            "/Dashboard/Community_Post/" + post._id + "/Comment",
            {state: {
                community_id: communityID,
                community_name: communityName,
                poster_id: communityID,
                poster_name: communityName, 
                poster_profile: communityProfile, 
                post: post,
                route: 'communities/community-post'
            }},
            {replace: true}
        );
    }

    return (
        <div className='community-page-post-wrapper flex'>
            { post &&
                <div className='community-page-post flex' id={post._id}>
                    <div className='community-page-post-header flex'>
                        <img src={post.poster_image} alt=""/>
                        <span>{post.poster_name}</span>
                    </div>
                    <span>{post.primary_text}</span>
                    <img src={post.primary_image} alt=""/>   
                    <div className='community-page-footer flex'>
                        <div className='community-page-likes flex' onClick={toggleLike}> 
                            <AiFillLike className='community-page-icon'/>
                            <span>Like</span>
                            {likes.length > 0 &&
                                <div className='like-count count flex'>{likes.length}</div>
                            }
                        </div>
                        <div className='community-page-comment flex' onClick={viewComment}>
                            <BiCommentMinus className='community-page-icon'/>
                            <span>Comment</span>
                            {commentCount > 0 &&
                                <div className='comment-count count flex'>{commentCount}</div>
                            }
                        </div>
                        <div className='community-page-share flex'>
                            <BsShareFill className='community-page-icon' style={{fontSize: 'clamp(0.875rem, 1.25vw, 1.25rem)'}}/>
                            <span>Share</span>
                        </div>
                    </div>
                </div>  
            }
        </div>  
    )
}

export default CommunityPost;