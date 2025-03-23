import React from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '../components/ResumePDF';

/**
 * Generates a PDF from the resume data using react-pdf
 * @param {Object} resumeData - The resume data object
 * @returns {Promise<Blob>} - Promise that resolves to the PDF blob
 */
export const createResumePDF = async (resumeData) => {
  // Create the PDF document
  const document = React.createElement(ResumePDF, { resumeData });
  
  // Generate PDF blob
  const blob = await pdf(document).toBlob();
  return blob;
};

/**
 * Creates and downloads a PDF resume
 * @param {Object} resumeData - Resume data object
 * @returns {Promise<void>}
 */
export const generateResumePdf = async (resumeData) => {
  try {
    // Generate PDF blob
    const blob = await createResumePDF(resumeData);
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    
    // Append link to the body
    document.body.appendChild(link);
    
    // Click the link to trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}; 