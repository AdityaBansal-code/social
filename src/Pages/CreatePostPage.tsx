import { Create } from "../Components/Create";

export const CreatePostPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-14 px-4 sm:py-20 md:py-24">
      <section className="w-full max-w-3xl mx-auto bg-gradient-to-tr from-gray-900/90 via-gray-800/80 to-gray-700/70 border border-gray-600/50 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-14 mt-6 sm:mt-12 mb-6 sm:mb-12 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-xl tracking-tight">
          Create a New Post
        </h2>
        <Create />
      </section>
    </main>
  );
};
