import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post.actions";
import { isEmpty } from "../../utils/Empty";
import Card from "../Post/Card";
import "../../style/Thread.css";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  //Will recover the data from the "store"
  const posts = useSelector((state) => state.postReducer);

  const loadMore = () => {
    if (
      //Corresponds to the total scrollable screen size + 1
      window.innerHeight + document.documentElement.scrollTop + 1 >
      // Corresponds to the total scrollable screen size
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5); //Add 5 to the num value each time this function is started.
    }
    /*Creation of "scroll" event that will allow us to scroll to infinity
     thanks in particular to the removeEventListener function that will stop 
     listening to the event and will be restarted thanks to the dependencies array  */
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, count, dispatch]);

  return (
    <div className="thread-container">
      <div>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </div>
    </div>
  );
};

export default Thread;
