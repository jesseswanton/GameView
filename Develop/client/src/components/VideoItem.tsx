import React from 'react';

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

interface VideoItemProps {
  video: Video;
}

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const { videoId } = video.id;
  const { title, description, thumbnails } = video.snippet;

  return (
    <div className="video">
      <img src={thumbnails.default.url} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
        Watch
      </a>
    </div>
  );
};

export default VideoItem;
