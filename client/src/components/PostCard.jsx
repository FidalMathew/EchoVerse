
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';


const PostCard = ({ post }) => {

    return (
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">

            {/* <div className="relative overflow-hidden shadow-md pb-80 mb-6">
            <img src={post.featuredImage.url} alt="" className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div> */}

            <h1 className="transition duration-700 text-start mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h1>
            <div className='w-full text-start px-2 flex flex-wrap'>
                {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-pink-200 mb-5 text-gray-700 font-medium px-2 py-1 rounded-full mr-2">{tag}</span>
                ))}
            </div>
            <div className="block lg:flex text-start items-center justify-start mb-8 w-full">
                <div className="flex justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
                    <img src={post.photo} alt={post.owner} className="align-middle rounded-full h-10 w-10" />
                    <p className="inline align-middle text-gray-700 ml-2 font-medium ">{post.owner.slice(0, 6) + "..." + post.owner.slice(-4)}</p>
                </div>
                <div className="font-medium text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="align-middle">{post.createdAt}</span>
                </div>
            </div>
            <p className="text-start  text-gray-700 font-normal px-5 lg:px-5 mb-8">
                {post.content.slice(0, post.content.indexOf(' ', 200))}... (Read More)
            </p>
            <div className="text-center">
                <Link to={`/post/${post.slug}`}>
                    <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600  font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
                </Link>
            </div>
        </div>
    )
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostCard;