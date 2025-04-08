import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Preview Card */}
      <motion.div
        layoutId={`card-${_id}`}
        className="relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden group cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        {/* AI Badge */}
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
          AI Generated
        </div>

        {/* Image */}
        <img className="w-full h-64 object-cover" src={photo} alt={prompt} />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex-col justify-end p-4 hidden group-hover:flex transition-all duration-300">
          <p className="text-sm text-white mb-4 overflow-hidden max-h-[60px] line-clamp-3">{prompt}</p>

          <div className="flex justify-between items-center">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                {name[0]}
              </div>
              <p className="text-white text-sm font-medium">{name}</p>
            </div>

            {/* Download button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(_id, photo);
              }}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
            >
              <img src={download} alt="download" className="w-4 h-4 object-contain" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Expanded Fullscreen Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              layoutId={`card-${_id}`}
              className="relative bg-white rounded-xl overflow-hidden shadow-lg max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <img className="w-full h-[500px] object-contain bg-black" src={photo} alt={prompt} />

              <div className="p-6 flex justify-between items-center flex-wrap bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                    {name[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{name}</h2>
                    <p className="text-gray-600 text-sm max-w-xl">{prompt}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => downloadImage(_id, photo)}
                  className="mt-4 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Card;
