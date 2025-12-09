import React from 'react';
import { TopicDefinition } from '../types';
import { BookOpen, Footprints, MessageCircle, Anchor, HelpCircle, GraduationCap } from 'lucide-react';

interface TopicCardProps {
  topic: TopicDefinition;
  onClick: (topic: TopicDefinition) => void;
  disabled: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  'footprints': Footprints,
  'message-circle': MessageCircle,
  'anchor': Anchor,
  'book-open': BookOpen,
  'help-circle': HelpCircle,
  'graduation-cap': GraduationCap
};

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick, disabled }) => {
  const Icon = iconMap[topic.icon] || HelpCircle;

  return (
    <button
      onClick={() => onClick(topic)}
      disabled={disabled}
      className={`
        group relative flex flex-col h-full rounded-2xl p-8 text-left transition-all duration-300
        bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl hover:-translate-y-1
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
        <Icon size={28} />
      </div>
      
      <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-red-700 transition-colors">
        {topic.title}
      </h3>
      
      <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
        {topic.description}
      </p>
      
      <div className="mt-auto pt-6 border-t border-slate-50 w-full">
        <span className="inline-flex items-center font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors">
          Начать урок
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </button>
  );
};