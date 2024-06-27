import { Link, useParams } from "react-router-dom";
import { EchoVerseContext } from "../context/contractContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

import backImg from '/back.png'

function Post() {

    const { id } = useParams();
    const { currentAccount, echoVerseContract, backendURL } = useContext(EchoVerseContext)

    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const [reply, setReply] = useState("");


    const replyToPost = () => {
        if (reply === "")
            return;

        try {
            const tnx = echoVerseContract.replyToPost(id, reply);
            console.log(tnx, "tnx")

            setReply("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const res = await echoVerseContract.getPost(id);
            console.log(res, "res")

            let tempPost = {};

            tempPost.id = Number(res[0]._hex).toString();

            console.log(tempPost.id, "tempPost.id")
            tempPost.owner = res[1];
            tempPost.title = res[2];
            tempPost.content = res[3];
            // tempPost.tags = res[4];

            const hexValue = res[4]._hex;
            console.log(hexValue, "hexValue")

            let decimalValue = parseInt(hexValue, 16);
            console.log(decimalValue, "decimalValue")
            tempPost.createdAt = moment.unix(decimalValue).utc().format('MMM DD, YYYY');

            const avatar = createAvatar(lorelei, {
            });
            const dataUri = avatar.toDataUri();
            tempPost.photo = dataUri.toString();


            console.log(tempPost)
            setPost(tempPost)
        }

        const fetchPostReplies = async () => {
            try {

                const res = await echoVerseContract.getPostReplies(id);
                console.log(res, "repponse")

                const treplies = res.map(reply => Number(reply._hex));
                console.log(treplies, "replies")

                let tempReplies = [];

                for (let i = 0; i < treplies.length; i++) {
                    const res = await echoVerseContract.getReply(treplies[i]);
                    console.log(res, "res")

                    let tempReply = {};

                    tempReply.id = Number(res[0]._hex).toString();
                    tempReply.postId = res[1];
                    tempReply.replier = res[2];
                    tempReply.content = res[3];


                    const hexValue = res[4]._hex;
                    let decimalValue = parseInt(hexValue, 16);
                    tempReply.createdAt = moment.unix(decimalValue).utc().format('MMM DD, YYYY');

                    const avatar = createAvatar(lorelei, {
                    });
                    const dataUri = avatar.toDataUri();
                    tempReply.photo = dataUri.toString();

                    tempReplies.push(tempReply);
                }

                console.log(tempReplies, "tempReplies")
                setReplies(tempReplies);
            } catch (error) {
                console.log(error)
            }
        }

        if (echoVerseContract) {
            fetchPost();
            fetchPostReplies();
        }
    }, [echoVerseContract, id])



    return (
        <>
            <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 ">
                <div className="text-start px-28">
                    {/* {back button} */}
                    <Link to="/">
                        <img src={backImg} alt="back" className="h-5 w-5" />
                    </Link>
                </div>
                <div className="relative overflow-hidden shadow-md mb-6">
                    {/* <img src={post.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" /> */}
                </div>
                <div className="px-4 lg:px-0">
                    <div className="flex items-center justify-between mb-8 w-full px-28">
                        <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 ">
                            <img
                                alt={post.owner}
                                height="30px"
                                width="30px"
                                className="align-middle rounded-full"
                                src={post.photo}
                            />
                            {
                                post && post.owner &&
                                <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.owner.slice(0, 6) + "..." + post.owner.slice(-4)}</p>
                            }
                        </div>
                        <div className="font-medium text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="align-middle">{post.createdAt}</span>
                        </div>
                    </div>
                    <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                    <div className="mb-8 px-28 text-start">
                        {
                            post.content && post.content.split('\n').map((item, index) => {
                                return <p key={index} className="mb-8">{item}</p>
                            })
                        }
                    </div>
                    <div className="mb-8">
                        <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">
                            Ask help from AI
                        </button>
                    </div>
                </div>

                <div className="text-start px-28">
                    <h2 className="mb-8 text-2xl font-semibold">Replies</h2>
                    <div className="mb-12">
                        <textarea onChange={(e) => setReply(e.target.value)}
                            className="w-full h-32 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50" placeholder="Write your reply here">
                        </textarea>
                        <button onClick={replyToPost}
                            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">
                            Reply
                        </button>
                    </div>

                    <div className="mb-8">
                        {
                            replies.map((reply, index) => {
                                return (
                                    <div key={index} className="mb-8 border-4 border-pink-100 p-6 rounded-lg">
                                        <div className="flex items-center justify-between mb-8 ">
                                            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 ">
                                                <img
                                                    alt={reply.owner}
                                                    height="30px"
                                                    width="30px"
                                                    className="align-middle rounded-full"
                                                    src={reply.photo}
                                                />
                                                {
                                                    reply && reply.replier &&
                                                    <p className="inline align-middle text-gray-700 ml-2 font-medium ">
                                                        {reply.replier.toLowerCase() === currentAccount.toLowerCase() ? "You" : reply.replier.slice(0, 6) + "..." + reply.replier.slice(-4)}
                                                    </p>
                                                }
                                            </div>
                                            <div className="font-medium text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="align-middle">{reply.createdAt}</span>
                                            </div>
                                        </div>
                                        <p className="mb-8">{reply.content}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </>
    )
}

export default Post