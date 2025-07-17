import { useParams } from "react-router";
import { CommunityDisplay } from "../Components/CommunityDisplay";

export const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1333] via-[#221a3a] to-[#2d1e4d] py-16 px-2">
      <section className="w-full max-w-4xl mx-auto bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-3xl shadow-2xl p-10 mt-8 mb-8">
        <CommunityDisplay communityId={Number(id)} />
      </section>
    </main>
  );
};
