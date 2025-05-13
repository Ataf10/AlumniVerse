import React, { useState, useEffect } from "react";

import { Search, Plus, Podcast as Broadcast } from "lucide-react";

const ChannelList = ({
  channels,
  selectedChannelId,
  onChannelSelect,
  onAddChannel,
  searchTerm,
  onSearchChange,
}) => {
  const [filteredChannels, setFilteredChannels] = useState(channels);

  useEffect(() => {
    if (searchTerm) {
      setFilteredChannels(
        channels.filter((channel) =>
          channel.companyName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredChannels(channels);
    }
  }, [channels, searchTerm]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Broadcast className="mr-2 text-blue-600" size={22} />
          Channels
        </h2>
        <button
          onClick={onAddChannel}
          className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Add channel"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search channels..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="overflow-y-auto flex-1 -mx-3 px-3">
        {filteredChannels.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            {searchTerm
              ? "No channels match your search"
              : "No channels available"}
          </div>
        ) : (
          filteredChannels.map((channel) => (
            <div
              key={channel._id}
              onClick={() => onChannelSelect(channel._id)}
              className={`
                cursor-pointer p-3 rounded-lg mb-2 transition-all
                hover:bg-blue-50 
                ${
                  selectedChannelId === channel._id
                    ? "bg-blue-100 border-l-4 border-blue-600"
                    : "border-l-4 border-transparent"
                }
              `}
            >
              <p className="font-semibold text-gray-800">
                {channel.companyName}
              </p>
              {channel.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {channel.description}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelList;
