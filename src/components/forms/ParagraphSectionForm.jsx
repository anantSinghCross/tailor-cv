import { useState } from 'react'

const ParagraphSectionForm = ({ sectionId, sectionData, onChange, onRemove }) => {
  const handleTitleChange = (e) => {
    const updatedData = {
      ...sectionData,
      title: e.target.value
    }
    onChange(sectionId, updatedData)
  }

  const handleContentChange = (e) => {
    const updatedData = {
      ...sectionData,
      content: e.target.value
    }
    onChange(sectionId, updatedData)
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div className="flex-1">
          <label htmlFor="section-title" className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            id="section-title"
            value={sectionData.title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. About Me, Summary, Profile"
          />
        </div>
        <button
          type="button"
          onClick={() => onRemove(sectionId)}
          className="ml-4 bg-red-50 rounded-md text-red-500 font-medium"
        >
          Remove Section
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor="section-content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="section-content"
          value={sectionData.content || ''}
          onChange={handleContentChange}
          rows="8"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter the content for this section..."
        ></textarea>
      </div>
    </div>
  )
}

export default ParagraphSectionForm 