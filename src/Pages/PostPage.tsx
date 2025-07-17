import { PostDetail } from "../Components/PostDetail";
import { useParams } from "react-router";

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-2 sm:py-20 sm:px-4">
      <section className="w-full max-w-3xl bg-gradient-to-tr from-white/10 via-gray-200/10 to-gray-900/20 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 border border-gray-700/30 backdrop-blur-md ring-1 ring-gray-900/10">
        <div className="animate-fade-in">
          <PostDetail postId={Number(id)} />
        </div>
      </section>
    </main>
  );
};