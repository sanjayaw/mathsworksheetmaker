import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { TopicSelector } from './components/TopicSelector';
import { topics } from './topics';
import type { TopicId } from './types';
import './App.css';

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<TopicId>('multiplication-partial');

  const handleDownload = async () => {
    const topic = topics[selectedTopic];

    if (!topic.available) {
      alert('This topic is coming soon!');
      return;
    }

    try {
      setIsGenerating(true);
      
      // Generate fresh random problems
      const problems = topic.generateProblems();
      const WorksheetPDF = topic.WorksheetPDF;
      
      // Generate PDF blob
      const blob = await pdf(<WorksheetPDF problems={problems} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedTopic}-worksheet-${Date.now()}.pdf`;
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
    <div className={`app${isGenerating ? ' generating' : ''}`}>
      <h1 className="title">Maths Tutor - Worksheet Generator</h1>
      <TopicSelector
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
      />
      <button
        className={`download-button${isGenerating ? ' generating' : ''}`}
        onClick={handleDownload}
        disabled={isGenerating || !topics[selectedTopic].available}
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
