import { jsPDF } from 'jspdf'

/**
 * PDF generation utilities for the resume builder
 */

/**
 * Adds resume content to a PDF document with multi-page support
 * @param {Object} pdf - jsPDF instance
 * @param {Object} data - Resume data object
 */
export const addContentToPdf = (pdf, data) => {
  const { personalInfo, education, experience, skills, projects } = data
  
  // Helper function for safe text
  const safe = (text) => text || ''
  
  // Set margins
  const margin = 20 // mm
  const pageWidth = 210 // A4 width in mm
  const pageHeight = 297 // A4 height in mm
  const contentWidth = pageWidth - (margin * 2)
  const footerHeight = 10 // mm
  
  // Define standard colors to match ResumePreview component
  const colors = {
    white: '#ffffff',
    gray100: '#f3f4f6',
    gray300: '#d1d5db',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    blue500: '#3b82f6',
    blue700: '#1d4ed8'
  }
  
  let yPos = margin
  let currentPage = 1
  
  // Function to check if we need a new page
  const checkPageBreak = (heightNeeded) => {
    const maxY = pageHeight - margin - footerHeight
    
    if (yPos + heightNeeded > maxY) {
      // Add page number to current page
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Page ${currentPage} of ${currentPage + 1}`, pageWidth - margin - 20, pageHeight - margin)
      
      // Add a new page
      pdf.addPage()
      currentPage++
      yPos = margin
      
      return true
    }
    return false
  }
  
  // Add personal info - Header section
  pdf.setFontSize(18)
  pdf.setTextColor(17, 24, 39) // gray-900
  pdf.text(safe(personalInfo.name) || 'Your Name', margin, yPos)
  
  yPos += 8
  pdf.setFontSize(14)
  pdf.setTextColor(55, 65, 81) // gray-700
  pdf.text(safe(personalInfo.title) || 'Professional Title', margin, yPos)
  
  yPos += 10
  
  // Contact info with icons
  pdf.setFontSize(9)
  pdf.setTextColor(75, 85, 99) // gray-600
  
  let contactX = margin
  
  if (personalInfo.email) {
    pdf.text(`✉ ${personalInfo.email}`, contactX, yPos)
    contactX += pdf.getTextWidth(`✉ ${personalInfo.email}`) + 10
  }
  
  if (personalInfo.phone) {
    pdf.text(`📞 ${personalInfo.phone}`, contactX, yPos)
    contactX += pdf.getTextWidth(`📞 ${personalInfo.phone}`) + 10
  }
  
  if (personalInfo.location) {
    pdf.text(`📍 ${personalInfo.location}`, contactX, yPos)
  }
  
  // Summary
  if (personalInfo.summary) {
    yPos += 15
    checkPageBreak(20)
    
    // Section heading
    pdf.setFontSize(12)
    pdf.setTextColor(17, 24, 39) // gray-900
    pdf.text('Summary', margin, yPos)
    
    // Section underline
    yPos += 2
    pdf.setDrawColor(209, 213, 219) // gray-300
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    
    yPos += 6
    pdf.setFontSize(10)
    pdf.setTextColor(55, 65, 81) // gray-700
    
    // Split text to fit within margins
    const summaryLines = pdf.splitTextToSize(safe(personalInfo.summary), contentWidth)
    
    // Check if we need a page break for the summary
    checkPageBreak(summaryLines.length * 5 + 5)
    
    pdf.text(summaryLines, margin, yPos)
    yPos += (summaryLines.length * 5) + 5
  }
  
  // Experience
  if (experience.length > 0) {
    checkPageBreak(20)
    
    // Section heading
    pdf.setFontSize(12)
    pdf.setTextColor(17, 24, 39) // gray-900
    pdf.text('Experience', margin, yPos)
    
    // Section underline
    yPos += 2
    pdf.setDrawColor(209, 213, 219) // gray-300
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    
    yPos += 6
    
    experience.forEach(exp => {
      // Estimate height needed for this experience entry
      let entryHeight = 20 // Basic height for title, company, date
      if (exp.location) entryHeight += 5
      
      // Estimate description height
      if (exp.description) {
        const descLines = safe(exp.description).split('\n')
        entryHeight += descLines.length * 7
      }
      
      // Check if we need a page break
      checkPageBreak(entryHeight)
      
      // Job title
      pdf.setFontSize(11)
      pdf.setTextColor(17, 24, 39) // gray-900
      pdf.text(safe(exp.title), margin, yPos)
      
      // Date - right aligned
      const date = `${safe(exp.startDate)} - ${exp.endDate || 'Present'}`
      const dateWidth = pdf.getTextWidth(date)
      pdf.setFontSize(9)
      pdf.setTextColor(75, 85, 99) // gray-600
      pdf.text(date, pageWidth - margin - dateWidth, yPos)
      
      // Company
      yPos += 5
      pdf.setFontSize(10)
      pdf.setTextColor(55, 65, 81) // gray-700
      pdf.text(safe(exp.company), margin, yPos)
      
      // Location
      if (exp.location) {
        yPos += 5
        pdf.setFontSize(9)
        pdf.text(safe(exp.location), margin, yPos)
      }
      
      yPos += 7
      
      // Description as bullet points
      if (exp.description) {
        const descLines = safe(exp.description).split('\n')
        
        descLines.forEach(line => {
          if (line.trim()) {
            const bulletText = `• ${line.trim()}`
            const wrappedText = pdf.splitTextToSize(bulletText, contentWidth - 5)
            
            // Check if we need a page break for this bullet point
            if (checkPageBreak(wrappedText.length * 5 + 2)) {
              // If we added a new page, we need to reset some styles
              pdf.setFontSize(10)
              pdf.setTextColor(55, 65, 81) // gray-700
            }
            
            pdf.text(wrappedText, margin + 5, yPos)
            yPos += (wrappedText.length * 5) + 2
          }
        })
      }
      
      yPos += 8
    })
  }
  
  // Education
  if (education.length > 0) {
    checkPageBreak(20)
    
    // Section heading
    pdf.setFontSize(12)
    pdf.setTextColor(17, 24, 39) // gray-900
    pdf.text('Education', margin, yPos)
    
    // Section underline
    yPos += 2
    pdf.setDrawColor(209, 213, 219) // gray-300
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    
    yPos += 6
    
    education.forEach(edu => {
      // Estimate height needed for this education entry
      let entryHeight = 20 // Basic height for degree, school, date
      if (edu.location) entryHeight += 5
      if (edu.description) {
        const descLines = pdf.splitTextToSize(safe(edu.description), contentWidth)
        entryHeight += descLines.length * 5 + 2
      }
      
      // Check if we need a page break
      checkPageBreak(entryHeight)
      
      // Degree
      pdf.setFontSize(11)
      pdf.setTextColor(17, 24, 39) // gray-900
      pdf.text(safe(edu.degree), margin, yPos)
      
      // Date - right aligned
      const date = `${safe(edu.startDate)} - ${edu.endDate || 'Present'}`
      const dateWidth = pdf.getTextWidth(date)
      pdf.setFontSize(9)
      pdf.setTextColor(75, 85, 99) // gray-600
      pdf.text(date, pageWidth - margin - dateWidth, yPos)
      
      // School
      yPos += 5
      pdf.setFontSize(10)
      pdf.setTextColor(55, 65, 81) // gray-700
      pdf.text(safe(edu.school), margin, yPos)
      
      // Location
      if (edu.location) {
        yPos += 5
        pdf.setFontSize(9)
        pdf.text(safe(edu.location), margin, yPos)
      }
      
      yPos += 7
      
      // Description
      if (edu.description) {
        pdf.setFontSize(10)
        pdf.setTextColor(55, 65, 81) // gray-700
        const descText = pdf.splitTextToSize(safe(edu.description), contentWidth)
        
        // Check if we need a page break for the description
        if (checkPageBreak(descText.length * 5 + 2)) {
          // If we added a new page, we need to reset some styles
          pdf.setFontSize(10)
          pdf.setTextColor(55, 65, 81) // gray-700
        }
        
        pdf.text(descText, margin, yPos)
        yPos += (descText.length * 5) + 2
      }
      
      yPos += 8
    })
  }
  
  // Skills
  if (skills.length > 0) {
    checkPageBreak(20)
    
    // Section heading
    pdf.setFontSize(12)
    pdf.setTextColor(17, 24, 39) // gray-900
    pdf.text('Skills', margin, yPos)
    
    // Section underline
    yPos += 2
    pdf.setDrawColor(209, 213, 219) // gray-300
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    
    yPos += 8
    
    // Skills as pill-shaped tags
    const skillsPerRow = 3
    const skillWidth = (contentWidth - (skillsPerRow - 1) * 5) / skillsPerRow
    let currentX = margin
    let rowHeight = 0
    
    skills.forEach((skill, index) => {
      const skillName = safe(skill.name)
      const skillTextWidth = pdf.getTextWidth(skillName) + 10 // Add padding
      
      // If this skill would overflow the row, move to the next row
      if (currentX + skillTextWidth > pageWidth - margin) {
        currentX = margin
        yPos += rowHeight + 5
        rowHeight = 0
      }
      
      // Check if we need a page break
      if (checkPageBreak(10)) {
        currentX = margin
        rowHeight = 0
      }
      
      // Draw skill pill
      pdf.setFillColor(243, 244, 246) // gray-100
      pdf.setDrawColor(243, 244, 246) // gray-100
      pdf.roundedRect(currentX, yPos - 4, skillTextWidth, 8, 4, 4, 'F')
      
      // Draw skill text
      pdf.setFontSize(9)
      pdf.setTextColor(31, 41, 55) // gray-800
      pdf.text(skillName, currentX + 5, yPos)
      
      // Update position for next skill
      currentX += skillTextWidth + 5
      rowHeight = Math.max(rowHeight, 10)
    })
    
    yPos += rowHeight + 10
  }
  
  // Projects
  if (projects.length > 0) {
    checkPageBreak(20)
    
    // Section heading
    pdf.setFontSize(12)
    pdf.setTextColor(17, 24, 39) // gray-900
    pdf.text('Projects', margin, yPos)
    
    // Section underline
    yPos += 2
    pdf.setDrawColor(209, 213, 219) // gray-300
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    
    yPos += 6
    
    projects.forEach(project => {
      // Estimate height needed for this project entry
      let entryHeight = 15 // Basic height for name and date
      if (project.url) entryHeight += 5
      if (project.description) {
        const descLines = pdf.splitTextToSize(safe(project.description), contentWidth)
        entryHeight += descLines.length * 5 + 2
      }
      
      // Check if we need a page break
      checkPageBreak(entryHeight)
      
      // Project name
      pdf.setFontSize(11)
      pdf.setTextColor(17, 24, 39) // gray-900
      pdf.text(safe(project.name), margin, yPos)
      
      // Date - right aligned
      if (project.date) {
        const date = safe(project.date)
        const dateWidth = pdf.getTextWidth(date)
        pdf.setFontSize(9)
        pdf.setTextColor(75, 85, 99) // gray-600
        pdf.text(date, pageWidth - margin - dateWidth, yPos)
      }
      
      yPos += 5
      
      // URL
      if (project.url) {
        pdf.setFontSize(9)
        pdf.setTextColor(29, 78, 216) // blue-700
        pdf.text(safe(project.url), margin, yPos)
        yPos += 5
      }
      
      // Description
      if (project.description) {
        pdf.setFontSize(10)
        pdf.setTextColor(55, 65, 81) // gray-700
        const descText = pdf.splitTextToSize(safe(project.description), contentWidth)
        
        // Check if we need a page break for the description
        if (checkPageBreak(descText.length * 5 + 2)) {
          // If we added a new page, we need to reset some styles
          pdf.setFontSize(10)
          pdf.setTextColor(55, 65, 81) // gray-700
        }
        
        pdf.text(descText, margin, yPos)
        yPos += (descText.length * 5) + 2
      }
      
      yPos += 8
    })
  }
  
  // Add page number to the last page
  pdf.setFontSize(8)
  pdf.setTextColor(100, 100, 100)
  pdf.text(`Page ${currentPage} of ${currentPage}`, pageWidth - margin - 20, pageHeight - margin)
}

/**
 * Creates and downloads a PDF resume
 * @param {Object} resumeData - Resume data object
 * @returns {Promise<void>}
 */
export const generateResumePdf = async (resumeData) => {
  try {
    // Create a PDF using jsPDF
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
    
    return true
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
} 