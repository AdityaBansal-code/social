import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../utils/supabase";
import { useAuthStore } from "../Store/AuthStore";

interface CommunityInput {
  name: string;
  description: string;
}
const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase.from("communities").insert(community);

  if (error) throw new Error(error.message);
  return data;
};

export const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!user) {
      setAuthError("Sign in before to create community");
      return;
    }
    mutate({ name, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 px-6 py-10 rounded-3xl shadow-2xl border border-gray-700/60 bg-gradient-to-br from-black via-gray-900 to-gray-800"
    >
      <h2 className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
        Create a Community
      </h2>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 font-semibold text-lg text-gray-100 tracking-wide"
        >
          Community Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-600 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          required
          placeholder="Enter a unique community name"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-semibold text-lg text-gray-100 tracking-wide"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-600 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          rows={3}
          placeholder="Describe your community"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:to-gray-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 border border-white/10 tracking-wide"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Community"}
      </button>
      {authError && (
        <p className="text-center text-red-400 font-medium mt-2">{authError}</p>
      )}
      {isError && (
        <p className="text-center text-red-400 font-medium mt-2">
          Error creating community.
        </p>
      )}
    </form>
  );
};
