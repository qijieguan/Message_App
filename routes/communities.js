const router = require('express').Router();
let Community = require('../models/community.model');

router.route('/init').post((req, res) => {
    const communities = req.body.communities;

    Community.insertMany(communities)
    .then(() => res.json("Preset Communities are Added"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/').get((req, res) => {
    Community.find()
    .then((result) => res.json(result))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/get').post((req, res) => {
    const member_id = req.body.member_id;
    
    Community.find(
        {'members.member_id': member_id}
    )
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/view').post((req, res) => {
    const community_id = req.body.community_id;
    
    Community.findOne({'_id': community_id})
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/join').post((req, res) => {
    const community_id = req.body.community_id;
    const member = req.body.member;
    
    Community.updateOne({_id: community_id}, {$push: {members: member}})
    .then(result => res.json("Joined community successfully!"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/leave').post((req, res) => {
    const community_id = req.body.community_id;
    const member_id = req.body.member_id;
    
    Community.updateOne(
        {_id: community_id}, {$pull: {members : {member_id: member_id}}}
    )
    .then(result => res.json("Leave community successfully!"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/community-post/get-data').post((req, res) => {
    const post_id = req.body.post_id;
    Community.find(
        {'posts._id': post_id}, 
        {'posts.$': 1}
    )
    .then(result => {res.json(result[0].posts[0]);})
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/community-post/update-likes').post((req, res) => {
    const community_id = req.body.community_id;
    const post_id = req.body.post_id;
    const likes = req.body.likes;
    
    Community.updateOne(
        {'_id': community_id, 'posts._id': post_id}, 
        {$set: {'posts.$.likes' : likes}},
    )
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error " + err));
});

router.route('/community-post/post-comment').post((req, res) => {
    const community_id = req.body.community_id;
    const post_id = req.body.post_id;
    const comment = req.body.comment;
    
    Community.findOneAndUpdate(
        {'_id': community_id, 'posts._id': post_id}, 
        {$push: {'posts.$.comments' : comment}},
    )
    .then(result => res.json("Comment posted successfully!"))
    .catch(err => res.status(400).json("Error " + err));
});


module.exports = router;