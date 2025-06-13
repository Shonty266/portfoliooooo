import React, { memo } from 'react';

const ProjectCard = memo(({ item, index, loading, onImageLoad }) => {
  return (
    <div
      className="project-card group relative overflow-hidden rounded-xl 
        transition-all duration-500 hover:shadow-2xl" // Removed opacity-0
      style={{ backgroundColor: "var(--project-bg)" }}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full lg:h-[400px] h-[300px] object-cover transition-transform duration-500 group-hover:scale-105 ${
            loading ? "hidden" : ""
          }`}
          onLoad={onImageLoad}
        />
        <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-100 group-hover:bg-black/60 transition-all duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-[45%] group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl font-bold text-white/60">0{item.id}</span>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
            <p className="text-white/70">{item.projectType}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {(item.skills || []).map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm font-medium bg-white/20 hover:bg-white/30 transition-colors duration-300 text-white rounded-full backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="text-white/90 mb-4 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {item.description}
        </p>

        <div className="flex justify-end gap-2">
          <div className="tooltip-container group/tooltip flex items-center gap-2 relative">
            <span className="tooltip-text bg-white/20 backdrop-blur-sm text-white/90 text-sm z-10 absolute">
              {item.location}
            </span>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:border-white/60 rounded-lg transition-all duration-300 group/up flex items-center"
            >
              <svg
                className="w-6 h-6 text-white group-hover/up:-translate-y-1 group-hover/up:rotate-[45deg] transition-all duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;