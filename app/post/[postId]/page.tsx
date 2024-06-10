'use client';

import Image from "next/image";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import  {fetchPosts} from '../../fetch-posts';
import '../../../public/style/post.css';

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

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts();
        const selectedPost = posts.find((p: Post) => p.id === Number(postId));
        setPost(selectedPost || null);
      } catch (err) {
        console.error('Error while fetching posts:', err);
      }
    };

    if (postId) {
      loadPosts();
    }
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return(
    <main className="flex flex-col min-h-screen bg-white p-14 pt-17">
      <h1 className="text-3xl font-bold mb-10 text-center">{post.title}</h1>
      
      <div className="border-b-2 border-gray-200 pb-6 mb-7 flex justify-center">
        <div className="flex gap-2 items-center">
          <p className="tag">{post.views} views</p>
          <div className="flex items-center">
            <Image src="/img/like.png" alt="like" width={23} height={21} />
            <p className="italic text-sm mr-4 ml-2">{post.reactions.likes} likes</p>
          </div>
          <div className="flex items-center">
            <Image src="/img/dislike.png" alt="dislike" width={22} height={20} />
            <p className="italic text-sm ml-2">{post.reactions.dislikes} dislikes</p>
          </div>
        </div>
      </div>

      <p className="text-lg mb-7 leading-7">{post.body}</p>
      
    </main>
  );
}