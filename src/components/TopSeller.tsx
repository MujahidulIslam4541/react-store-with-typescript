import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSeller = () => {
  const [authors, setAuthor] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=5`);
        const data = await response.json();

        const authorData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthor(authorData);
      } catch (error) {
        console.log("topseller data fetching error", error);
      }
    };
    fetchData();
  }, []);

const handleFollowing = (index: number) => {
  setAuthor((prevAuthors) => 
    prevAuthors.map((author, i) =>
      i === index
        ? { ...author, isFollowing: !author.isFollowing }
        : author
    )
  );
};

  return (
    <div className="bg-white p-5  mt-20 border w-92 rounded">
      <h2 className="text-xl font-bold mb-5">Top sellers</h2>

      <ul>
        {authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <section className="flex justify-center items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-[50px] h-[50px] rounded-full"
              />
              <span className="ml-4">{author.name}</span>
            </section>
            <button
              onClick={() => handleFollowing(index)}
              className={`py-1 px-3 rounded ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "UnFollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSeller;
