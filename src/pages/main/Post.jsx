import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import { useState } from "react";

export const Post = (props) => {
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState([]);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", props.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);

    setLikes(
      data.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId,
        postId: doc.data().postId,
      }))
    );
  };

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    try {
      await addDoc(likesRef, {
        userId: user?.uid,
        postId: props.id,
      });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", props.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev?.filter((like) => like.id !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  return (
    <>
      <div>
        <div className="title">
          <h1>{props.title}</h1>
        </div>
        <div className="body">
          <p>{props.description}</p>
        </div>
        <div className="footer">
          <h4>@{props.username}</h4>
          <button onClick={hasUserLiked ? removeLike : addLike}>
            {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
          </button>
          {likes && <p>Likes: {likes?.length}</p>}
        </div>
      </div>
    </>
  );
};

// import {
//   collection,
//   query,
//   getDocs,
//   where,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { addDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../config/firebase";
// import { useEffect } from "react";
// import { useState } from "react";

// export const Post = (props) => {
//   const [user] = useAuthState(auth);

//   const [likes, setLikes] = useState(null);

//   const likesRef = collection(db, "likes");

//   const likesDoc = query(likesRef, where("postId", "==", props.id));

//   const getLikes = async () => {
//     const data = await getDocs(likesDoc);

//     setLikes(data.docs.map((doc) => ({ userId: user?.uid, postId: props.id })));
//   };

//   useEffect(() => {
//     getLikes();
//   }, []);

//   const addLike = async () => {
//     try {
//       await addDoc(likesRef, {
//         userId: user?.uid,
//         postId: props.id,
//       });
//       if (user) {
//         setLikes((prev) =>
//           prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
//         );
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const removeLike = async () => {
//     try {
//       const likeToDeleteQuery = query(
//         likesRef,
//         where("postId", "==", props.id),
//         where("userId", "==", user?.uid)
//       );

//       const likeToDeleteData = await getDocs(likeToDeleteQuery);
//       const likeId = likeToDeleteData.docs[0].id;
//       const likeToDelete = doc(db, "likes", likeId);

//       await deleteDoc(likeToDelete);
//       if (user) {
//         setLikes((prev) => prev?.filter((like) => like.id !== likeId));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

//   return (
//     <>
//       <div>
//         <div className="title">
//           <h1>{props.title}</h1>
//         </div>
//         <div className="body">
//           <p>{props.description}</p>
//         </div>
//         <div className="footer">
//           <h4>@{props.username}</h4>
//           <button onClick={hasUserLiked ? removeLike : addLike}>
//             {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
//           </button>
//           {likes && <p>Likes: {likes?.length}</p>}
//         </div>
//       </div>
//     </>
//   );
// };
