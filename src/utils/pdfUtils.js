import React from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '../components/ResumePDF';

/**
 * Creates a PDF from resume data
 * @param {Object} resumeData - The resume data
 * @param {Array} sectionOrder - The order of sections to display
 * @returns {Promise<Blob>} - A promise that resolves to a PDF blob
 */
export const createResumePDF = async (resumeData, sectionOrder) => {
  const document = React.createElement(ResumePDF, { resumeData, sectionOrder });
  const pdfBlob = await pdf(document).toBlob();
  return pdfBlob;
};

/**
 * Generates a resume PDF and triggers a download
 * @param {Object} resumeData - The resume data
 * @param {Array} sectionOrder - The order of sections to display
 * @returns {Promise<void>}
 */
export const generateResumePdf = async (resumeData, sectionOrder) => {
  try {
    const pdfBlob = await createResumePDF(resumeData, sectionOrder);
    const url = URL.createObjectURL(pdfBlob);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}; 