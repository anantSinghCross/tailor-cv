import { useState } from 'react'

const CertificationsForm = ({ certifications = [], onChange }) => {
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    url: ''
  })
  
  const handleAddCertification = () => {
    // Validate required fields
    if (!newCertification.name || !newCertification.issuer) {
      alert('Certification name and issuer are required')
      return
    }
    
    // Add the new certification
    const updatedCertifications = [...certifications, { ...newCertification, id: Date.now() }]
    onChange(updatedCertifications)
    
    // Reset the form
    setNewCertification({
      name: '',
      issuer: '',
      date: '',
      url: ''
    })
  }
  
  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications]
    updatedCertifications.splice(index, 1)
    onChange(updatedCertifications)
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCertification(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Certifications</h2>
      
      {/* List of existing certifications */}
      {certifications.length > 0 ? (
        <div className="mb-6 space-y-4">
          <h3 className="text-md font-medium text-gray-700">Your Certifications</h3>
          {certifications.map((cert, index) => (
            <div key={cert.id || index} className="p-4 rounded-lg bg-gray-50 flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{cert.name}</h4>
                <p className="text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500">{cert.date}</p>
                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Certificate
                  </a>
                )}
              </div>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveCertification(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-6 text-gray-500 italic">No certifications added yet.</p>
      )}
      
      {/* Add new certification form */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-700 mb-3">Add New Certification</h3>
        
        <div className="grid grid-cols-1 gap-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Certification Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCertification.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. AWS Certified Solutions Architect"
            />
          </div>
          
          <div>
            <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Organization*
            </label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={newCertification.issuer}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. Amazon Web Services"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date Acquired
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={newCertification.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. May 2022"
            />
          </div>
          
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Certificate URL (optional)
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={newCertification.url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g. https://www.credly.com/badges/..."
            />
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleAddCertification}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Certification
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationsForm 