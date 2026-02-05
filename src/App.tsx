import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { WorksheetPDF } from './components/WorksheetPDF';
import { generateProblems } from './utils/generateProblems';
import './App.css';

function App() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      
      // Generate fresh random problems
      const problems = generateProblems();
      
      // Generate PDF blob
      const blob = await pdf(<WorksheetPDF problems={problems} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `multiplication-worksheet-${Date.now()}.pdf`;
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Failed to generate worksheet: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Maths Tutor - Worksheet Generator</h1>
      <button 
        className="download-button" 
        onClick={handleDownload}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Download Worksheet'}
      </button>
      <p className="description">
        Generates 80 multiplication problems across 4 pages with progressive difficulty
      </p>
    </div>
  );
}

export default App;
