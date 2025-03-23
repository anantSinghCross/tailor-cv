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

// Local storage key
const STORAGE_KEY = 'tailor_cv_resume_data'

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
  
  const [activeTab, setActiveTab] = useState('edit')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const resumeRef = useRef(null)

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData))
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }, [resumeData])

  const handlePrint = async () => {
    if (!resumeRef.current) return
    
    setIsGeneratingPdf(true)
    
    try {
      // Use the imported function to generate PDF
      await generateResumePdf(resumeData)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF: ' + error.message)
    } finally {
      setIsGeneratingPdf(false)
    }
  }
  
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-100 text-blue-500 py-6 w-full">
        <div className="container mx-auto px-5 max-w-full">
          <h1 className="text-3xl font-bold">Tailor CV</h1>
          <p className="text-blue-500">Create a professional resume in minutes</p>
        </div>
      </header>
      
      <main className="flex-grow w-full">
        <div className="container mx-auto px-4 py-8 max-w-full">
          {/* Tab Navigation */}
          <div className="flex gap-2 p-1 justify-evenly bg-gray-200 shadow-inner rounded-lg mb-6 w-full">
            <button
              className={`flex-1 font-medium text-sm focus-none ${
                activeTab === 'edit'
                  ? 'shadow-md rounded-md bg-white'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab('edit')}
            >
              Edit Resume
            </button>
            <button
              className={`flex-1 font-medium text-sm focus-none ${
                activeTab === 'preview'
                  ? 'shadow-md rounded-md bg-white'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>
          
          {/* Tab Content Container - Fixed Height to Prevent Layout Shifts */}
          <div className="min-h-[calc(100vh-200px)]">
            {/* Edit Tab */}
            {activeTab === 'edit' && (
              <div className="w-full">
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={handleClearData}
                    className="font-bold py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white"
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
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={handlePrint}
                    disabled={isGeneratingPdf}
                    className={`font-bold py-2 px-4 rounded-md ${
                      isGeneratingPdf 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                  </button>
                </div>
                
                <ResumePreview ref={resumeRef} resumeData={resumeData} />

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
