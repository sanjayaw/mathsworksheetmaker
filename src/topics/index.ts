import type { TopicConfig, TopicId } from '../types';
import { generateProblems as generatePartialProblems } from './multiplication-partial/generateProblems';
import { WorksheetPDF as PartialProductsPDF } from './multiplication-partial/WorksheetPDF';
import { generateProblems as generateStandardProblems } from './multiplication-standard/generateProblems';
import { WorksheetPDF as StandardPDF } from './multiplication-standard/WorksheetPDF';

export const topics: Record<TopicId, TopicConfig> = {
  'multiplication-partial': {
    id: 'multiplication-partial',
    name: 'Multiplication (Partial Products)',
    description: 'Break numbers into place values, multiply each, then add',
    available: true,
    generateProblems: generatePartialProblems,
    WorksheetPDF: PartialProductsPDF,
  },
  'multiplication-standard': {
    id: 'multiplication-standard',
    name: 'Multiplication (Standard Algorithm)',
    description: 'Traditional method with carrying',
    available: true,
    generateProblems: generateStandardProblems,
    WorksheetPDF: StandardPDF as any,
  },
  'long-division': {
    id: 'long-division',
    name: 'Long Division',
    description: 'Divide large numbers step by step',
    available: false,
    generateProblems: () => [],
    WorksheetPDF: () => null,
  },
  fractions: {
    id: 'fractions',
    name: 'Fractions',
    description: 'Add, subtract, multiply and divide fractions',
    available: false,
    generateProblems: () => [],
    WorksheetPDF: () => null,
  },
};

export const getAvailableTopics = (): TopicConfig[] =>
  Object.values(topics).filter((topic) => topic.available);

export const getAllTopics = (): TopicConfig[] => Object.values(topics);
