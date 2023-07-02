"use client";
// page showed on /profile url, shows the profile component along with 'MY' prompts with edit delete function
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // console.log("running useeffect");
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      // console.log("fetching again", data);
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [
    //added by myself for refetching the data once page reload or revisit
    // because it was not showing when page reloads
    session,
  ]);

  const handleEdit = () => {};

  const handleDelete = async () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
