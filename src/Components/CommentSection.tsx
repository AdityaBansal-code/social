import { useState } from "react";
import { useAuthStore } from "../Store/AuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import { CommentItem } from "./CommentItem";

interface Props {
  postId: number;
}

interface NewComment {
  content: string;
  parent_comment_id?: number | null;
}

export interface Comment {
  id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string;
  user_id: string;
  created_at: string;
  author: string;
}

const createComment = async (
  newComment: NewComment,
  postId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error("You must be logged in to comment.");
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: newComment.content,
    parent_comment_id: newComment.parent_comment_id || null,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

const fetchComments = async (postId: number): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Comment[];
};

export const CommentSection = ({ postId }: Props) => {
  const [newCommentText, setNewCommentText] = useState<string>("");
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    refetchInterval: 5000,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newComment: NewComment) =>
      createComment(
        newComment,
        postId,
        user?.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText) return;
    mutate({ content: newCommentText, parent_comment_id: null });
    setNewCommentText("");
  };

  /* Map of Comments - Organize Replies - Return Tree  */
  const buildCommentTree = (
    flatComments: Comment[]
  ): (Comment & { children?: Comment[] })[] => {
    const map = new Map<number, Comment & { children?: Comment[] }>();
    const roots: (Comment & { children?: Comment[] })[] = [];

    flatComments.forEach((comment) => {
      map.set(comment.id, { ...comment, children: [] });
    });

    flatComments.forEach((comment) => {
      if (comment.parent_comment_id) {
        const parent = map.get(comment.parent_comment_id);
        if (parent) {
          parent.children!.push(map.get(comment.id)!);
        }
      } else {
        roots.push(map.get(comment.id)!);
      }
    });

    return roots;
  };

  // Accent color and gradients for black background
  const accentText = "text-orange-400";
  const accentBorder = "border-orange-400";
  const accentBgGradient =
    "bg-gradient-to-br from-black via-gray-900 to-gray-800";
  const accentButtonGradient =
    "bg-gradient-to-r from-black via-gray-800 to-gray-900";
  const accentButtonHover =
    "hover:from-gray-900 hover:to-black";
  const accentButtonText = "text-orange-300";
  const accentInputBorder = "border-gray-700";
  const accentInputFocus = "focus:ring-2 focus:ring-orange-400";

  if (isLoading) {
    return (
      <div className="text-center py-4 text-lg text-gray-200">
        Loading comments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-4 text-lg">
        Error: {error.message}
      </div>
    );
  }

  const commentTree = comments ? buildCommentTree(comments) : [];

  return (
    <div
      className={`mt-6 rounded-2xl shadow-lg border border-gray-700/60 ${accentBgGradient} p-6`}
    >
      <h3
        className={`text-2xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-400 bg-clip-text text-transparent drop-shadow tracking-tight`}
      >
        Comments
      </h3>
      {/* Create Comment Section */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className={`w-full border ${accentInputBorder} bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white p-3 rounded-lg focus:outline-none ${accentInputFocus} transition`}
            placeholder="Write a comment..."
            rows={3}
          />
          <button
            type="submit"
            className={`mt-3 ${accentButtonGradient} ${accentButtonHover} ${accentButtonText} font-bold px-6 py-2 rounded-xl shadow transition-all duration-200 border border-white/10 tracking-wide`}
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post Comment"}
          </button>
          {isError && (
            <p className="text-center text-red-400 font-medium mt-2">
              Error posting comment.
            </p>
          )}
        </form>
      ) : (
        <p className="mb-6 text-gray-400 text-center">
          You must be logged in to post a comment.
        </p>
      )}

      {/* Comments Display Section */}
      <div className="space-y-4">
        {commentTree.map((comment, key) => (
          <CommentItem key={key} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  );
};
