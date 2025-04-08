import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      <AnimatePresence>
        {data.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card {...post} />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  return (
    <motion.h2
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-5 font-bold text-center text-indigo-500 dark:text-indigo-400 text-xl uppercase"
    >
      {title}
    </motion.h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://image-generation-backend-three.vercel.app/api/v1/post");
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.prompt.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white"
        >
          ✨ Community Showcase
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-2 text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto"
        >
          Explore a world of creativity through AI-generated masterpieces powered by DALL·E-3.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-10 max-w-2xl mx-auto"
      >
        <FormField
          labelName=""
          type="text"
          name="text"
          placeholder="Search posts by name or prompt..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </motion.div>

      <div className="mt-12">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center font-medium text-gray-500 dark:text-gray-400 text-lg mb-6"
              >
                Showing results for{" "}
                <span className="text-black dark:text-white font-semibold">{searchText}</span>
              </motion.h2>
            )}

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results Found" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
