import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import { Link } from "react-router";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Community[];
};

export const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  // Accent and style variables for a modern, aesthetic, dark theme
  
  const accentBgGradient =
    "bg-gradient-to-br from-black via-gray-900 to-gray-800";
  const accentCardGradient =
    "bg-gradient-to-br from-gray-900 via-gray-800 to-black";
  const accentCardHover =
    "hover:from-gray-800 hover:to-black hover:shadow-2xl hover:border-orange-400/60";
  const cardShadow = "shadow-xl shadow-black/40";
  const cardBorder = "border border-gray-700/70";
  const cardTransition =
    "transition-all duration-200 transform hover:-translate-y-1";
  const cardPadding = "p-8";
  const cardRadius = "rounded-3xl";
  const cardSpacing = "space-y-2";
  const cardTitle =
    "text-3xl font-extrabold text-white drop-shadow-lg tracking-tight";
  const cardTitleAccent =
    "bg-gradient-to-r from-orange-400 via-yellow-300 to-white bg-clip-text text-transparent";
  const cardDesc = "text-gray-300 mt-2 text-lg";
  const cardMeta = "mt-4 flex items-center text-xs text-gray-400 gap-2";

  const container =
    "min-h-[80vh] py-16 px-4 " + accentBgGradient + " flex flex-col items-center";
  const listWrapper = "max-w-4xl w-full mx-auto flex flex-col gap-8";

  if (isLoading)
    return (
      <div className="text-center py-12 text-xl text-gray-200">
        Loading communities...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-400 py-12 text-xl">
        Error: {error.message}
      </div>
    );

  return (
    <div className={container}>
      
      <div className={listWrapper}>
        {data?.map((community) => (
          <div
            key={community.id}
            className={[
              cardBorder,
              accentCardGradient,
              cardShadow,
              cardTransition,
              cardPadding,
              cardRadius,
              cardSpacing,
              accentCardHover,
            ].join(" ")}
          >
            <Link
              to={`/community/${community.id}`}
              className={[
                cardTitle,
                cardTitleAccent,
                "hover:underline hover:text-orange-300 transition-colors duration-150",
              ].join(" ")}
            >
              {community.name}
            </Link>
            <p className={cardDesc}>{community.description}</p>
            <div className={cardMeta}>
              <span className="text-gray-500">Created at:</span>
              <span className="text-gray-300 font-medium">
                {new Date(community.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
