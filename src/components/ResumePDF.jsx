import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Helper function to safely access potentially null values
const safe = (val) => val || '';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    backgroundColor: '#FFFFFF'
  },
  header: {
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    color: '#374151',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    color: '#4B5563',
    fontSize: 9,
  },
  contactItem: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 5,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 2,
    marginBottom: 5,
    marginTop: 10,
  },
  section: {
    marginBottom: 15,
  },
  entryContainer: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  entryTitle: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  entryCompany: {
    color: '#374151',
  },
  entryDate: {
    fontSize: 9,
    color: '#4B5563',
  },
  entryLocation: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 2,
  },
  entryDescription: {
    color: '#4B5563',
    marginTop: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginTop: 3,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skill: {
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    padding: '3 8',
    borderRadius: 10,
    margin: '0 5 5 0',
    fontSize: 9,
  },
  link: {
    color: '#2563EB',
    fontSize: 9,
    textDecoration: 'none',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 8,
  },
});

// Resume PDF Component
const ResumePDF = ({ resumeData, sectionOrder }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;

  // Render personal information section
  const renderPersonalInfo = () => (
    <View style={styles.header}>
      <Text style={styles.name}>{safe(personalInfo.name)}</Text>
      <Text style={styles.title}>{safe(personalInfo.title)}</Text>
      <View style={styles.contactInfo}>
        {personalInfo.email && (
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>✉</Text>
            <Text>{personalInfo.email}</Text>
          </View>
        )}
        {personalInfo.phone && (
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text>{personalInfo.phone}</Text>
          </View>
        )}
        {personalInfo.location && (
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📍</Text>
            <Text>{personalInfo.location}</Text>
          </View>
        )}
      </View>
    </View>
  );

  // Render summary section
  const renderSummary = () => {
    if (!personalInfo.summary) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Summary</Text>
        <Text style={styles.entryDescription}>{personalInfo.summary}</Text>
      </View>
    );
  };

  // Render experience section
  const renderExperience = () => {
    if (!experience?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Experience</Text>
        {experience.map((exp, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View>
                <Text style={styles.entryTitle}>{safe(exp.title)}</Text>
                <Text style={styles.entryCompany}>{safe(exp.company)}</Text>
              </View>
              <Text style={styles.entryDate}>
                {safe(exp.startDate)} - {exp.endDate || 'Present'}
              </Text>
            </View>
            <Text style={styles.entryLocation}>{safe(exp.location)}</Text>
            
            {exp.description && exp.description.split('\n').map((bullet, i) => (
              bullet.trim() ? (
                <View key={i} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet.trim()}</Text>
                </View>
              ) : null
            ))}
          </View>
        ))}
      </View>
    );
  };

  // Render education section
  const renderEducation = () => {
    if (!education?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Education</Text>
        {education.map((edu, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View>
                <Text style={styles.entryTitle}>{safe(edu.degree)}</Text>
                <Text style={styles.entryCompany}>{safe(edu.school)}</Text>
              </View>
              <Text style={styles.entryDate}>
                {safe(edu.startDate)} - {edu.endDate || 'Present'}
              </Text>
            </View>
            <Text style={styles.entryLocation}>{safe(edu.location)}</Text>
            {edu.description && (
              <Text style={styles.entryDescription}>{edu.description}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  // Render skills section
  const renderSkills = () => {
    if (!skills?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Skills</Text>
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>{skill.name}</Text>
          ))}
        </View>
      </View>
    );
  };

  // Render projects section
  const renderProjects = () => {
    if (!projects?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Projects</Text>
        {projects.map((project, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{safe(project.name)}</Text>
              <Text style={styles.entryDate}>{safe(project.date)}</Text>
            </View>
            {project.url && (
              <Link src={project.url} style={styles.link}>
                {project.url}
              </Link>
            )}
            <Text style={styles.entryDescription}>{safe(project.description)}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render certifications section
  const renderCertifications = () => {
    if (!certifications?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Certifications</Text>
        {certifications.map((cert, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{safe(cert.name)}</Text>
              <Text style={styles.entryDate}>{safe(cert.date)}</Text>
            </View>
            <Text style={styles.entryCompany}>{safe(cert.issuer)}</Text>
            {cert.url && (
              <Link src={cert.url} style={styles.link}>
                {cert.url}
              </Link>
            )}
          </View>
        ))}
      </View>
    );
  };

  // Map section IDs to render functions
  const sectionRenderers = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    projects: renderProjects,
    certifications: renderCertifications
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Info is always at the top */}
        {renderPersonalInfo()}
        
        {/* Render sections based on order */}
        {sectionOrder && sectionOrder
          .filter(section => section.visible)
          .map(section => {
            const renderSection = sectionRenderers[section.id];
            return renderSection ? renderSection() : null;
          })}
      </Page>
    </Document>
  );
};

export default ResumePDF; 