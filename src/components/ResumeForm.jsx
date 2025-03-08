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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <div className="flex border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-3 font-medium text-sm  -none whitespace-nowrap
              ${activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 min-h-[500px]">
        <div className={activeTab === 'personal' ? 'block' : 'hidden'}>
          <PersonalInfoForm 
            personalInfo={resumeData.personalInfo} 
            onChange={onPersonalInfoChange} 
          />
        </div>
        
        <div className={activeTab === 'education' ? 'block' : 'hidden'}>
          <EducationForm 
            education={resumeData.education} 
            onChange={(data) => onDataChange('education', data)} 
          />
        </div>
        
        <div className={activeTab === 'experience' ? 'block' : 'hidden'}>
          <ExperienceForm 
            experience={resumeData.experience} 
            onChange={(data) => onDataChange('experience', data)} 
          />
        </div>
        
        <div className={activeTab === 'skills' ? 'block' : 'hidden'}>
          <SkillsForm 
            skills={resumeData.skills} 
            onChange={(data) => onDataChange('skills', data)} 
          />
        </div>
        
        <div className={activeTab === 'projects' ? 'block' : 'hidden'}>
          <ProjectsForm 
            projects={resumeData.projects} 
            onChange={(data) => onDataChange('projects', data)} 
          />
        </div>
      </div>
    </div>
  )
}

export default ResumeForm 