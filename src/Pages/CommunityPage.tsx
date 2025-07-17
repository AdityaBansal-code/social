import { useParams } from "react-router";
import { CommunityDisplay } from "../Components/CommunityDisplay";

export const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-16 px-4">
      <section className="w-full max-w-4xl mx-auto bg-gradient-to-tr from-white/5 via-gray-900/80 to-gray-800/90 border border-gray-700/60 rounded-3xl shadow-2xl p-10 mt-8 mb-8 backdrop-blur-md">
        {/* Optional heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8 md:mb-12 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-xl tracking-tight">
          Community Details
        </h2>
        <CommunityDisplay communityId={Number(id)} />
      </section>
    </main>
  );
};
