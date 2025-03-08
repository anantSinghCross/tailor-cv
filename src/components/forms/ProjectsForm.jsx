import { useState } from 'react'

const ProjectsForm = ({ projects, onChange }) => {
  const [editIndex, setEditIndex] = useState(-1)
  const [currentProject, setCurrentProject] = useState({
    name: '',
    url: '',
    date: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentProject(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddProject = () => {
    if (editIndex >= 0) {
      // Update existing project
      const updatedProjects = [...projects]
      updatedProjects[editIndex] = currentProject
      onChange(updatedProjects)
      setEditIndex(-1)
    } else {
      // Add new project
      onChange([...projects, currentProject])
    }
    
    // Reset form
    setCurrentProject({
      name: '',
      url: '',
      date: '',
      description: ''
    })
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setCurrentProject(projects[index])
  }

  const handleDelete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    onChange(updatedProjects)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
      
      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Your Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {project.url}
                    </a>
                  )}
                  {project.date && (
                    <p className="text-sm text-gray-600 mt-1">{project.date}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Project Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          {editIndex >= 0 ? 'Edit Project' : 'Add Project'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentProject.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E-commerce Website"
            />
          </div>
          
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Project URL (optional)
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={currentProject.url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/yourusername/project"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date (optional)
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={currentProject.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="June 2022 (or a date range)"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={currentProject.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E-commerce Website description..."
            />
          </div>
          
          <div className="flex justify-end">
            {editIndex >= 0 && (
              <button
                type="button"
                onClick={() => {
                  setEditIndex(-1)
                  setCurrentProject({
                    name: '',
                    url: '',
                    date: '',
                    description: ''
                  })
                }}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleAddProject}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editIndex >= 0 ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsForm 