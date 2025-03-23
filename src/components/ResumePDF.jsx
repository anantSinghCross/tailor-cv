import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827', // gray-900
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#374151', // gray-700
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#4b5563', // gray-600
    marginBottom: 5,
  },
  contactItem: {
    marginRight: 15,
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827', // gray-900
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db', // gray-300
    paddingBottom: 2,
    marginBottom: 6,
  },
  sectionContent: {
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  itemDate: {
    fontSize: 9,
    color: '#4b5563', // gray-600
  },
  itemCompany: {
    fontSize: 10,
    color: '#374151', // gray-700
    marginBottom: 2,
  },
  itemLocation: {
    fontSize: 9,
    color: '#4b5563', // gray-600
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 10,
    color: '#374151', // gray-700
    marginLeft: 10,
    marginBottom: 1,
  },
  bulletPoint: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#374151',
    marginRight: 5,
    marginTop: 4,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  summary: {
    fontSize: 10,
    color: '#374151', // gray-700
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillPill: {
    backgroundColor: '#f3f4f6', // gray-100
    borderRadius: 10,
    padding: '2 8',
    fontSize: 9,
    color: '#1f2937', // gray-800
    marginRight: 5,
    marginBottom: 5,
  },
  url: {
    fontSize: 9,
    color: '#1d4ed8', // blue-700
    marginBottom: 4,
    textDecoration: 'none',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 8,
    color: '#6b7280', // gray-500
  },
});

// Create Resume Document
const ResumePDF = ({ resumeData }) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;
  
  // Helper function for safe text
  const safe = (text) => text || '';

  // Calculate how many pages will be needed based on content volume
  const calculateTotalPages = () => {
    // This is a simplified calculation, in reality page breaks are more complex
    const experienceItems = experience.length;
    const educationItems = education.length;
    const projectItems = projects.length;
    
    // Rough estimation based on number of items and description lengths
    let contentVolume = experienceItems * 2 + educationItems + projectItems;
    
    // Add volume for description lengths
    experience.forEach(exp => {
      if (exp.description) {
        const lines = exp.description.split('\n').filter(line => line.trim()).length;
        contentVolume += lines * 0.5;
      }
    });
    
    // Return at least 1 page, at most 5 for standard resumes
    return Math.max(1, Math.min(5, Math.ceil(contentVolume / 10)));
  };
  
  const totalPages = calculateTotalPages();

  // Header component (personal info) for first page
  const HeaderSection = () => (
    <View style={styles.header}>
      <Text style={styles.name}>{safe(personalInfo.name) || 'Your Name'}</Text>
      <Text style={styles.title}>{safe(personalInfo.title) || 'Professional Title'}</Text>
      
      <View style={styles.contactInfo}>
        {personalInfo.email && (
          <View style={styles.contactItem}>
            <Text>{personalInfo.email}</Text>
          </View>
        )}
        
        {personalInfo.phone && (
          <View style={styles.contactItem}>
            <Text>{personalInfo.phone}</Text>
          </View>
        )}
        
        {personalInfo.location && (
          <View style={styles.contactItem}>
            <Text>{personalInfo.location}</Text>
          </View>
        )}
      </View>
    </View>
  );

  // Summary section
  const SummarySection = () => (
    personalInfo.summary ? (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{personalInfo.summary}</Text>
      </View>
    ) : null
  );

  // Experience section
  const ExperienceSection = () => (
    experience.length > 0 ? (
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.map((exp, index) => (
          <View key={index} style={styles.sectionContent} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{safe(exp.title)}</Text>
              <Text style={styles.itemDate}>{safe(exp.startDate)} - {exp.endDate || 'Present'}</Text>
            </View>
            <Text style={styles.itemCompany}>{safe(exp.company)}</Text>
            {exp.location && <Text style={styles.itemLocation}>{safe(exp.location)}</Text>}
            
            {exp.description?.split('\n').map((item, i) => (
              item.trim() ? (
                <View key={i} style={styles.bulletContainer}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.itemDescription}>{item.trim()}</Text>
                </View>
              ) : null
            ))}
          </View>
        ))}
      </View>
    ) : null
  );

  // Education section
  const EducationSection = () => (
    education.length > 0 ? (
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((edu, index) => (
          <View key={index} style={styles.sectionContent} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{safe(edu.degree)}</Text>
              <Text style={styles.itemDate}>{safe(edu.startDate)} - {edu.endDate || 'Present'}</Text>
            </View>
            <Text style={styles.itemCompany}>{safe(edu.school)}</Text>
            {edu.location && <Text style={styles.itemLocation}>{safe(edu.location)}</Text>}
            {edu.description && <Text style={styles.summary}>{safe(edu.description)}</Text>}
          </View>
        ))}
      </View>
    ) : null
  );

  // Skills section
  const SkillsSection = () => (
    skills.length > 0 ? (
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillPill}>
              <Text>{safe(skill.name)}</Text>
            </View>
          ))}
        </View>
      </View>
    ) : null
  );

  // Projects section
  const ProjectsSection = () => (
    projects.length > 0 ? (
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {projects.map((project, index) => (
          <View key={index} style={styles.sectionContent} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{safe(project.name)}</Text>
              {project.date && <Text style={styles.itemDate}>{safe(project.date)}</Text>}
            </View>
            
            {project.url && (
              <Text style={styles.url}>{safe(project.url)}</Text>
            )}
            
            {project.description && <Text style={styles.summary}>{safe(project.description)}</Text>}
          </View>
        ))}
      </View>
    ) : null
  );

  // Footer component with page number
  const Footer = ({ pageNumber }) => (
    <Text style={styles.footer}>Page {pageNumber} of {totalPages}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <HeaderSection />
        <SummarySection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <Footer pageNumber={1} />
      </Page>
    </Document>
  );
};

export default ResumePDF; 