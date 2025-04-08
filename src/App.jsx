import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react"; // icon library

import { logo } from "./assets";
import { Home, CreatePost } from "./page";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "spring",
  stiffness: 60,
  damping: 15,
  duration: 0.4,
};

const Header = ({ theme, toggleTheme }) => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full flex justify-between items-center bg-white dark:bg-zinc-900 sm:px-12 px-6 py-4 shadow-md border-b border-gray-200 dark:border-zinc-800 transition-colors"
  >
    <Link to="/" className="flex items-center gap-3 group">
      <motion.img
        src={logo}
        alt="logo"
        className="w-10 h-10 object-contain"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <span className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-wide group-hover:text-indigo-500 transition-colors duration-300">
        Image-Gen
      </span>
    </Link>

    <div className="flex items-center gap-4">
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.9, rotate: 15 }}
        className="text-gray-700 dark:text-gray-100 hover:text-indigo-500 transition"
      >
        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
      </motion.button>

      <motion.div whileHover={{ scale: 1.05 }}>
        <Link
          to="/create-post"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-shadow"
        >
          Create
        </Link>
      </motion.div>
    </div>
  </motion.header>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="h-full"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/create-post"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="h-full"
            >
              <CreatePost />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="sm:p-10 p-6 w-full bg-gradient-to-br from-[#f9fafe] via-[#f4f5ff] to-[#eef1ff] dark:from-zinc-900 dark:via-zinc-950 dark:to-black min-h-[calc(100vh-72px)] transition-colors duration-500">
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
};

export default App;
