import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import supabase from "../utils/supabase";
import { PostItem } from "./PostItem";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  communities: {
    name: string;
  } | null;
}

export const fetchCommunityPost = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as PostWithCommunity[];
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading, refetch } = useQuery<
    PostWithCommunity[],
    Error
  >({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPost(communityId),
  });

  // Accent color for text (primary shade for black bg)
  const accentBgGradient =
    "bg-gradient-to-r from-black via-gray-900 to-gray-800";
  const accentCardGradient =
    "bg-gradient-to-br from-black via-gray-900 to-gray-800";
  const accentCardHover =
    "hover:from-gray-900 hover:to-black hover:shadow-xl hover:border-orange-400/40";

  // Skeleton loader for posts
  const skeletonLoader = (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-700 h-16 w-full rounded"></div>
      <div className="bg-gray-700 h-8 w-5/6 rounded"></div>
      <div className="bg-gray-700 h-8 w-3/4 rounded"></div>
    </div>
  );

  if (isLoading)
    return (
      <div className="text-center py-8 text-lg text-gray-200">
        {skeletonLoader}
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 py-8 text-lg">
        <p>Error: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
        >
          Retry
        </button>
      </div>
    );

  const communityName =
    data && data.length > 0 && data[0].communities
      ? data[0].communities.name
      : "Community";

  return (
    <div
      className={`min-h-[80vh] py-12 px-2 ${accentBgGradient} rounded-3xl shadow-2xl border border-gray-700/60`}
    >
      <h2
        className={`text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight`}
      >
        {communityName} Community Posts
      </h2>

      {data && data.length > 0 ? (
        <div className="max-w-5xl mx-auto flex flex-wrap gap-6 justify-center">
          {data.map((post) => (
            <div
              key={post.id}
              className={`border border-white/10 ${accentCardGradient} p-6 rounded-2xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${accentCardHover} w-full sm:w-full md:w-[45%]`}
            >
              <PostItem post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mt-8">
          No posts in this community yet. <br />
          <button
            onClick={() => (window.location.href = "/create-post")}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
          >
            Create a Post
          </button>
        </div>
      )}
    </div>
  );
};
