import Feed from "@components/Feed";

//Main home page, displays the heading and description and feed component
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <span className="orange_gradient text-center">Share & Discover</span>
        <br className="max-md:hidden" />
        AI-Powered Prompt
      </h1>
      <p className="desc text-center">
        This is an open-source AI prompting tool to discover, create and share
        AI prompts that can be used in LLM's(eg: ChatGPT) or Prompt Engineering.
        Get prompts examples if learning Prompt Engineering.
      </p>
      {/* Feed component */}
      <Feed />
    </section>
  );
};

export default Home;
