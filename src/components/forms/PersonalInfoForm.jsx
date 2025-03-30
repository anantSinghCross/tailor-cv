import React, { useState } from 'react'

const PersonalInfoForm = ({ personalInfo, onChange }) => {
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' })
  const [editIndex, setEditIndex] = useState(-1)

  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target
    setNewSocialLink(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      alert('Please provide both platform name and URL')
      return
    }

    // If we're editing an existing link
    if (editIndex >= 0) {
      const updatedLinks = [...(personalInfo.socialLinks || [])]
      updatedLinks[editIndex] = newSocialLink
      onChange('socialLinks', updatedLinks)
      setEditIndex(-1)
    } else {
      // If we're adding a new link
      const socialLinks = [...(personalInfo.socialLinks || []), newSocialLink]
      onChange('socialLinks', socialLinks)
    }

    // Reset form
    setNewSocialLink({ platform: '', url: '' })
  }

  const handleEditSocialLink = (index) => {
    setEditIndex(index)
    setNewSocialLink(personalInfo.socialLinks[index])
  }

  const handleDeleteSocialLink = (index) => {
    const updatedLinks = personalInfo.socialLinks.filter((_, i) => i !== index)
    onChange('socialLinks', updatedLinks)
  }

  const handleCancelEdit = () => {
    setEditIndex(-1)
    setNewSocialLink({ platform: '', url: '' })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
            Professional Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={personalInfo.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
            placeholder="Software Engineer"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
            placeholder="john.doe@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-600 mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
          placeholder="City, State, Country"
        />
      </div>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-600 mb-1">
          Professional Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md  -none focus:ring-2 focus:ring-blue-500"
          placeholder="A brief summary of your professional background and career goals..."
        />
      </div>

      {/* Social Links Section */}
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Social Links</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add links to your professional profiles (LinkedIn, GitHub, portfolio, etc.)
        </p>

        {/* List of existing social links */}
        {personalInfo.socialLinks && personalInfo.socialLinks.length > 0 && (
          <div className="mb-4 space-y-2">
            {personalInfo.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200">
                <div>
                  <span className="font-medium">{link.platform}: </span>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    {link.url}
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditSocialLink(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSocialLink(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form to add/edit social links */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-600 mb-1">
                Platform
              </label>
              <input
                type="text"
                id="platform"
                name="platform"
                value={newSocialLink.platform}
                onChange={handleSocialLinkChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                placeholder="LinkedIn, GitHub, etc."
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-600 mb-1">
                URL
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={newSocialLink.url}
                onChange={handleSocialLinkChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex justify-end">
            {editIndex >= 0 && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleAddSocialLink}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700  -none focus:ring-2 focus:ring-blue-500"
            >
              {editIndex >= 0 ? 'Update Link' : 'Add Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoForm 