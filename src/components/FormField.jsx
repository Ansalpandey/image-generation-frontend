import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const FormField = ({ labelName, type, name, placeholder, value, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full"
    >
      <motion.div
        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
          isFocused ? "border-[#6469ff] shadow-lg shadow-[#6469ff]/20" : "border-gray-300"
        } bg-white`}
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? "0 0 12px rgba(100, 105, 255, 0.2)"
            : "0 0 4px rgba(0,0,0,0.05)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          animate={{
            rotate: isFocused ? [0, 15, -15, 0] : 0,
            scale: isFocused ? 1.2 : 1,
            color: isFocused ? "#6469ff" : "#9ca3af",
          }}
          transition={{ duration: 0.4 }}
        >
          <FiSearch className="text-xl" />
        </motion.div>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
        />
      </motion.div>
    </motion.div>
  );
};

export default FormField;
