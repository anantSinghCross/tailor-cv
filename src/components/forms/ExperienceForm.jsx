import { useState } from 'react'

const ExperienceForm = ({ experience, onChange }) => {
  const [editIndex, setEditIndex] = useState(-1)
  const [currentExperience, setCurrentExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentExperience(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddExperience = () => {
    if (editIndex >= 0) {
      // Update existing experience
      const updatedExperience = [...experience]
      updatedExperience[editIndex] = currentExperience
      onChange(updatedExperience)
      setEditIndex(-1)
    } else {
      // Add new experience
      onChange([...experience, currentExperience])
    }
    
    // Reset form
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setCurrentExperience(experience[index])
  }

  const handleDelete = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index)
    onChange(updatedExperience)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
      
      {/* Experience List */}
      {experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Your Experience</h3>
          {experience.map((exp, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.title}</h4>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
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
      
      {/* Experience Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          {editIndex >= 0 ? 'Edit Experience' : 'Add Experience'}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={currentExperience.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Software Engineer"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={currentExperience.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Google"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={currentExperience.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mountain View, CA"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={currentExperience.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jan 2020"
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                id="endDate"
                name="endDate"
                value={currentExperience.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Present (leave empty if current)"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={currentExperience.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="• Developed and maintained web applications using React.js
• Collaborated with cross-functional teams to implement new features
• Improved application performance by 30%"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use bullet points (•) for each accomplishment or responsibility. Each bullet point will appear as a separate item on your resume.
            </p>
          </div>
          
          <div className="flex justify-end">
            {editIndex >= 0 && (
              <button
                type="button"
                onClick={() => {
                  setEditIndex(-1)
                  setCurrentExperience({
                    title: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
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
              onClick={handleAddExperience}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editIndex >= 0 ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceForm 