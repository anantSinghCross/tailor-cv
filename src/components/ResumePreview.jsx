import { forwardRef, useEffect, useState } from 'react'

const ResumePreview = forwardRef(({ resumeData, sectionOrder }, ref) => {
  const { personalInfo, education, experience, skills, projects, certifications, customSections } = resumeData
  
  // Define standard colors to replace Tailwind colors
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

  // Render the summary section
  const renderSummary = () => {
    if (!personalInfo.summary) return null
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: colors.gray900,
          borderBottom: `1px solid ${colors.gray300}`,
          paddingBottom: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          Summary
        </h2>
        <p style={{ color: colors.gray700 }}>{personalInfo.summary}</p>
      </div>
    )
  }
  
  // Render the experience section
  const renderExperience = () => {
    if (!experience.length) return null
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: colors.gray900,
          borderBottom: `1px solid ${colors.gray300}`,
          paddingBottom: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          Experience
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {experience.map((exp, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontWeight: '500', color: colors.gray900, margin: '0' }}>{exp.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <p style={{ color: colors.gray700, margin: '0.125rem 0' }}>
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </p>
                    {exp.employmentType && (
                      <span style={{ 
                        color: colors.gray600, 
                        fontStyle: 'italic', 
                        fontSize: '0.875rem' 
                      }}>
                        • {exp.employmentType}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: colors.gray600 }}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
              </div>
              <ul style={{ 
                listStyleType: 'disc', 
                paddingLeft: '1.25rem', 
                color: colors.gray700, 
                marginTop: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                {exp.description?.split('\n').map((item, i) => (
                  item.trim() ? <li key={i}>{item}</li> : null
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // Render the education section
  const renderEducation = () => {
    if (!education.length) return null
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: colors.gray900,
          borderBottom: `1px solid ${colors.gray300}`,
          paddingBottom: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          Education
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {education.map((edu, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontWeight: '500', color: colors.gray900, margin: '0' }}>{edu.degree}</h3>
                  <p style={{ color: colors.gray700, margin: '0.125rem 0' }}>{edu.school}</p>
                </div>
                <div style={{ fontSize: '0.875rem', color: colors.gray600 }}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: colors.gray700, marginTop: '0.25rem' }}>{edu.location}</p>
              {edu.description && (
                <p style={{ color: colors.gray700, marginTop: '0.5rem' }}>{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // Render the skills section
  const renderSkills = () => {
    if (!skills.length) return null
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: colors.gray900,
          borderBottom: `1px solid ${colors.gray300}`,
          paddingBottom: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          Skills
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {skills.map((skill, index) => (
            <span key={index} style={{ 
              backgroundColor: colors.gray100, 
              color: colors.gray800, 
              padding: '0.25rem 0.75rem', 
              borderRadius: '9999px', 
              fontSize: '0.875rem' 
            }}>
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  // Render the projects section
  const renderProjects = () => {
    if (!projects.length) return null
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: colors.gray900,
          borderBottom: `1px solid ${colors.gray300}`,
          paddingBottom: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          Projects
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {projects.map((project, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontWeight: '500', color: colors.gray900, margin: '0' }}>{project.name}</h3>
                <div style={{ fontSize: '0.875rem', color: colors.gray600 }}>
                  {project.date}
                </div>
              </div>
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ fontSize: '0.875rem', color: colors.blue700, textDecoration: 'none' }}
                >
                  {project.url}
                </a>
              )}
              <p style={{ color: colors.gray700, marginTop: '0.5rem' }}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // Render the certifications section
  const renderCertifications = () => {
    if (!certifications || !certifications.length) return null
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: colors.gray900,
          borderBottom: `1px solid ${colors.gray300}`,
          paddingBottom: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          Certifications
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {certifications.map((cert, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontWeight: '500', color: colors.gray900, margin: '0' }}>{cert.title}</h3>
                <div style={{ fontSize: '0.875rem', color: colors.gray600 }}>
                  {cert.date}
                </div>
              </div>
              <p style={{ color: colors.gray700, margin: '0.125rem 0' }}>{cert.issuer}</p>
              {cert.url && (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ fontSize: '0.875rem', color: colors.blue700, textDecoration: 'none' }}
                >
                  {cert.url}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // Render a custom section
  const renderCustomSection = (sectionId) => {
    if (!customSections || !customSections[sectionId]) {
      return null
    }
    
    const section = customSections[sectionId]
    
    // Early return if there's no content to display
    if (
      (section.type === 'list' && (!section.items || !section.items.length)) ||
      (section.type === 'paragraph' && !section.content)
    ) {
      return null
    }
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: colors.gray900,
          borderBottom: `1px solid ${colors.gray300}`,
          paddingBottom: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          {section.title}
        </h2>
        
        {section.type === 'paragraph' ? (
          // Render paragraph content
          <p style={{ color: colors.gray700 }}>{section.content}</p>
        ) : (
          // Render list items
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {section.items.map((item, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontWeight: '500', color: colors.gray900, margin: '0' }}>{item.title}</h3>
                  {item.date && (
                    <div style={{ fontSize: '0.875rem', color: colors.gray600 }}>
                      {item.date}
                    </div>
                  )}
                </div>
                {item.description && (
                  <p style={{ color: colors.gray700, marginTop: '0.5rem' }}>{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  
  // Map section IDs to render functions
  const sectionRenderers = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    projects: renderProjects,
    certifications: renderCertifications
  }

  return (
    <div className="resume-container">
      <div 
        ref={ref}
        className="resume-page pdf-safe" 
        style={{ 
          width: '8.5in', 
          minHeight: '11in',
          padding: '0.5in',
          backgroundColor: colors.white
        }}
      >
        {/* Personal Info Header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '700', 
                color: colors.gray900,
                margin: '0 0 0.25rem 0'
              }}>
                {personalInfo.name || 'Your Name'}
              </h1>
              <p style={{ 
                fontSize: '1.125rem', 
                color: colors.gray700,
                margin: '0 0 0.5rem 0'
              }}>
                {personalInfo.title || 'Professional Title'}
              </p>
            </div>
            
            {/* Social Links */}
            {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end' }}>
                {personalInfo.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: colors.blue700,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ marginRight: '0.25rem' }}>{link.platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            color: colors.gray600,
            fontSize: '0.875rem'
          }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {/* Filtered and ordered sections */}
        {sectionOrder
          .filter(section => section.visible)
          .map(section => {
            // Handle both predefined and custom sections
            if (section.id.startsWith('custom-')) {
              return renderCustomSection(section.id);
            }
            
            const sectionRenderer = sectionRenderers[section.id];
            return sectionRenderer ? sectionRenderer() : null;
          })}
      </div>
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview 