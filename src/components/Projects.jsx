import LineAnimationVertical from "../assets/animations/LineAnimationVertical";


const Projects = () => {
  const projects = [
    { id: 1, title: "Project 1", description: "Description of project 1.", image: "https://path-to-your-image-1.webp" },
    { id: 2, title: "Project 2", description: "Description of project 2.", image: "https://path-to-your-image-2.webp" },
    { id: 3, title: "Project 3", description: "Description of project 3.", image: "https://path-to-your-image-3.webp" },
  ];

  return (
    <div id="projects" className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center">
      
      <h2 className="sm:text-6xl text-4xl font-bold text-gray-800 mb-8">
        <span className="word" data-word="Choose the path">
          {"TRAJECTORY".split("").map((char, index) => (
            <span
              key={index}
              className="char"
              data-char={char}
              style={{
                "--char-index": index,
                fontVariationSettings: `"wght" 205`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full h-1/2 p-0.5 ">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col items-center justify-center bg-white shadow-md transition-transform duration-300 transform group h-full hover:scale-105 rounded-sm "
          >
            {/* Project Image */}
            <div className="overflow-hidden relative mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 trasnform rotate-y-30"
                loading="lazy"
              />
            </div>

            {/* Project Title and Description */}
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
