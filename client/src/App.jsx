import './App.css'
import PostCard from './components/PostCard'
import Categories from './components/Categories'

import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useEffect, useState } from 'react';

function App() {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const staticPosts = [
    {
      title: "Excepteur sint occaecat cupidatat non proident",
      slug: "excepteur-sint-occaecat-cupidatat-non-proident",
      featuredImage: {
        url: "https://via.placeholder.com/600x400"
      },
      author: {
        name: "Jane Doe",
        photo: {
          url: "https://via.placeholder.com/150"
        }
      },
      createdAt: "2023-03-18T14:32:04.019Z",
      excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tags: ["Lifestyle", "Health", "Wellness"]
    },
    {
      title: "Sed ut perspiciatis unde omnis iste natus",
      slug: "sed-ut-perspiciatis-unde-omnis-iste-natus",
      featuredImage: {
        url: "https://via.placeholder.com/600x400"
      },
      author: {
        name: "John Smith",
        photo: {
          url: "https://via.placeholder.com/150"
        }
      },
      createdAt: "2022-11-22T11:14:33.019Z",
      excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: ["Business", "Finance", "Economy"]
    },
    {
      title: "At vero eos et accusamus et iusto odio dignissimos",
      slug: "at-vero-eos-et-accusamus-et-iusto-odio-dignissimos",
      featuredImage: {
        url: "https://via.placeholder.com/600x400"
      },
      author: {
        name: "Alice Johnson",
        photo: {
          url: "https://via.placeholder.com/150"
        }
      },
      createdAt: "2021-07-30T07:55:12.019Z",
      excerpt: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      tags: ["Law", "Justice", "Ethics"]
    },
    {
      title: "Nemo enim ipsam voluptatem quia voluptas",
      slug: "nemo-enim-ipsam-voluptatem-quia-voluptas",
      featuredImage: {
        url: "https://via.placeholder.com/600x400"
      },
      author: {
        name: "Bob Brown",
        photo: {
          url: "https://via.placeholder.com/150"
        }
      },
      createdAt: "2023-01-15T22:45:22.019Z",
      excerpt: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      tags: ["Technology", "Innovation", "Gadgets"]
    },
    {
      title: "Neque porro quisquam est qui dolorem",
      slug: "neque-porro-quisquam-est-qui-dolorem",
      featuredImage: {
        url: "https://via.placeholder.com/600x400"
      },
      author: {
        name: "Charlie Davis",
        photo: {
          url: "https://via.placeholder.com/150"
        }
      },
      createdAt: "2022-05-08T09:25:42.019Z",
      excerpt: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      tags: ["Philosophy", "History", "Culture"]
    }
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      console.log("Fetching posts...", staticPosts.length);
      const tempPosts = staticPosts.map((post) => {

        const tempPost = {};
        const avatar = createAvatar(lorelei, {
          seed: post.author.name,
        });

        const dataUri = avatar.toDataUri();

        tempPost.title = post.title;
        tempPost.slug = post.slug;
        tempPost.featuredImage = {
          url: post.featuredImage.url
        };

        tempPost.author = {
          name: post.author.name,
          photo: {
            url: dataUri
          }
        };

        tempPost.createdAt = post.createdAt;
        tempPost.excerpt = post.excerpt;
        tempPost.tags = post.tags;

        return tempPost;

      })

      setPosts(tempPosts);
    }
    fetchPosts();
  }, [])


  return (
    <>
      <h1 className="text-5xl font-extrabold text-gray-800 pb-2 px-6 ">
        EchoVerse
      </h1>

      <h3 className="text-center font-semibold text-lg  text-gray-800 mb-8">
        Anonymous stories, empowered by community and AI 🌍 <br />
        Share your voice without revealing your identity.
        <span className='text-pink-600 px-2 cursor-pointer'>
          Share your Story!
        </span>
      </h3>


      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-10">
          <div className="lg:col-span-8 col-span-1">
            <h3 className='text-3xl pb-8 font-bold'>
              Latest Stories
            </h3>
            {posts.map((post, index) => (
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
    </>
  )
}

export default App
