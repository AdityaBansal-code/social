
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
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-gray-300 text-lg">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-red-400 text-lg">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    // Not found
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-lg">
          404 - Post Not Found
        </h2>
        <p className="text-gray-400 text-lg">
          The post you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-10 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700/60">
      <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 text-center bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
        {data.title}
      </h2>

      {data.image_url && (
        <div className="w-full max-h-[400px] overflow-hidden rounded-2xl shadow-lg border border-gray-700/40 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700">
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>
      )}

      <p className="text-gray-200 text-lg leading-relaxed bg-gradient-to-r from-gray-900/60 via-gray-800/60 to-gray-700/60 p-6 rounded-xl shadow-inner">
        {data.content}
      </p>

      <div className="flex items-center justify-between text-gray-400 text-sm px-2">
        <span>
          Posted on:{" "}
          <span className="text-white font-medium">
            {new Date(data.created_at).toLocaleDateString()}
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <LikeButton postId={postId} />
        <CommentSection postId={postId} />
      </div>
    </div>
  );
};
