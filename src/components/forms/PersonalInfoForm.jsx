import React from 'react'

const PersonalInfoForm = ({ personalInfo, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(name, value)
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
    </div>
  )
}

export default PersonalInfoForm 