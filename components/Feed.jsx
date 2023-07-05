"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

//List of all the prompts display every promptcard
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

//Feed componenet used in home page to display all the prompts along with seach bar
const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState(""); //text in inupt field
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]); //array of results on search

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      //console.log(data)
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  //The handleSearchChange function in the Feed component is responsible for managing the search functionality.
  //It updates the search text state based on user input, clears any existing search timeout, and sets a new timeout to delay the search execution.
  const handleSearchChange = (e) => {
    //It first clears any existing timeout by calling clearTimeout(searchTimeout). This is done to reset the debounce effect and ensure that the search function is not called too frequently while the user is still typing.
    clearTimeout(searchTimeout);
    //It then updates the searchText state with the new value entered in the search input by calling setSearchText(e.target.value). This ensures that the search text is synchronized with the value entered by the user.
    setSearchText(e.target.value);

    // debounce method
    //After updating the searchText state, it sets a new timeout using setTimeout. This creates a delay of 500 milliseconds before executing the search function.
    setSearchTimeout(
      setTimeout(() => {
        //Inside the timeout function, it calls the filterPrompts function with the updated search text (e.target.value) to filter the prompts based on the search criteria. The filtered results are stored in the searchResult variable.
        const searchResult = filterPrompts(e.target.value);
        //Finally, it calls setSearchedResults(searchResult) to update the searchedResults state with the filtered results obtained from the search.
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

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
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
