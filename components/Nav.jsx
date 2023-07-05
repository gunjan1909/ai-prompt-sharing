"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

//the navbar, signin singout implementd..nextauth using google authentication

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);
  const [toggleDropodown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      //this is the provider handler object in route.js in /api/auth/
      //console.log(response);
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* LOGO */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          width={30}
          height={30}
          src="/assets/images/logo.svg"
          alt="MyLogo"
          className="object-contain"
        />
        <p className="logo_text">PromptShare</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {/* IF USER IS LOGGED IN, SIGNOUT AND BUTTON TO GO TO CREATE-PROMPT PAGE IS DISPLAYED */}
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* So, in summary, the code dynamically renders sign-in buttons for */}
            {/* each available authentication provider, allowing users to choose and */}
            {/* sign in with their preferred provider.Here we have only 1 provider(google auth) */}

            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropodown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
