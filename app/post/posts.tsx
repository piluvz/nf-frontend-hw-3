
'use client'
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../fetch-posts';
import '../../public/style/post.css';

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (err) {
        console.error('Error while fetching posts:', err);
      }
    };

    loadPosts();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-white p-14 pt-10">
      <h1 className="text-2xl font-bold mb-10">Hello, world!</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-14">
            <div className="flex gap-8 items-center mb-4">
            <Link href={`/post/${post.id}`}>
              <div>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
              </div>
            </Link>
              <div>
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
            </div>
            </div>
          
            <p className="mb-7">{post.body}</p>

            <div className="border-b-2">
              <div className="flex gap-2 items-center mb-6">
                <p className="tag">{post.views} views</p>
                <Image src="/img/like.png" alt="like" width={23} height={21} />
                <p className="italic text-sm mr-4">{post.reactions.likes} likes</p>
                <Image src="/img/dislike.png" alt="dislike" width={22} height={20} />
                <p className="italic text-sm">{post.reactions.dislikes} dislikes</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}