import { Create } from "../Components/Create";

export const CreatePostPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-10 px-2 sm:py-16 md:py-20">
      <section className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto bg-gradient-to-tr from-white/5 via-gray-900/80 to-gray-800/90 border border-gray-700/60 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-14 mt-6 sm:mt-10 mb-6 sm:mb-10 backdrop-blur-md">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 md:mb-12 text-center bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Create a New Post
        </h2>
        <Create />
      </section>
    </main>
  );
};
