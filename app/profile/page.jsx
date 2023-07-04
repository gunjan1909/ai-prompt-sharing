"use client";

// page showed on /profile url, shows the profile component along with 'MY' prompts with edit delete function

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
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

  //sends the user to update prompt page ie localhost:3000/update-prompt?id=
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  //delete the post/prompt the data, and also update the posts array in the frontend as well
  const handleDelete = async (post) => {
    //confirm prompt built-in the browser
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page. Share your prompts with others to utilise the power of AI using your prompts."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
