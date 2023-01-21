module.exports.isOwner = (userId, post) => {
  
    return userId == post.userId;
};
