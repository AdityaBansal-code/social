import { Link } from "react-router";
import type { Post } from "./PostList";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  return (
    <div className="relative group transition-transform duration-200 hover:scale-[1.025]">
      {/* Glowing border effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-500 to-black blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
      
      <Link
        to={`/post/${post.id}`}
        className="block relative z-10"
        tabIndex={0}
        aria-label={`View post: ${post.title}`}
      >
        <div className="w-80 h-76 bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-[20px] text-white flex flex-col p-5 overflow-hidden transition-all duration-300 group-hover:bg-black shadow-neumorphism">
          {/* Header: Avatar and Title */}
          <div className="flex items-center space-x-2">
            {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="User Avatar"
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-tl from-gray-700 to-gray-900" />
            )}
            <div className="flex flex-col flex-1">
              <div className="text-[20px] leading-[22px] font-semibold mt-2">
                {post.title}
              </div>
            </div>
          </div>

          {/* Image Banner */}
          <div className="mt-2 flex-1">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full rounded-[20px] object-cover max-h-[150px] mx-auto"
            />
          </div>

          {/* Like and Comment Counts */}
          <div className="flex justify-around items-center mt-4">
            <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg bg-gray-800 text-white">
              ❤️ <span className="ml-2">{post.like_count ?? 0}</span>
            </span>
            <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg bg-gray-800 text-white">
              💬 <span className="ml-2">{post.comment_count ?? 0}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
