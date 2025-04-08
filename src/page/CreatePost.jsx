import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", prompt: "", photo: "" });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("https://image-generation-backend-three.vercel.app/api/v1/dalle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        if (data.photo) {
          setForm({ ...form, photo: data.photo });
        } else {
          alert("Failed to generate image.");
        }
      } catch (err) {
        alert("Error while generating image.");
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("https://image-generation-backend-three.vercel.app/api/v1/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        await response.json();
        alert("Shared successfully!");
        navigate("/");
      } catch (err) {
        alert("Failed to share.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image before sharing.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-10"
    >
      <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-900 dark:text-white">
        Create with AI
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-10">
        Generate an AI image from a prompt and share it with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white/30 dark:bg-white/10 dark:border-gray-700 dark:shadow-none backdrop-blur-md border border-gray-200 dark:border rounded-3xl shadow-xl p-8 md:p-10 space-y-8"
      >
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block font-medium text-gray-800 dark:text-gray-200 mb-1">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Alex Morgan"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3 text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Prompt Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="prompt" className="block font-medium text-gray-800 dark:text-gray-200">
              Prompt
            </label>
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline"
            >
              Surprise Me
            </button>
          </div>
          <textarea
            name="prompt"
            placeholder="e.g. A futuristic city floating in the clouds"
            value={form.prompt}
            onChange={handleChange}
            rows={3}
            required
            className="w-full rounded-xl border px-4 py-3 text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 transition resize-none"
          />
        </div>

        {/* Image Preview */}
        <div className="relative rounded-2xl overflow-hidden border bg-gray-100 dark:bg-gray-800 h-72 flex items-center justify-center">
          {form.photo ? (
            <motion.img
              key={form.photo}
              src={form.photo}
              alt="Generated"
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => setIsModalOpen(true)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-2/3 h-2/3 object-contain opacity-40"
            />
          )}

          {generatingImg && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader />
            </motion.div>
          )}
        </div>

        {/* Generate Button */}
        <motion.button
          type="button"
          onClick={generateImage}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition"
        >
          {generatingImg ? "Generating..." : "Generate Image"}
        </motion.button>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
        >
          {loading ? "Sharing..." : "Share with the Community"}
        </motion.button>
      </form>

      {/* Modal for full image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg max-w-3xl w-full mx-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                className="absolute top-3 right-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full text-gray-700 dark:text-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <img
                src={form.photo}
                alt="Full Preview"
                className="w-full max-h-[80vh] object-contain rounded-md"
              />
              <div className="text-center mt-4">
                <a
                  href={form.photo}
                  download="ai_image.png"
                  className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Download Image
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CreatePost;
