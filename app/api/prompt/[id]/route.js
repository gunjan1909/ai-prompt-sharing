import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//BACKEND API FOR GET, UPDATE/PATCH AND DELETE ANY SPECIFIC PROMPT/POST

// GET a specific prompt
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response(`Failed ${err.messgae}`, { status: 500 });
  }
};

// PATCH/ update a specific prompt
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    //update the fields in db and save it to database
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response(`Failed ${err.message}`, { status: 500 });
  }
};

//DELETE
export const DELETE = async (request, { params }) => {
  /*try {
    await connectToDB();
    const prompt = await Prompt.findByIdAndDelete(params.id);
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response(`Failed ${err.message}`, { status: 500 });
  }*/
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
