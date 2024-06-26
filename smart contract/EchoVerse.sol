// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EchoVerse {
    uint public postCount = 0;
    uint public replyCount = 0;

    struct Post {
        uint id;
        address author;
        string title;
        string content;
        string[] tags;
        uint timestamp;
    }

    struct Reply {
        uint id;
        uint postId;
        address replier;
        string content;
        uint timestamp;
    }

    mapping(uint => Post) public posts;
    mapping(uint => Reply) public replies;
    mapping(uint => uint[]) public postReplies;

    event PostCreated(
        uint id,
        address author,
        string title,
        string content,
        string[] tags,
        uint timestamp
    );
    event ReplyCreated(
        uint id,
        uint postId,
        address replier,
        string content,
        uint timestamp
    );

    function createPost(
        string memory _title,
        string memory _content,
        string[] memory _tags
    ) public {
        postCount++;
        posts[postCount] = Post(
            postCount,
            msg.sender,
            _title,
            _content,
            _tags,
            block.timestamp
        );
        emit PostCreated(
            postCount,
            msg.sender,
            _title,
            _content,
            _tags,
            block.timestamp
        );
    }

    function replyToPost(uint _postId, string memory _content) public {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        replyCount++;
        replies[replyCount] = Reply(
            replyCount,
            _postId,
            msg.sender,
            _content,
            block.timestamp
        );
        postReplies[_postId].push(replyCount);
        emit ReplyCreated(
            replyCount,
            _postId,
            msg.sender,
            _content,
            block.timestamp
        );
    }

    function getPost(
        uint _postId
    )
        public
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string[] memory,
            uint
        )
    {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        Post memory post = posts[_postId];
        return (
            post.id,
            post.author,
            post.title,
            post.content,
            post.tags,
            post.timestamp
        );
    }

    function getReply(
        uint _replyId
    ) public view returns (uint, uint, address, string memory, uint) {
        require(_replyId > 0 && _replyId <= replyCount, "Reply does not exist");
        Reply memory reply = replies[_replyId];
        return (
            reply.id,
            reply.postId,
            reply.replier,
            reply.content,
            reply.timestamp
        );
    }

    function getPostReplies(uint _postId) public view returns (uint[] memory) {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        return postReplies[_postId];
    }

    function getAllPosts()
        public
        view
        returns (
            uint[] memory,
            address[] memory,
            string[] memory,
            string[] memory,
            string[][] memory,
            uint[] memory
        )
    {
        uint[] memory ids = new uint[](postCount);
        address[] memory authors = new address[](postCount);
        string[] memory titles = new string[](postCount);
        string[] memory contents = new string[](postCount);
        string[][] memory tagsArray = new string[][](postCount);
        uint[] memory timestamps = new uint[](postCount);

        for (uint i = 1; i <= postCount; i++) {
            Post memory post = posts[i];
            ids[i - 1] = post.id;
            authors[i - 1] = post.author;
            titles[i - 1] = post.title;
            contents[i - 1] = post.content;
            tagsArray[i - 1] = post.tags;
            timestamps[i - 1] = post.timestamp;
        }

        return (ids, authors, titles, contents, tagsArray, timestamps);
    }

    function getPostWithReplies(
        uint _postId
    )
        public
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string[] memory,
            uint,
            uint[] memory
        )
    {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        Post memory post = posts[_postId];
        uint[] memory replyIds = postReplies[_postId];
        return (
            post.id,
            post.author,
            post.title,
            post.content,
            post.tags,
            post.timestamp,
            replyIds
        );
    }
}
