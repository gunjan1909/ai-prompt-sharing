import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//get all posts
export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(`Failed ${err.messgae}`, { status: 500 });
  }
};
