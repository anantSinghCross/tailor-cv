import { useState } from 'react'

const SkillsForm = ({ skills, onChange }) => {
  const [currentSkill, setCurrentSkill] = useState('')

  const handleAddSkill = () => {
    if (currentSkill.trim() === '') return
    
    // Check if skill already exists
    if (skills.some(skill => skill.name.toLowerCase() === currentSkill.toLowerCase())) {
      alert('This skill already exists in your list.')
      return
    }
    
    onChange([...skills, { name: currentSkill.trim() }])
    setCurrentSkill('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index)
    onChange(updatedSkills)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex mb-4">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a skill (e.g., JavaScript, Project Management)"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Add skills that are relevant to the position you're applying for. Press Enter or click Add after each skill.
        </p>
        
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill.name}
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills added yet.</p>
        )}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-md font-medium text-blue-800 mb-2">Skill Tips</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Include a mix of technical and soft skills</li>
          <li>Prioritize skills mentioned in the job description</li>
          <li>Be specific (e.g., "React.js" instead of just "JavaScript")</li>
          <li>Include relevant tools and software you're proficient with</li>
        </ul>
      </div>
    </div>
  )
}

export default SkillsForm 