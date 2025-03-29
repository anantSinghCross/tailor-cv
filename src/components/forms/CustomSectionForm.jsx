import { useState } from 'react'

const CustomSectionForm = ({ sectionId, sectionData, onChange, onRemove }) => {
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    date: ''
  })

  const handleTitleChange = (e) => {
    const updatedData = {
      ...sectionData,
      title: e.target.value
    }
    onChange(sectionId, updatedData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddItem = () => {
    if (!newItem.title) {
      alert('Title is required')
      return
    }

    // Create a new item with an ID
    const newItemWithId = {
      ...newItem,
      id: Date.now()
    }

    // Update the section data
    const updatedData = {
      ...sectionData,
      items: [...sectionData.items, newItemWithId]
    }

    // Call the onChange prop with the updated data
    onChange(sectionId, updatedData)

    // Reset the form
    setNewItem({
      title: '',
      description: '',
      date: ''
    })
  }

  const handleRemoveItem = (itemId) => {
    const updatedItems = sectionData.items.filter(item => item.id !== itemId)
    
    const updatedData = {
      ...sectionData,
      items: updatedItems
    }
    
    onChange(sectionId, updatedData)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
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
            placeholder="e.g. Achievements, Volunteer Work, etc."
          />
        </div>
        <button
          type="button"
          onClick={() => onRemove(sectionId)}
          className="ml-4 text-red-500 hover:text-red-700 font-medium"
        >
          Remove Section
        </button>
      </div>

      {/* List of items */}
      {sectionData.items.length > 0 ? (
        <div className="mb-6 space-y-4">
          <h3 className="text-md font-medium text-gray-700">Items</h3>
          {sectionData.items.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 flex justify-between">
              <div>
                <h4 className="font-medium text-gray-800">{item.title}</h4>
                {item.date && <p className="text-sm text-gray-500">{item.date}</p>}
                {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
              </div>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-6 text-gray-500 italic">No items added yet.</p>
      )}

      {/* Add new item form */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className="text-md font-medium text-gray-700 mb-3">Add New Item</h3>
        
        <div className="grid grid-cols-1 gap-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newItem.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. Achievement Title, Organization Name, etc."
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date (optional)
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={newItem.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. 2022, May 2022, 2020-2022, etc."
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter a description..."
            ></textarea>
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleAddItem}
              className=" bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomSectionForm 