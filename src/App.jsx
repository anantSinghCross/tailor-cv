import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import './App.css'

function App() {
  const [resumeData, setResumeData] = useState({
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
  })

  const resumeRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  })

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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Tailor CV</h1>
          <p className="text-blue-100">Create a professional resume in minutes</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <ResumeForm 
              resumeData={resumeData}
              onPersonalInfoChange={handlePersonalInfoChange}
              onDataChange={handleDataChange}
            />
          </div>
          
          <div className="w-full lg:w-1/2 sticky top-8">
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <button 
                onClick={handlePrint}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Download PDF
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ResumePreview ref={resumeRef} resumeData={resumeData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
