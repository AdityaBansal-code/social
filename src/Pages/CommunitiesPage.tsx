import { CommunityList } from "../Components/CommunityList";

export const CommunitiesPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1333] via-[#221a3a] to-[#2d1e4d] py-16 px-2">
      <section className="w-full max-w-4xl mx-auto bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-3xl shadow-2xl p-10 mt-8 mb-8">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Communities
        </h2>
        <CommunityList />
      </section>
    </main>
  );
};
