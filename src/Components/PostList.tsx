import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import { PostItem } from "./PostItem";

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url?: string;
  like_count?: number;
  comment_count?: number;
}

// Fetching posts from the Supabase database
const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.rpc("get_posts_with_counts");

  if (error) {
    throw new Error(error.message);
  }

  return data as Post[];
};

export const PostList = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span>Loading posts...</span>
        {/* You can add a spinner here */}
      </div>
    );
  }

  // Show error message if there is an issue fetching data
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data?.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};
