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

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#1a1333] via-[#221a3a] to-[#2d1e4d] py-12 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-2xl shadow-2xl p-8 space-y-7"
      >
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          Create a New Post
        </h2>
        <div>
          <label htmlFor="title" className="block mb-2 font-semibold text-gray-200">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-purple-700/30 bg-[#181b20] p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter your post title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-2 font-semibold text-gray-200">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-purple-700/30 bg-[#181b20] p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            rows={6}
            placeholder="Write your post content here..."
            required
          />
        </div>
        <div>
          <label htmlFor="community" className="block mb-2 font-semibold text-gray-200">
            Select Community
          </label>
          <select
            id="community"
            onChange={handleCommunityChange}
            className="w-full border border-purple-700/30 bg-[#181b20] p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
          <label htmlFor="image" className="block mb-2 font-semibold text-gray-200">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white hover:file:from-purple-600 hover:file:to-pink-600"
          />
          {selectedFile && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-400">Selected:</span>
              <span className="text-sm text-purple-300">{selectedFile.name}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
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
        {isError && (
          <p className="text-red-500 text-center font-semibold mt-2">
            Error creating post.
          </p>
        )}
      </form>
    </div>
  );
};