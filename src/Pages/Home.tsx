import { PostList } from "../Components/PostList";

export const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4 flex flex-col items-center">
      <section className="w-full max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-semibold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-xl">
          Recent Posts
        </h2>
        <div className="flex justify-center mt-8">
          <PostList />
        </div>
      </section>
    </main>
  );
};
