import React from "react";
import { useSelector } from "react-redux";
import Copyrigth from "../../components/Copyrigth";
import NewPost from "../../components/Post/NewPost";
import Thread from "../../components/Thread/Thread";

function Home() {
  const userData = useSelector((state) => state.userReducer);

  return (
    <>
      <div className="home-container">
        <div className="main-container">
          <div className="home-new-post">
            {userData._id ? <NewPost userData={userData} /> : null}
          </div>
          <Thread />
        </div>
      </div>
      <Copyrigth />
    </>
  );
}

export default Home;
