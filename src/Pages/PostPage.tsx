import { PostDetail } from "../Components/PostDetail";
import { useParams } from "react-router";

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-2 sm:py-20 sm:px-4">
      <section
        className="w-full max-w-3xl bg-gray-900/40
        rounded-3xl p-6 sm:p-10 md:p-12 
        shadow-xl ring-1 ring-gray-900/10 
        backdrop-blur-md
        bg-gradient-to-tr from-gray-800/30 via-gray-900/40 to-gray-800/50
        transform transition-all duration-300
        hover:translate-y-[-4px] hover:shadow-lg hover:scale-105"
        style={{
          boxShadow:
            "6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="animate-fade-in">
          <PostDetail postId={Number(id)} />
        </div>
      </section>
    </main>
  );
};
