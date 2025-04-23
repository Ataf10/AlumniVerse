import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Shield,
  ShieldCheck,
  Trash2,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { fadeIn, staggerContainer } from "../utils/animations";
import { path } from "../path";
const ActionButton = ({ onClick, icon, text, color, delay }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 ${color} text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.2 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span className="font-medium whitespace-nowrap">{text}</span>
  </motion.button>
);

const UserCard = ({ user, isPending, index, onAction }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="bg-white/30 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.08, duration: 0.5 },
      }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.4)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-md"
            initial={{ scale: 0.8 }}
            animate={{
              scale: [0.8, 1.1, 1],
              opacity: [0, 0.5, 0.3],
            }}
            transition={{ duration: 1, delay: index * 0.1 }}
          />
          <div className="relative">
            <img
              src={
                user.profilePic ||
                "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
              }
              alt={user.name}
              className="relative z-10 w-14 h-14 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300"
            />
            <AnimatePresence>
              {user.isAdmin && (
                <motion.div
                  className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-1.5 rounded-full z-20 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Shield size={14} className="drop-shadow-md" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="space-y-1">
          <motion.p
            className="font-bold text-lg text-gray-800"
            animate={{
              color: isHovered ? "rgb(79, 70, 229)" : "rgb(31, 41, 55)",
            }}
            transition={{ duration: 0.2 }}
          >
            {user.name}
          </motion.p>
          <p className="text-gray-600 text-sm">{user.email}</p>
          {user.isAdmin && (
            <motion.div
              className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ShieldCheck size={12} />
              Administrator
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
        <AnimatePresence mode="wait">
          {isPending ? (
            <>
              <ActionButton
                onClick={() => onAction("approve", user._id)}
                color="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
                icon={<UserPlus size={16} className="stroke-[2.5]" />}
                text="Approve"
                delay={index * 0.05}
              />
              <ActionButton
                onClick={() => onAction("delete", user._id)}
                color="bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600"
                icon={<Trash2 size={16} className="stroke-[2.5]" />}
                text="Delete"
                delay={index * 0.05 + 0.1}
              />
            </>
          ) : (
            <>
              {!user.isAdmin ? (
                <ActionButton
                  onClick={() => onAction("makeAdmin", user._id)}
                  color="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600"
                  icon={<ShieldCheck size={16} className="stroke-[2.5]" />}
                  text="Make Admin"
                  delay={index * 0.05}
                />
              ) : (
                <ActionButton
                  onClick={() => onAction("removeAdmin", user._id)}
                  color="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600"
                  icon={<UserMinus size={16} className="stroke-[2.5]" />}
                  text="Remove Admin"
                  delay={index * 0.05}
                />
              )}
              <ActionButton
                onClick={() => onAction("unapprove", user._id)}
                color="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
                icon={<UserMinus size={16} className="stroke-[2.5]" />}
                text="Unapprove"
                delay={index * 0.05 + 0.1}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

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

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes, adminRes] = await Promise.all([
        fetch(`${path}/api/admin/pending`, {
          method: "GET",
          credentials: "include",
        }),
        fetch(`${path}/api/admin/approved`, {
          method: "GET",
          credentials: "include",
        }),
        fetch(`${path}/api/admin/admins`, {
          method: "GET",
          credentials: "include",
        }),
      ]);

      setPendingUsers(await pendingRes.json());
      setApprovedUsers(await approvedRes.json());
      setAdmins(await adminRes.json());
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, userId) => {
    const urlMap = {
      approve: `${path}/api/admin/approve/${userId}`,
      delete: `${path}/api/admin/delete/${userId}`,
      makeAdmin: `${path}/api/admin/make-admin/${userId}`,
      removeAdmin: `${path}/api/admin/remove-admin/${userId}`,
      unapprove: `${path}/api/admin/unapprove/${userId}`,
    };

    const methodMap = {
      approve: "POST",
      delete: "DELETE",
      makeAdmin: "PUT",
      removeAdmin: "PUT",
      unapprove: "PUT",
    };

    try {
      const res = await fetch(urlMap[action], {
        method: methodMap[action],
        credentials: "include",
      });

      if (res.ok) {
        await fetchUsers();
      }
    } catch (err) {
      console.error("Error performing admin action:", err);
    }
  };

  const renderSection = (
    users,
    title,
    colorClass,
    bgClass,
    isPending,
    delay
  ) => (
    <motion.section
      className={`${bgClass} backdrop-blur-md border rounded-2xl p-6 shadow-lg overflow-y-auto max-h-[80vh] custom-scroll`}
      variants={fadeIn}
      custom={delay}
      initial="hidden"
      animate="visible"
    >
      <SectionHeader title={title} color={colorClass} count={users.length} />
      <AnimatePresence mode="wait">
        {users.length === 0 ? (
          <motion.p
            className="text-gray-500 italic text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No {title.toLowerCase()} found
          </motion.p>
        ) : (
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {users.map((user, index) => (
              <UserCard
                key={user._id}
                user={user}
                isPending={isPending}
                index={index}
                onAction={handleAction}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h2>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              className="flex flex-col items-center justify-center h-[60vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="animate-spin text-indigo-600 w-12 h-12 mb-4" />
              <p className="text-gray-600 animate-pulse">Loading users...</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {renderSection(
                  pendingUsers,
                  "Pending Users",
                  "text-yellow-700",
                  "bg-gradient-to-br from-yellow-100/40 to-white/30 border-yellow-200",
                  true,
                  0
                )}
                {renderSection(
                  approvedUsers,
                  "Approved Users",
                  "text-green-700",
                  "bg-gradient-to-br from-green-100/40 to-white/30 border-green-200",
                  false,
                  0.2
                )}
              </div>
              {renderSection(
                admins,
                "Admins",
                "text-purple-700",
                "bg-gradient-to-br from-purple-100/40 to-white/30 border-purple-200",
                false,
                0.4
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
