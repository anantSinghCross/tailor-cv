import { useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
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
      // Create a PDF directly using jsPDF without html2canvas
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })
      
      // Set font
      pdf.setFont('helvetica', 'normal')
      
      // Add content to PDF
      addContentToPdf(pdf, resumeData)
      
      // Save the PDF
      pdf.save('resume.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF: ' + error.message)
    } finally {
      setIsGeneratingPdf(false)
    }
  }
  
  // Function to add content directly to PDF
  const addContentToPdf = (pdf, data) => {
    const { personalInfo, education, experience, skills, projects } = data
    
    // Helper function for safe text
    const safe = (text) => text || ''
    
    // Set margins
    const margin = 20 // mm
    const pageWidth = 210 // A4 width in mm
    const contentWidth = pageWidth - (margin * 2)
    
    let yPos = margin
    
    // Add personal info
    pdf.setFontSize(24)
    pdf.setTextColor(0, 0, 0)
    pdf.text(safe(personalInfo.name) || 'Your Name', margin, yPos)
    
    yPos += 8
    pdf.setFontSize(16)
    pdf.setTextColor(80, 80, 80)
    pdf.text(safe(personalInfo.title) || 'Professional Title', margin, yPos)
    
    yPos += 10
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    
    // Contact info
    let contactText = ''
    if (personalInfo.email) contactText += `Email: ${personalInfo.email}   `
    if (personalInfo.phone) contactText += `Phone: ${personalInfo.phone}   `
    if (personalInfo.location) contactText += `Location: ${personalInfo.location}`
    
    pdf.text(contactText, margin, yPos)
    
    // Summary
    if (personalInfo.summary) {
      yPos += 15
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Summary', margin, yPos)
      
      yPos += 2
      pdf.line(margin, yPos, pageWidth - margin, yPos) // Add a line
      
      yPos += 6
      pdf.setFontSize(10)
      pdf.setTextColor(80, 80, 80)
      
      // Split text to fit within margins
      const summaryLines = pdf.splitTextToSize(safe(personalInfo.summary), contentWidth)
      pdf.text(summaryLines, margin, yPos)
      
      yPos += (summaryLines.length * 5) + 5
    }
    
    // Experience
    if (experience.length > 0) {
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Experience', margin, yPos)
      
      yPos += 2
      pdf.line(margin, yPos, pageWidth - margin, yPos) // Add a line
      
      yPos += 6
      
      experience.forEach(exp => {
        pdf.setFontSize(12)
        pdf.setTextColor(0, 0, 0)
        pdf.text(safe(exp.title), margin, yPos)
        
        // Company and date on the same line
        pdf.setFontSize(10)
        pdf.setTextColor(80, 80, 80)
        const company = safe(exp.company)
        const date = `${safe(exp.startDate)} - ${exp.endDate || 'Present'}`
        
        pdf.text(company, margin, yPos + 5)
        
        // Right align the date
        const dateWidth = pdf.getTextWidth(date)
        pdf.text(date, pageWidth - margin - dateWidth, yPos + 5)
        
        // Location
        if (exp.location) {
          pdf.text(safe(exp.location), margin, yPos + 10)
        }
        
        yPos += 15
        
        // Description
        if (exp.description) {
          const descLines = safe(exp.description).split('\n')
          
          descLines.forEach(line => {
            if (line.trim()) {
              const bulletText = `• ${line.trim()}`
              const wrappedText = pdf.splitTextToSize(bulletText, contentWidth - 5)
              
              pdf.text(wrappedText, margin + 5, yPos)
              yPos += (wrappedText.length * 5) + 2
            }
          })
        }
        
        yPos += 5
      })
    }
    
    // Education
    if (education.length > 0) {
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Education', margin, yPos)
      
      yPos += 2
      pdf.line(margin, yPos, pageWidth - margin, yPos) // Add a line
      
      yPos += 6
      
      education.forEach(edu => {
        pdf.setFontSize(12)
        pdf.setTextColor(0, 0, 0)
        pdf.text(safe(edu.degree), margin, yPos)
        
        // School and date on the same line
        pdf.setFontSize(10)
        pdf.setTextColor(80, 80, 80)
        const school = safe(edu.school)
        const date = `${safe(edu.startDate)} - ${edu.endDate || 'Present'}`
        
        pdf.text(school, margin, yPos + 5)
        
        // Right align the date
        const dateWidth = pdf.getTextWidth(date)
        pdf.text(date, pageWidth - margin - dateWidth, yPos + 5)
        
        // Location
        if (edu.location) {
          pdf.text(safe(edu.location), margin, yPos + 10)
        }
        
        yPos += 15
        
        // Description
        if (edu.description) {
          const descText = pdf.splitTextToSize(safe(edu.description), contentWidth)
          pdf.text(descText, margin, yPos)
          yPos += (descText.length * 5) + 2
        }
        
        yPos += 5
      })
    }
    
    // Skills
    if (skills.length > 0) {
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Skills', margin, yPos)
      
      yPos += 2
      pdf.line(margin, yPos, pageWidth - margin, yPos) // Add a line
      
      yPos += 6
      
      // Create a comma-separated list of skills
      const skillNames = skills.map(skill => safe(skill.name)).join(', ')
      const skillLines = pdf.splitTextToSize(skillNames, contentWidth)
      
      pdf.setFontSize(10)
      pdf.setTextColor(80, 80, 80)
      pdf.text(skillLines, margin, yPos)
      
      yPos += (skillLines.length * 5) + 10
    }
    
    // Projects
    if (projects.length > 0) {
      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Projects', margin, yPos)
      
      yPos += 2
      pdf.line(margin, yPos, pageWidth - margin, yPos) // Add a line
      
      yPos += 6
      
      projects.forEach(project => {
        pdf.setFontSize(12)
        pdf.setTextColor(0, 0, 0)
        
        // Project name and date on the same line
        const name = safe(project.name)
        pdf.text(name, margin, yPos)
        
        if (project.date) {
          const date = safe(project.date)
          const dateWidth = pdf.getTextWidth(date)
          
          pdf.setFontSize(10)
          pdf.setTextColor(80, 80, 80)
          pdf.text(date, pageWidth - margin - dateWidth, yPos)
        }
        
        yPos += 5
        
        // URL
        if (project.url) {
          pdf.setFontSize(10)
          pdf.setTextColor(0, 0, 255) // Blue for URL
          pdf.text(safe(project.url), margin, yPos)
          yPos += 5
        }
        
        // Description
        if (project.description) {
          pdf.setFontSize(10)
          pdf.setTextColor(80, 80, 80)
          const descText = pdf.splitTextToSize(safe(project.description), contentWidth)
          pdf.text(descText, margin, yPos)
          yPos += (descText.length * 5) + 2
        }
        
        yPos += 5
      })
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
              className={`py-3 px-6 font-medium text-sm focus-none ${
                activeTab === 'edit'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab('edit')}
            >
              Edit Resume
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm focus-none ${
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
