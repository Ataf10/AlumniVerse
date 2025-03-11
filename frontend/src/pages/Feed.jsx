import PostCard from "../components/PostCard";

const postData = {
  profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
  username: "Ataf Ali",
  timestamp: "2 hours ago",
  caption: "Enjoying the beautiful sunset!",
  image:
    "https://images.pexels.com/photos/1212600/pexels-photo-1212600.jpeg?cs=srgb&dl=pexels-lazybird-1212600.jpg&fm=jpg",
};

const Feed = () => {
  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 p-4">
        <PostCard post={postData} />
      </div>
      <div className="flex flex-col items-center bg-gray-100 p-4 ">
        <PostCard post={postData} />
      </div>
      <div className="flex flex-col items-center bg-gray-100 p-4">
        <PostCard post={postData} />
      </div>
    </>
  );
};
export default Feed;
