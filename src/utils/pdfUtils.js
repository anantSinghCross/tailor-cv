import React from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '../components/ResumePDF';

/**
 * Creates a PDF document from resume data
 * @param {Object} resumeData - The resume data object
 * @param {Array} sectionOrder - The order and visibility of resume sections
 * @returns {Promise<Blob>} - A promise that resolves to a PDF blob
 */
export const createResumePDF = async (resumeData, sectionOrder) => {
  // Create the PDF document
  const document = React.createElement(ResumePDF, { resumeData, sectionOrder });
  
  // Generate PDF blob
  const blob = await pdf(document).toBlob();
  return blob;
};

/**
 * Generates a resume PDF and triggers a download
 * @param {Object} resumeData - The resume data object
 * @param {Array} sectionOrder - The order and visibility of resume sections
 * @returns {Promise<void>}
 */
export const generateResumePdf = async (resumeData, sectionOrder) => {
  try {
    // Generate PDF blob
    const blob = await createResumePDF(resumeData, sectionOrder);
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    
    // Append link to the body
    document.body.appendChild(link);
    
    // Click the link to trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}; 