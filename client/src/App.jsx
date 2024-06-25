import './App.css'
import PostCard from './components/PostCard'
import Categories from './components/Categories'

import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

function App() {

  const posts = [
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
      excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
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
      excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
      excerpt: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."
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
      excerpt: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur."
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
      excerpt: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."
    }
  ]


  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-10">
          <div className="lg:col-span-8 col-span-1">
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
