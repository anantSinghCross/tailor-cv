import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
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
  
  const [activeTab, setActiveTab] = useState('edit')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const resumeRef = useRef()

  const handlePrint = async () => {
    if (!resumeRef.current) return
    
    setIsGeneratingPdf(true)
    
    try {
      // Create a deep clone of the resume element
      const resumeElement = resumeRef.current
      const clone = document.createElement('div')
      clone.innerHTML = resumeElement.outerHTML
      const clonedResume = clone.firstChild
      
      // Apply inline styles to replace Tailwind classes
      const applyInlineStyles = (element) => {
        // Replace text color classes
        if (element.classList.contains('text-blue-500')) {
          element.style.color = '#3b82f6'
          element.classList.remove('text-blue-500')
        }
        if (element.classList.contains('text-blue-600')) {
          element.style.color = '#2563eb'
          element.classList.remove('text-blue-600')
        }
        if (element.classList.contains('text-gray-900')) {
          element.style.color = '#111827'
          element.classList.remove('text-gray-900')
        }
        if (element.classList.contains('text-gray-800')) {
          element.style.color = '#1f2937'
          element.classList.remove('text-gray-800')
        }
        if (element.classList.contains('text-gray-700')) {
          element.style.color = '#374151'
          element.classList.remove('text-gray-700')
        }
        if (element.classList.contains('text-gray-600')) {
          element.style.color = '#4b5563'
          element.classList.remove('text-gray-600')
        }
        if (element.classList.contains('text-gray-500')) {
          element.style.color = '#6b7280'
          element.classList.remove('text-gray-500')
        }
        if (element.classList.contains('text-gray-400')) {
          element.style.color = '#9ca3af'
          element.classList.remove('text-gray-400')
        }
        if (element.classList.contains('text-white')) {
          element.style.color = '#ffffff'
          element.classList.remove('text-white')
        }
        
        // Replace background color classes
        if (element.classList.contains('bg-blue-500')) {
          element.style.backgroundColor = '#3b82f6'
          element.classList.remove('bg-blue-500')
        }
        if (element.classList.contains('bg-blue-600')) {
          element.style.backgroundColor = '#2563eb'
          element.classList.remove('bg-blue-600')
        }
        if (element.classList.contains('bg-gray-100')) {
          element.style.backgroundColor = '#f3f4f6'
          element.classList.remove('bg-gray-100')
        }
        if (element.classList.contains('bg-gray-50')) {
          element.style.backgroundColor = '#f9fafb'
          element.classList.remove('bg-gray-50')
        }
        if (element.classList.contains('bg-white')) {
          element.style.backgroundColor = '#ffffff'
          element.classList.remove('bg-white')
        }
        
        // Replace border color classes
        if (element.classList.contains('border-blue-500')) {
          element.style.borderColor = '#3b82f6'
          element.classList.remove('border-blue-500')
        }
        if (element.classList.contains('border-gray-300')) {
          element.style.borderColor = '#d1d5db'
          element.classList.remove('border-gray-300')
        }
        if (element.classList.contains('border-gray-200')) {
          element.style.borderColor = '#e5e7eb'
          element.classList.remove('border-gray-200')
        }
        
        // Process all child elements recursively
        Array.from(element.children).forEach(child => {
          applyInlineStyles(child)
        })
      }
      
      // Apply inline styles to the cloned resume
      applyInlineStyles(clonedResume)
      
      // Set explicit styles for the cloned resume
      clonedResume.style.backgroundColor = '#ffffff'
      clonedResume.style.color = '#111827'
      clonedResume.style.fontFamily = 'system-ui, sans-serif'
      
      // Temporarily append the clone to the document
      document.body.appendChild(clonedResume)
      clonedResume.style.position = 'absolute'
      clonedResume.style.left = '-9999px'
      clonedResume.style.width = '816px' // A4 width in pixels at 96 DPI
      
      // Generate canvas from the clone
      const canvas = await html2canvas(clonedResume, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
        onclone: (document, element) => {
          // Additional cleanup in the cloned document
          element.querySelectorAll('*').forEach(el => {
            // Remove any remaining Tailwind classes that might cause issues
            if (el.className && typeof el.className === 'string') {
              el.className = el.className
                .split(' ')
                .filter(cls => !cls.includes('text-') && !cls.includes('bg-') && !cls.includes('border-'))
                .join(' ')
            }
          })
        }
      })
      
      // Remove the clone from the document
      document.body.removeChild(clonedResume)
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      })
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save('resume.pdf')
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-100 text-blue-500 py-6 w-full rounded-xl">
        <div className="container mx-auto px-4 max-w-full">
          <h1 className="text-3xl font-bold">Tailor CV</h1>
          <p className="text-blue-500">Create a professional resume in minutes</p>
        </div>
      </header>
      
      <main className="flex-grow w-full">
        <div className="container mx-auto px-4 py-8 max-w-full">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-3 px-6 font-medium text-sm  -none ${
                activeTab === 'edit'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab('edit')}
            >
              Edit Resume
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm  -none ${
                activeTab === 'preview'
                  ? 'border-b-2 border-blue-500 text-blue-500'
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
            <div className={`w-full transition-opacity duration-300 ${activeTab === 'edit' ? 'opacity-100' : 'hidden opacity-0'}`}>
              <ResumeForm 
                resumeData={resumeData}
                onPersonalInfoChange={handlePersonalInfoChange}
                onDataChange={handleDataChange}
              />
            </div>
            
            {/* Preview Tab */}
            <div className={`w-full transition-opacity duration-300 ${activeTab === 'preview' ? 'opacity-100' : 'hidden opacity-0'}`}>
              <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                <button 
                  onClick={handlePrint}
                  disabled={isGeneratingPdf}
                  className={`w-full font-bold py-2 px-4 rounded ${
                    isGeneratingPdf 
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto" style={{ maxWidth: '816px' }}>
                <ResumePreview ref={resumeRef} resumeData={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
