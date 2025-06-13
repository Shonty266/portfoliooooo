import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { data } from "../../Data/Data.jsx";
import "./project.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

// Lazy load ProjectCard component
const ProjectCard = lazy(() => import('./ProjectCard'));

// Skeleton loader component
const ProjectSkeleton = () => (
  <div className="animate-pulse bg-[var(--project-bg)] rounded-xl h-[400px]">
    <div className="h-[300px] bg-gray-300/20 rounded-t-xl"></div>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-300/20 rounded-full"></div>
        <div>
          <div className="h-6 w-32 bg-gray-300/20 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300/20 rounded"></div>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {[1,2,3].map(i => (
          <div key={i} className="h-6 w-16 bg-gray-300/20 rounded-full"></div>
        ))}
      </div>
    </div>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeType, setActiveType] = useState("");
  const [projects, setProjects] = useState(data);
  const [loading, setLoading] = useState(Array(data.length).fill(true));
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Memoize filtered projects
  const filteredProjects = useMemo(() => 
    projects.slice(0, visibleProjects),
    [projects, visibleProjects]
  );

  // Memoize callbacks
  const filterType = useCallback((category) => {
    setActiveType(category);
    setProjects(
      category === "" ? data : data.filter((item) => item.category === category)
    );
    setVisibleProjects(4);
  }, []);

  const handleImageLoad = useCallback((index) => {
    setLoading(prev => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  }, []);

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    
    setTimeout(() => {
      setVisibleProjects(prev => {
        const newValue = prev + 4;
        setIsLoadingMore(false);
        return newValue;
      });
    }, 1000);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects",
        start: "top 85%",
        end: "top 20%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    });

    // Only animate title and hr
    tl.from(".project-title", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(".hr", {
      width: 0,
      duration: 1,
      ease: "power3.inOut"
    }, "-=0.7");

    // Remove the animateNewCards function since we don't need it anymore
    window.animateNewCards = () => {}; // Empty function
  }, []); // Remove visibleProjects dependency since we're not using it

  return (
    <div className="flex justify-center pt-20 cursor-default lg:px-10">
      <div className="projects py-10 lg:w-full w-full px-4" id="project">
        {/* Title Section */}
        <div className="flex flex-col justify-center items-center mb-12">
          <h1 className="project-title text-5xl py-2 font-bold tracking-[2px]">Projects</h1>
          <hr className="hr lg:w-[30%] w-[80%] h-1 rounded-full mt-1 bg-[#a0b1ba]" />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-start justify-start gap-4 w-full pl-4 mb-8">
          {/* <button
            onClick={() => {
              setActiveType("");
              setProjects(data);
            }}
            className={`filter-button relative px-4 py-1.5 rounded-lg font-semibold transition-all duration-300 ease-in-out ${
              activeType === "" 
                ? "bg-[var(--skills-bg)] text-[var(--text-color)] shadow-md scale-105 border-2 border-[#a0b1ba]"
                : "bg-[var(--project-bg)] text-[var(--text-color)] hover:bg-[var(--skills-bg)] hover:scale-102"
            }`}
          >
            All Projects
          </button> */}
{/*           
          <button
            onClick={() => filterType("frontend")}
            className={`filter-button relative px-4 py-1.5 rounded-lg font-semibold transition-all duration-300 ease-in-out ${
              activeType === "frontend"
                ? "bg-[var(--skills-bg)] text-[var(--text-color)] shadow-md scale-105 border-2 border-[#a0b1ba]"
                : "bg-[var(--project-bg)] text-[var(--text-color)] hover:bg-[var(--skills-bg)] hover:scale-102"
            }`}
          >
            Frontend
          </button> */}
          
          {/* <button
            onClick={() => filterType("uiux")}
            className={`filter-button relative px-4 py-1.5 rounded-lg font-semibold transition-all duration-300 ease-in-out ${
              activeType === "uiux"
                ? "bg-[var(--skills-bg)] text-[var(--text-color)] shadow-md scale-105 border-2 border-[#a0b1ba]"
                : "bg-[var(--project-bg)] text-[var(--text-color)] hover:bg-[var(--skills-bg)] hover:scale-102"
            }`}
          >
            UI/UX
          </button> */}
        </div>

        {/* Projects Grid */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="project-item grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
            <Suspense fallback={
              Array(visibleProjects).fill(0).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            }>
              {filteredProjects.map((item, index) => (
                <ProjectCard
                  key={item.id}
                  item={item}
                  index={index}
                  loading={loading[index]}
                  onImageLoad={() => handleImageLoad(index)}
                />
              ))}
            </Suspense>
          </div>

          {/* Load More Button */}
          {visibleProjects < projects.length && (
            <div className="flex flex-col items-center gap-2 mt-20 mb-10">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className={`px-6 py-2 bg-[var(--project-bg)] text-[var(--text-color)] rounded-lg font-semibold 
                  transition-all duration-300 hover:scale-105 hover:shadow-md border-2 border-[#a0b1ba]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  flex items-center gap-2`}
              >
                {isLoadingMore ? (
                  <>
                    <span className="inline-block animate-spin w-4 h-4 border-2 border-white/20 border-t-white/100 rounded-full"></span>
                    Loading...
                  </>
                ) : (
                  'Show More'
                )}
              </button>
              <span className="text-sm text-[var(--text-color)]">
                Showing {visibleProjects} of {projects.length} projects
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
