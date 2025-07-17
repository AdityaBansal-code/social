

import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import supabase from "../utils/supabase";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post | null> => {
  const { data, error, status } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  // If not found, supabase returns status 406 and data is null
  if (status === 406 || data === null) {
    return null;
  }
  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post | null, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    // Not found
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className="text-4xl font-bold text-red-500 mb-4">404 - Post Not Found</h2>
        <p className="text-gray-400 text-lg">The post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {data.title}
      </h2>

      {data.image_url && (
        <div className="w-full max-h-[400px] overflow-hidden rounded-lg shadow-md border border-white/10">
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <p className="text-gray-400 text-lg">{data.content}</p>

      <p className="text-gray-500 text-sm">
        Posted on: {new Date(data.created_at).toLocaleDateString()}
      </p>

      <LikeButton postId={postId} />
      <CommentSection postId={postId} />
    </div>
  );
};
