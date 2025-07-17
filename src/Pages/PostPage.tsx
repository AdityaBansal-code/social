import { PostDetail } from "../Components/PostDetail";
import { useParams } from "react-router";

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1333] via-[#2d1e4f] to-[#0f051d] py-20 px-4">
      <div className="w-full max-w-3xl bg-gradient-to-tr from-white/10 via-white/5 to-white/0 rounded-3xl shadow-[0_8px_40px_0_rgba(80,0,120,0.25)] p-10 border border-white/10 backdrop-blur-lg ring-1 ring-purple-700/10">
        <div className="animate-fade-in">
          <PostDetail postId={Number(id)} />
        </div>
      </div>
    </div>
  );
};