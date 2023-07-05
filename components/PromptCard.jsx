"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

//component for the single card with prompts, showing username, email, prompt(can be copied), tag and delete and edit button according to the conditions

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  /* const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };*/
  const handleCopy = () => {
    const promptText = post.prompt;
    navigator.clipboard
      .writeText(promptText)
      .then(() => {
        setCopied(promptText);
        //console.log("Prompt copied to clipboard");
        alert("Prompt copied to cliboard");
      })
      .catch((error) => {
        //console.error("Failed to copy prompt:", error);
        alert("Failed to copy prompt:", error);
      });
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleProfileClick = () => {
    //console.log(post);

    //my profile page
    if (post.creator._id === session?.user.id) return router.push("/profile");

    // or other's profile page
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator?.email}
            </p>
          </div>
        </div>
        {/* copy button div */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "copied" : "copy"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {/* checking if currently logged in user is creator of post and if they are on the /profile page, then show the edit and delete button */}
      {session?.user.id === post.creator?._id && pathName === "/profile" && (
        <div className="mt-4 flex justify-end gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
