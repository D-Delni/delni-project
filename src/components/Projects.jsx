import React from 'react'


const Projects = () => {
  const projects = [
    { id: 1, title: "Project 1", description: "Description of project 1." },
    { id: 2, title: "Project 2", description: "Description of project 2." },
    { id: 3, title: "Project 3", description: "Description of project 3." },
  ];
  return (
    <div  id="projects" className="py-10 bg-gray-100 text-center w-full h-screen absolute '">
      <h2 className="sm:text-5xl text-4xl font-bold text-gray-800">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects
