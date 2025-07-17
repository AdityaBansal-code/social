import { PostList } from "../Components/PostList";

export const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-16 px-2 flex flex-col items-center">
      <section className="w-full max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-10 text-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Recent Posts
        </h2>
        <div className="flex justify-center">
          <PostList />
        </div>
      </section>
    </main>
  );
};
