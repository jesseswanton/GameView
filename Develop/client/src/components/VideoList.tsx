import React from "react";
import { Link } from "react-router-dom";

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
    };
  };
}

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id.videoId} className="video">
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          <h3>
            <Link to={`/video/${video.id.videoId}`}>{video.snippet.title}</Link>
          </h3>
          <p>{video.snippet.description}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
