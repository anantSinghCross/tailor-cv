import { useState } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import EducationForm from './forms/EducationForm'
import ExperienceForm from './forms/ExperienceForm'
import SkillsForm from './forms/SkillsForm'
import ProjectsForm from './forms/ProjectsForm'

const ResumeForm = ({ resumeData, onPersonalInfoChange, onDataChange }) => {
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-3 font-medium text-sm focus:outline-none whitespace-nowrap
              ${activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'personal' && (
          <PersonalInfoForm 
            personalInfo={resumeData.personalInfo} 
            onChange={onPersonalInfoChange} 
          />
        )}
        
        {activeTab === 'education' && (
          <EducationForm 
            education={resumeData.education} 
            onChange={(data) => onDataChange('education', data)} 
          />
        )}
        
        {activeTab === 'experience' && (
          <ExperienceForm 
            experience={resumeData.experience} 
            onChange={(data) => onDataChange('experience', data)} 
          />
        )}
        
        {activeTab === 'skills' && (
          <SkillsForm 
            skills={resumeData.skills} 
            onChange={(data) => onDataChange('skills', data)} 
          />
        )}
        
        {activeTab === 'projects' && (
          <ProjectsForm 
            projects={resumeData.projects} 
            onChange={(data) => onDataChange('projects', data)} 
          />
        )}
      </div>
    </div>
  )
}

export default ResumeForm 