import './App.css'
import PostCard from './components/PostCard'
import Categories from './components/Categories'
import moment from 'moment';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useContext, useEffect, useState } from 'react';
import { EchoVerseContext } from './context/contractContext';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios';

function App() {

  const { currentAccount, echoVerseContract, backendURL } = useContext(EchoVerseContext)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false)


  function close() {
    setIsOpen(false)
  }

  // fetch query params
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');


  useEffect(() => {
    const fetchPosts = async () => {

      const res = await echoVerseContract.getAllPosts();
      console.log(res)

      let noOfPosts = res[0].length;
      let tempPosts = [];

      for (let i = 0; i < noOfPosts; i++) {

        let tempPost = {};

        tempPost.id = Number(res[0][i]._hex).toString();
        tempPost.owner = res[1][i];
        tempPost.title = res[2][i];
        tempPost.content = res[3][i];
        tempPost.tags = res[4][i];

        const hexValue = res[5][i]._hex;
        let decimalValue = parseInt(hexValue, 16);
        tempPost.createdAt = moment.unix(decimalValue).utc().format('MMM DD, YYYY');

        const avatar = createAvatar(lorelei, {
        });
        const dataUri = avatar.toDataUri();
        tempPost.photo = dataUri.toString();

        console.log(tempPost, "tempPost");
        tempPosts.push(tempPost);
      }

      setPosts(tempPosts);
    }

    if (echoVerseContract)
      fetchPosts();
  }, [echoVerseContract])


  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  const handleCreateNewPost = async () => {

    try {
      console.log("Creating new post...");

      if (postTitle === '' || postContent === '') {
        alert('Please fill in all fields')
        return
      }

      console.log(postTitle, postContent, echoVerseContract)
      const res = await axios.post(`${backendURL}/tags`, {
        postContent: postContent
      })
      console.log(res.data)
      const tags = res.data.tags
      echoVerseContract.createPost(postTitle, postContent, tags)
      setIsOpen(false)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className='p-10'>
        <div className='flex items-center justify-between pb-5 static'>
          <div></div>
          <h1 className="text-5xl font-extrabold text-gray-800 pb-2 px-6 ">
            EchoVerse
          </h1>
          <div className="flex items-center justify-center bg-pink-600 text-white px-4 py-2 rounded-full"
          >{
              currentAccount.slice(0, 6) + "..." + currentAccount.slice(-4)
            }</div>
        </div>

        <h3 className="text-center font-semibold text-lg  text-gray-800 mb-8">
          Anonymous stories, empowered by community and AI 🌍 <br />
          Share your voice without revealing your identity.
          <span className='text-pink-600 px-2 cursor-pointer' onClick={() => setIsOpen(true)}>
            Share your Story!
          </span>
        </h3>


        <div className="container mx-auto px-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-10">
            <div className="lg:col-span-8 col-span-1" >
              <h3 className='text-3xl pb-8 font-bold'>
                Latest Stories
              </h3>
              {posts.map((post, index) => (
                // JSON.stringify(post.tags)
                category ? (post.tags.includes(category) && <PostCard key={index} post={post} />) :
                  <PostCard key={index} post={post} />
              ))}
            </div>
            <div className="lg:col-span-4 col-span-1">
              <div className="lg:sticky relative top-8">
                {/* <PostWidget /> */}
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <DialogBackdrop className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className=" w-3/4 rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-semibold">
                Share your Story
              </DialogTitle>

              <div className="mt-6">
                <input type="text" className='w-full border border-gray-300 rounded-lg p-2 mb-4' placeholder='Title'
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <textarea className='w-full border border-gray-300 rounded-lg p-2 mb-4' placeholder='Story' rows='5'
                  onChange={(e) => setPostContent(e.target.value)}
                ></textarea>

                <div className='text-center'>
                  <button className=' bg-pink-600 text-white px-4 py-2 rounded-lg' onClick={handleCreateNewPost}>
                    Submit
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

    </>
  )
}

export default App
