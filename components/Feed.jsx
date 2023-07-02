"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

//List of all the prompts display every promptcard
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

//Feed componenet used in home page to display all the prompts along with seach bar
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {};
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      //console.log(data)
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      {/* form to search prompts on basis of user or tags */}
      <form className="w-full relative flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* list of all the prompts */}
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
