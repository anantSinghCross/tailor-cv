import { useState } from 'react'

const ExperienceForm = ({ experience, onChange }) => {
  const [editIndex, setEditIndex] = useState(-1)
  const [draggedItem, setDraggedItem] = useState(null)
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

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
    // Create a ghost image that looks nicer
    const ghostElement = e.target.cloneNode(true)
    ghostElement.style.opacity = '0.8'
    document.body.appendChild(ghostElement)
    e.dataTransfer.setDragImage(ghostElement, 20, 20)
    setTimeout(() => {
      document.body.removeChild(ghostElement)
    }, 0)
  }
  
  const handleDragOver = (e, index) => {
    e.preventDefault()
    
    // If it's the same item, do nothing
    if (index === draggedItem) {
      return
    }
    
    // Add visual indication
    e.currentTarget.style.borderTop = draggedItem < index 
      ? '2px solid #60a5fa' 
      : 'none'
    e.currentTarget.style.borderBottom = draggedItem > index 
      ? '2px solid #60a5fa' 
      : 'none'
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    e.currentTarget.style.borderTop = 'none'
    e.currentTarget.style.borderBottom = 'none'
  }
  
  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    e.currentTarget.style.borderTop = 'none'
    e.currentTarget.style.borderBottom = 'none'
    
    // If it's the same item, do nothing
    if (dropIndex === draggedItem) {
      return
    }
    
    // Create a copy of the experience array
    const items = [...experience]
    
    // Remove the dragged item
    const draggedItemValue = items[draggedItem]
    items.splice(draggedItem, 1)
    
    // Insert it at the drop position
    items.splice(dropIndex, 0, draggedItemValue)
    
    // Update the state
    onChange(items)
    setDraggedItem(null)
  }
  
  const handleDragEnd = (e) => {
    e.preventDefault()
    // Reset borders on all items
    document.querySelectorAll('.experience-item').forEach(item => {
      item.style.borderTop = 'none'
      item.style.borderBottom = 'none'
    })
    setDraggedItem(null)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
      
      {/* Experience List */}
      {experience.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-700">Your Experience</h3>
            <p className="text-sm text-gray-500">Drag and drop to reorder</p>
          </div>
          
          {experience.map((exp, index) => (
            <div 
              key={index} 
              className={`bg-gray-50 p-4 rounded-lg experience-item cursor-move ${
                draggedItem === index ? 'opacity-50 border-2 border-blue-300' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex justify-between items-start">
                <div className="flex">
                  <div className="text-gray-400 mr-2 flex items-center">
                    <span className="cursor-move">☰</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{exp.title}</h4>
                    <p className="text-gray-700">{exp.company}</p>
                    <p className="text-sm text-gray-600">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                  </div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
              placeholder="• Developed and maintained web applications using React.js
• Collaborated with cross-functional teams to implement new features
• Improved application performance by 30%"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use a new line for each accomplishment or responsibility. Each new line will appear as a separate bullet point on your resume.
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700  -none focus:ring-2 focus:ring-blue-500"
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