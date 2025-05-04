import React from 'react';

interface InstagramFeedProps {
  username: string;
  title: string;
}

export function InstagramFeed({ username, title }: InstagramFeedProps) {
  return (
    <div className="bg-secondary-light p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-serif font-bold text-primary mb-4">{title}</h3>
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-secondary/50">
        <iframe
          title={`${title} Instagram Feed`}
          className="w-full h-full"
          src={`https://www.instagram.com/${username}/embed`}
          frameBorder="0"
          scrolling="no"
          allowTransparency={true}
        ></iframe>
      </div>
    </div>
  );
}