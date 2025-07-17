import { useState } from "react";
import type { ChangeEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import { useAuthStore } from "../Store/AuthStore";
import { fetchCommunities } from "./CommunityList";
import type { Community } from "./CommunityList";

interface PostInput {
  title: string;
  content: string;
  avatar_url: string | null;
  community_id?: number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });

  if (error) throw new Error(error.message);

  return data;
};

export const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [communityId, setCommunityId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const { user } = useAuthStore();

  const { data: communities } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);

    if (!user) {
      setAuthError("Sign in before creating a post");
      return;
    }
    if (!selectedFile) return;
    mutate(
      {
        post: {
          title,
          content,
          avatar_url: user?.user_metadata.avatar_url || null,
          community_id: communityId,
        },
        imageFile: selectedFile,
      },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };

  const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCommunityId(value ? Number(value) : null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Accent color for text (primary shade for black bg)
  const accentText = "text-orange-400";
  const accentBorder = "border-orange-400";
  const accentBgGradient = "bg-gradient-to-r from-black via-gray-900 to-gray-800";
  const accentInputBorder = "border-gray-700";
  const accentInputFocus = "focus:ring-2 focus:ring-orange-400";
  const accentButtonGradient = "bg-gradient-to-r from-black via-gray-800 to-gray-900";
  const accentButtonHover = "hover:from-gray-900 hover:to-black";
  const accentButtonText = "text-orange-300";
  const accentFile = "file:bg-gradient-to-r file:from-gray-800 file:to-black file:text-orange-300 hover:file:from-black hover:file:to-gray-800";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-2">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl ${accentBgGradient} border ${accentBorder}/30 rounded-2xl shadow-2xl p-8 space-y-7 overflow-y-auto max-h-[80vh] custom-scrollbar`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#fbbf24 #181b20",
        }}
      >
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
              background: #181b20;
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #fbbf24 0%, #f59e42 100%);
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #f59e42 0%, #fbbf24 100%);
            }
          `}
        </style>
        <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-orange-400 via-yellow-300 to-white bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Create a Post
        </h2>
        <div>
          <label htmlFor="title" className={`block mb-2 font-semibold ${accentText}`}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border ${accentInputBorder} bg-black p-3 rounded-lg text-white focus:outline-none ${accentInputFocus} transition`}
            placeholder="Enter your post title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className={`block mb-2 font-semibold ${accentText}`}>
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full border ${accentInputBorder} bg-black p-3 rounded-lg text-white focus:outline-none ${accentInputFocus} transition`}
            rows={6}
            placeholder="Write your post content here..."
            required
          />
        </div>
        <div>
          <label htmlFor="community" className={`block mb-2 font-semibold ${accentText}`}>
            Select Community
          </label>
          <select
            id="community"
            onChange={handleCommunityChange}
            className={`w-full border ${accentInputBorder} bg-black p-3 rounded-lg text-white focus:outline-none ${accentInputFocus} transition`}
            value={communityId ?? ""}
          >
            <option value={""}>-- Choose a Community --</option>
            {communities?.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image" className={`block mb-2 font-semibold ${accentText}`}>
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className={`w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold ${accentFile}`}
          />
          {selectedFile && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-400">Selected:</span>
              <span className="text-sm text-orange-300">{selectedFile.name}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`w-full ${accentButtonGradient} ${accentButtonHover} ${accentButtonText} px-6 py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 border border-orange-400/40`}
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-orange-300" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Creating...
            </span>
          ) : (
            "Create Post"
          )}
        </button>
        {authError && (
          <p className="text-red-400 text-center font-semibold mt-2">
            {authError}
          </p>
        )}
        {isError && (
          <p className="text-red-400 text-center font-semibold mt-2">
            Error creating post.
          </p>
        )}
      </form>
    </div>
  );
};