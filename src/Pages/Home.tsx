import { PostList } from "../Components/PostList";

export const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#221a3a] to-[#2d1e4d] py-16 px-2 flex flex-col items-center">
      <section className="w-full max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Recent Posts
        </h2>
        <div className="flex justify-center">
          <PostList />
        </div>
      </section>
    </main>
  );
};
