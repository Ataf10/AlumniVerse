import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({ title, color, count }) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h3 className={`text-2xl font-bold ${color}`}>{title}</h3>
      {count !== undefined && (
        <motion.div
          className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {count} {count === 1 ? "user" : "users"}
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeader;
