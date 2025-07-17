import { CommunityList } from "../Components/CommunityList";

export const CommunitiesPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-16 px-4">
      <section className="w-full max-w-4xl mx-auto bg-gradient-to-tr from-gray-800/70 via-gray-700/50 to-gray-600/30 border border-gray-600/30 rounded-3xl p-12 mt-8 mb-8 backdrop-blur-md shadow-neumorphism">
        {/* Heading with Orange Gradient */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-8 md:mb-12 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Communities
        </h2>

        {/* Optional subheading or description with gradient text */}
        <p className="text-lg sm:text-xl text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">
          Explore and join various communities that match your interests!
        </p>

        <CommunityList />
      </section>
    </main>
  );
};
