import { useState } from 'react'

const EducationForm = ({ education, onChange }) => {
  const [editIndex, setEditIndex] = useState(-1)
  const [currentEducation, setCurrentEducation] = useState({
    school: '',
    degree: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentEducation(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddEducation = () => {
    if (editIndex >= 0) {
      // Update existing education
      const updatedEducation = [...education]
      updatedEducation[editIndex] = currentEducation
      onChange(updatedEducation)
      setEditIndex(-1)
    } else {
      // Add new education
      onChange([...education, currentEducation])
    }
    
    // Reset form
    setCurrentEducation({
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setCurrentEducation(education[index])
  }

  const handleDelete = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index)
    onChange(updatedEducation)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Education</h2>
      
      {/* Education List */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Your Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-700">{edu.school}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || 'Present'}
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
      
      {/* Education Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          {editIndex >= 0 ? 'Edit Education' : 'Add Education'}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                School/University
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={currentEducation.school}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Harvard University"
              />
            </div>
            
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={currentEducation.degree}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bachelor of Science in Computer Science"
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
              value={currentEducation.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cambridge, MA"
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
                value={currentEducation.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sep 2018"
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date (or expected)
              </label>
              <input
                type="text"
                id="endDate"
                name="endDate"
                value={currentEducation.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="May 2022 (or 'Present')"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={currentEducation.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Relevant coursework, achievements, etc."
            />
          </div>
          
          <div className="flex justify-end">
            {editIndex >= 0 && (
              <button
                type="button"
                onClick={() => {
                  setEditIndex(-1)
                  setCurrentEducation({
                    school: '',
                    degree: '',
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
              onClick={handleAddEducation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editIndex >= 0 ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationForm 