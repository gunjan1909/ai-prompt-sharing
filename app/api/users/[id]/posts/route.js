import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//backend api route to get all posts/prompts of particular creator, dynamic(takes parameters), used in /profile page

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(`Failed ${err.messgae}`, { status: 500 });
  }
};
