import type { TopicId } from '../types';
import { getAllTopics } from '../topics';

interface TopicSelectorProps {
  selectedTopic: TopicId;
  onTopicChange: (topicId: TopicId) => void;
}

export const TopicSelector = ({ selectedTopic, onTopicChange }: TopicSelectorProps) => {
  const topics = getAllTopics();

  return (
    <div className="topic-selector">
      <label htmlFor="topic-select">Topic:</label>
      <select
        id="topic-select"
        value={selectedTopic}
        onChange={(event) => onTopicChange(event.target.value as TopicId)}
      >
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id} disabled={!topic.available}>
            {topic.name}{!topic.available ? ' (Coming Soon)' : ''}
          </option>
        ))}
      </select>
      <p className="topic-description">
        {topics.find((topic) => topic.id === selectedTopic)?.description}
      </p>
    </div>
  );
};
