import { useState, useEffect } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import EducationForm from './forms/EducationForm'
import ExperienceForm from './forms/ExperienceForm'
import SkillsForm from './forms/SkillsForm'
import ProjectsForm from './forms/ProjectsForm'
import CertificationsForm from './forms/CertificationsForm'
import CustomSectionForm from './forms/CustomSectionForm'
import ParagraphSectionForm from './forms/ParagraphSectionForm'

const ResumeForm = ({ 
  resumeData, 
  onPersonalInfoChange, 
  onDataChange, 
  onCustomSectionChange, 
  onRemoveCustomSection, 
  onAddCustomSection,
  activeTab,
  setActiveTab
}) => {
  // Remove local activeTab state
  const [customSectionTabs, setCustomSectionTabs] = useState([])
  
  // Update custom section tabs when resumeData changes
  useEffect(() => {
    if (resumeData.customSections) {
      const tabs = Object.keys(resumeData.customSections).map(id => ({
        id,
        label: resumeData.customSections[id].title || 'Custom Section'
      }))
      setCustomSectionTabs(tabs)
    }
  }, [resumeData.customSections])
  
  // Remove the event listener useEffect

  // Combine standard tabs with custom section tabs
  const standardTabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' }
  ]
  
  const allTabs = [...standardTabs, ...customSectionTabs]
  
  // Handle section removal with active tab management
  const handleSectionRemove = (sectionId) => {
    // If the section being removed is the active tab,
    // switch to another tab before removing it
    if (activeTab === sectionId) {
      // Find a suitable tab to switch to (any other tab that's not being removed)
      const nextTab = allTabs.find(tab => tab.id !== sectionId)?.id || 'personal';
      setActiveTab(nextTab);
    }
    
    // Call the original remove function from props
    onRemoveCustomSection(sectionId);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <div className="flex justify-between">
        <div className='flex overflow-x-auto'>
          {allTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-3 font-medium text-sm focus-none whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Add Custom Section button */}
        <button
          className="px-4 py-3 rounded-md m-2 font-medium text-sm text-blue-500 hover:bg-blue-50 whitespace-nowrap ml-auto flex items-center"
          onClick={onAddCustomSection}
        >
          <span className="mr-1">+</span> Add Section
        </button>
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
        
        <div className={activeTab === 'certifications' ? 'block' : 'hidden'}>
          <CertificationsForm 
            certifications={resumeData.certifications} 
            onChange={(data) => onDataChange('certifications', data)} 
          />
        </div>
        
        {/* Custom section tabs */}
        {customSectionTabs.map(tab => {
          // Skip if the custom section data doesn't exist anymore (e.g., during removal)
          if (!resumeData.customSections[tab.id]) {
            return null;
          }
          
          return (
            <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
              {resumeData.customSections[tab.id].type === 'paragraph' ? (
                <ParagraphSectionForm 
                  sectionId={tab.id}
                  sectionData={resumeData.customSections[tab.id]}
                  onChange={onCustomSectionChange}
                  onRemove={handleSectionRemove}
                />
              ) : (
                <CustomSectionForm 
                  sectionId={tab.id}
                  sectionData={resumeData.customSections[tab.id]}
                  onChange={onCustomSectionChange}
                  onRemove={handleSectionRemove}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ResumeForm 