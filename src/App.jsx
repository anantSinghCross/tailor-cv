import { useState, useRef, useEffect } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import { generateResumePdf } from './utils/pdfUtils'
import './App.css'

// Default empty resume data
const defaultResumeData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
}

// Default section order
const defaultSectionOrder = [
  { id: 'summary', label: 'Summary', visible: true },
  { id: 'experience', label: 'Experience', visible: true },
  { id: 'education', label: 'Education', visible: true },
  { id: 'skills', label: 'Skills', visible: true },
  { id: 'projects', label: 'Projects', visible: true },
];

// Local storage keys
const STORAGE_KEY = 'tailor_cv_resume_data'
const SECTION_ORDER_KEY = 'tailor_cv_section_order'

function App() {
  // Initialize state with data from localStorage or default values
  const [resumeData, setResumeData] = useState(() => {
    try {
      // Try to get data from localStorage
      const savedData = localStorage.getItem(STORAGE_KEY)
      return savedData ? JSON.parse(savedData) : defaultResumeData
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
      return defaultResumeData
    }
  })
  
  // Initialize section order from localStorage or default
  const [sectionOrder, setSectionOrder] = useState(() => {
    try {
      const savedOrder = localStorage.getItem(SECTION_ORDER_KEY)
      return savedOrder ? JSON.parse(savedOrder) : defaultSectionOrder
    } catch (error) {
      console.error('Error loading section order from localStorage:', error)
      return defaultSectionOrder
    }
  })
  
  const [activeTab, setActiveTab] = useState('edit')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)

  const resumeRef = useRef(null)

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData))
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }, [resumeData])
  
  // Save section order to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SECTION_ORDER_KEY, JSON.stringify(sectionOrder))
    } catch (error) {
      console.error('Error saving section order to localStorage:', error)
    }
  }, [sectionOrder])

  const handlePrint = async () => {
    setIsGeneratingPdf(true);
    try {
      await generateResumePdf(resumeData, sectionOrder);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };
  
  const handleDataChange = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  // Function to clear all data and reset to defaults
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all resume data? This cannot be undone.')) {
      setResumeData(defaultResumeData)
      localStorage.removeItem(STORAGE_KEY)
    }
  }
  
  // Function to reset section order to default
  const resetSectionOrder = () => {
    setSectionOrder(defaultSectionOrder)
  }
  
  // Function to move a section up in the order
  const moveSectionUp = (index) => {
    if (index <= 0) return
    
    const newOrder = [...sectionOrder]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index - 1]
    newOrder[index - 1] = temp
    
    setSectionOrder(newOrder)
  }
  
  // Function to move a section down in the order
  const moveSectionDown = (index) => {
    if (index >= sectionOrder.length - 1) return
    
    const newOrder = [...sectionOrder]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index + 1]
    newOrder[index + 1] = temp
    
    setSectionOrder(newOrder)
  }
  
  // Function to toggle section visibility
  const toggleSectionVisibility = (sectionId) => {
    const newOrder = sectionOrder.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible }
        : section
    )
    
    setSectionOrder(newOrder)
  }
  
  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
    // Set a ghost image that's more visible
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
    const draggedOverItem = sectionOrder[index]
    const draggedItemValue = sectionOrder[draggedItem]
    
    // If the item is dragged over itself, ignore
    if (draggedItemValue === draggedOverItem) {
      return
    }
    
    // Add a visual indication for the drop target
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
    
    // If the dragged item is dropped on itself, ignore
    if (draggedItem === dropIndex) {
      return
    }
    
    // Create a copy of the sections array
    const newSections = [...sectionOrder]
    
    // Remove the dragged item from its original position
    const dragItem = newSections[draggedItem]
    newSections.splice(draggedItem, 1)
    
    // Insert the dragged item at the drop position
    newSections.splice(dropIndex, 0, dragItem)
    
    // Update the state with the new order
    setSectionOrder(newSections)
    setDraggedItem(null)
  }
  
  const handleDragEnd = (e) => {
    e.preventDefault()
    // Reset borders on all items
    const items = document.querySelectorAll('.section-item')
    items.forEach(item => {
      item.style.borderTop = 'none'
      item.style.borderBottom = 'none'
    })
    setDraggedItem(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-6 w-full shadow-lg">
        <div className="container mx-auto px-5 max-w-full flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tailor CV</h1>
              <p className="text-blue-100 text-sm">Create a professional resume in minutes</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow w-full">
        <div className="container mx-auto px-4 py-8 max-w-full">
          {/* Tab Navigation */}
          <div className="tab-navigation flex gap-2 p-1 justify-evenly bg-gray-200 shadow-inner rounded-lg mb-6 w-full">
            <button
              className={`flex-1 font-medium text-sm py-2 rounded transition-all ${
                activeTab === 'edit'
                  ? 'shadow-md rounded-md bg-white text-blue-600 active'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('edit')}
            >
              Edit Content
            </button>
            <button
              className={`flex-1 font-medium text-sm py-2 rounded transition-all ${
                activeTab === 'preview'
                  ? 'shadow-md rounded-md bg-white text-blue-600 active'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`flex-1 font-medium text-sm py-2 rounded transition-all ${
                activeTab === 'layout'
                  ? 'shadow-md rounded-md bg-white text-blue-600 active'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('layout')}
            >
              Rearrange Sections
            </button>
          </div>
          
          {/* Tab Content Container - Fixed Height to Prevent Layout Shifts */}
          <div className="min-h-[calc(100vh-200px)]">
            {/* Edit Tab */}
            {activeTab === 'edit' && (
              <div className="w-full">
                <div className="flex justify-end items-center mb-5">
                  <button 
                    onClick={handleClearData}
                    className="font-bold py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/50"
                  >
                    Clear All Data
                  </button>
                </div>
                
                <ResumeForm 
                  resumeData={resumeData}
                  onPersonalInfoChange={handlePersonalInfoChange}
                  onDataChange={handleDataChange}
                />
              </div>
            )}
            
            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="w-full">
                <div className="flex justify-end mb-5">
                  <button 
                    onClick={handlePrint}
                    disabled={isGeneratingPdf}
                    className={`font-bold py-2 px-4 rounded-md ${
                      isGeneratingPdf 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/50'
                    }`}
                  >
                    {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                  </button>
                </div>
                
                <ResumePreview ref={resumeRef} resumeData={resumeData} sectionOrder={sectionOrder} />

              </div>
            )}
            
            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Rearrange Resume Sections</h2>
                  <button
                    onClick={resetSectionOrder}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm"
                  >
                    Reset to Default Order
                  </button>
                </div>
                <p className="text-gray-600 mb-4">Drag and drop to reorder sections or toggle their visibility</p>
                
                <div className="space-y-2">
                  {sectionOrder.map((section, index) => (
                    <div 
                      key={section.id}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md section-item cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">☰</span>
                        <span className="font-medium text-gray-700">{section.label}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSectionVisibility(section.id)}
                          className={`p-1 rounded-md ${
                            section.visible 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}
                          title={section.visible ? 'Hide section' : 'Show section'}
                        >
                          {section.visible ? 'Visible' : 'Hidden'}
                        </button>
                        
                        <button
                          onClick={() => moveSectionUp(index)}
                          disabled={index === 0}
                          className={`p-1 rounded-md ${
                            index === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                          title="Move up"
                        >
                          ↑
                        </button>
                        
                        <button
                          onClick={() => moveSectionDown(index)}
                          disabled={index === sectionOrder.length - 1}
                          className={`p-1 rounded-md ${
                            index === sectionOrder.length - 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                          title="Move down"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
