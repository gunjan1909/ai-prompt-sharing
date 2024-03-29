import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//backend api post to get all posts/prompts, used/called in Feed Component of home/main page

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(`Failed ${err.messgae}`, { status: 500 });
  }
};
