import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

const Main = () => {
  const postsRef = collection(db, "posts");

  const [postsList, setPostsList] = useState(null);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <h1>Home Page</h1>
      <br />
      <br />
      <div>
        {postsList?.map((post, key) => {
          return (
            <Post
              key={key}
              title={post.title}
              description={post.description}
              username={post.username}
              id={post.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Main;
