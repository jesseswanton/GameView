import React from "react";
import { useParams } from "react-router-dom";

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Video not found.</p>;
  }

  return (
    <div>
      <h1>Video Details</h1>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPage;
