import { MessageCircle, ThumbsUp } from "lucide-react";

const PopularBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Mastering React Hooks for Beginners",
      authorName: "Ariana Patel",
      likes: 124,
      comments: 12,
    },
    {
      id: 2,
      title: "Top 10 JavaScript Tips You Should Know",
      authorName: "Michael Brown",
      likes: 230,
      comments: 56,
    },
    {
      id: 3,
      title: "Why TypeScript Makes Your Code Safer",
      authorName: "Sofia Rahman",
      likes: 98,
      comments: 52,
    },

  ];

  return (
    <div className="bg-white p-5 w-92 border rounded mt-4">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className=" font-bold mb-2">{blog.title}</span>
            </div>
            <span className=" text-gray-600">Publish by {blog.authorName}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16}></MessageCircle>
              <span className="text-grfay-500 mr-5 ml-1">{blog.likes}</span>

              <ThumbsUp size={16}></ThumbsUp>
              <span className="text-gray-500 mr-2 ml-2">{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
