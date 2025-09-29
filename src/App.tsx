import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h1>Fish Picture of the Day</h1>
      
      <div className="upload-section">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </div>

      {preview && (
        <div className="preview-section">
          <h2>Preview for {date}</h2>
          <img 
            src={preview} 
            alt="Fish of the day preview" 
            style={{ maxWidth: '100%', maxHeight: '500px' }} 
          />
        </div>
      )}

      {!preview && (
        <div className="empty-state">
          <p>Select a fish photo to display</p>
        </div>
      )}
    </div>
  )
}

export default App