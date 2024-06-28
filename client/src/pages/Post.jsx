import { Link, useParams } from "react-router-dom";
import { EchoVerseContext } from "../context/contractContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

import backImg from '/back.png'
import axios from "axios";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

function Post() {

    const { id } = useParams();
    const { currentAccount, echoVerseContract, backendURL } = useContext(EchoVerseContext)


    const [isOpen, setIsOpen] = useState(false)


    function close() {
        setIsOpen(false)
    }


    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const [reply, setReply] = useState("");
    const [askAI, setAskAI] = useState("");

    const [aiResponse, setAiResponse] = useState("");
    const [aiLoading, setAiLoading] = useState(false);


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


    function removeTextBetweenMarkers(text) {
        const regex = /\*\*.*?\*\*/g;
        return text.replace(regex, '').trim();
    }

    const getAIadvice = async () => {
        if (askAI === "")
            return;
        setAiLoading(true);
        try {
            const res = await axios.post(backendURL + "/advice", {
                postContent: post.content,
                advice: askAI
            });
            console.log(res, "res")

            const advice = res.data.advice;
            console.log(advice, "advice")

            // let advice = "**Advice:** It's understandable to feel frustrated and disheartened by discrimination."

            const tt = removeTextBetweenMarkers(advice);
            console.log(tt, "tt")

            // let tt = advice
            // let temp = replies;
            // temp.push({
            //     id: replies.length + 1,
            //     postId: id,
            //     replier: "AI",
            //     content: tt,
            //     createdAt: moment().utc().format('MMM DD, YYYY')
            // })

            setAiResponse(tt);

            setAskAI("");
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (aiResponse !== "") {
            setAiLoading(false);
        }
    }, [aiResponse]);

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
                    <div className="mb-8 px-28">
                        <div className="mb-12">
                            {/* <textarea onChange={(e) => setAskAI(e.target.value)}
                                className="w-full h-24 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" placeholder="Ask your suggestions...">
                            </textarea> */}
                            <button onClick={() => setIsOpen(true)}
                                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">
                                Ask help from AI
                            </button>
                        </div>
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

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-black/60" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className=" w-3/4 rounded-xl  bg-white p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-lg font-semibold">
                                Share your Story
                            </DialogTitle>

                            <div className="mt-6">
                                <div className="mb-12">
                                    <textarea onChange={(e) => setAskAI(e.target.value)}
                                        className="w-full h-24 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" placeholder="Ask your suggestions...">
                                    </textarea>
                                    <button onClick={getAIadvice}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">
                                        Submit
                                    </button>
                                    <div className="mb-8">
                                        {
                                            aiLoading &&
                                            <p className="mt-8">
                                                <div role="status">
                                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </p>
                                        }
                                        {!aiLoading && aiResponse &&
                                            <p className="mt-8">Generated Response:
                                                <br /> <br />
                                                {aiResponse}
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Post