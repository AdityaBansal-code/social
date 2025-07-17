import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import { useAuthStore } from "../Store/AuthStore";

interface Props {
  postId: number;
}

interface Vote {
  id: number;
  post_id: number;
  user_id: string;
  vote: number;
}

const vote = async (voteValue: number, postId: number, userId: string) => {
  const { data: existingVote } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existingVote) {
    if (existingVote.vote === voteValue) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("id", existingVote.id);

      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("votes")
        .update({ vote: voteValue })
        .eq("id", existingVote.id);

      if (error) throw new Error(error.message);
    }
  } else {
    const { error } = await supabase
      .from("votes")
      .insert({ post_id: postId, user_id: userId, vote: voteValue });
    if (error) throw new Error(error.message);
  }
};

const fetchVotes = async (postId: number): Promise<Vote[]> => {
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId);

  if (error) throw new Error(error.message);
  return data as Vote[];
};

export const LikeButton = ({ postId }: Props) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: votes,
    isLoading,
    error,
  } = useQuery<Vote[], Error>({
    queryKey: ["votes", postId],
    queryFn: () => fetchVotes(postId),
    refetchInterval: 5000,
  });

  const { mutate } = useMutation({
    mutationFn: (voteValue: number) => {
      if (!user) throw new Error("You must be logged in to vote!");
      return vote(voteValue, postId, user.id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["votes", postId] });
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-4 text-gray-500">Loading votes...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const likes = votes?.filter((v) => v.vote === 1).length || 0;
  const dislikes = votes?.filter((v) => v.vote === -1).length || 0;
  const userVote = votes?.find((v) => v.user_id === user?.id)?.vote;

  return (
    <div className="flex items-center justify-center space-x-6 my-4">
      {/* Like Button */}
      <button
        onClick={() => mutate(1)}
        className={`px-6 py-2 text-lg font-semibold rounded-full transition-all duration-300 transform ${
          userVote === 1
            ? "bg-green-600 text-white scale-105 shadow-md"
            : "bg-gray-200 text-black hover:bg-green-500 hover:text-white"
        }`}
      >
        <span className="flex items-center space-x-1">
          <span role="img" aria-label="like">
            👍
          </span>{" "}
          {likes}
        </span>
      </button>

      {/* Dislike Button */}
      <button
        onClick={() => mutate(-1)}
        className={`px-6 py-2 text-lg font-semibold rounded-full transition-all duration-300 transform ${
          userVote === -1
            ? "bg-red-600 text-white scale-105 shadow-md"
            : "bg-gray-200 text-black hover:bg-red-500 hover:text-white"
        }`}
      >
        <span className="flex items-center space-x-1">
          <span role="img" aria-label="dislike">
            👎
          </span>{" "}
          {dislikes}
        </span>
      </button>
    </div>
  );
};
