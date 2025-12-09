import React, { useState } from 'react';
import { TopicDefinition, TopicContent } from './types';
import { STATIC_CONTENT, TOPICS_LIST } from './data/staticContent';
import { TopicCard } from './components/TopicCard';
import { ExerciseItem } from './components/ExerciseItem';
import { ChevronLeft, GraduationCap, Globe2, BookOpen, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const App: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<TopicDefinition | null>(null);
  const [content, setContent] = useState<TopicContent | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');

  const handleTopicSelect = (topic: TopicDefinition) => {
    setActiveTopic(topic);
    const staticData = STATIC_CONTENT[topic.id];
    if (staticData) {
      setContent(staticData);
    }
    setActiveTab('theory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveTopic(null);
    setContent(null);
  };

  const renderContent = () => {
    if (!content) return null;

    return (
      <div className="max-w-4xl mx-auto pb-12">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8 sticky top-16 bg-slate-50 z-20 pt-4">
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'theory' 
                ? 'border-red-600 text-red-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            Теория и Правила
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'practice' 
                ? 'border-red-600 text-red-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            Практика ({content.exercises.length})
          </button>
        </div>

        {/* Theory View */}
        {activeTab === 'theory' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate max-w-none animate-in fade-in slide-in-from-bottom-2 duration-300">
             <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-serif font-bold text-slate-900 mb-6" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-serif font-bold text-slate-800 mt-8 mb-4 border-l-4 border-red-500 pl-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-serif font-bold text-slate-800 mt-6 mb-3" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-slate-700" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-red-700" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-slate-700 leading-relaxed" {...props} />,
                table: ({node, ...props}) => <div className="overflow-x-auto my-6 border rounded-lg"><table className="min-w-full divide-y divide-slate-200" {...props} /></div>,
                thead: ({node, ...props}) => <thead className="bg-slate-50" {...props} />,
                th: ({node, ...props}) => <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider" {...props} />,
                td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 border-t border-slate-100" {...props} />,
              }}
            >
              {content.ruleExplanation}
            </ReactMarkdown>
            
            <div className="mt-12 flex justify-center border-t border-slate-100 pt-8">
              <button
                onClick={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="group px-8 py-3 bg-red-600 text-white font-bold rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition-all flex items-center gap-2"
              >
                Перейти к практике
                <GraduationCap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Practice View */}
        {activeTab === 'practice' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4 mb-8">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-lg mb-1">Время закрепить знания!</h4>
                <p className="text-blue-800 leading-relaxed">
                  Выполните задания ниже. Система мгновенно проверит ваши ответы и покажет правильный вариант с объяснением.
                </p>
              </div>
            </div>
            
            {content.exercises.map((exercise, idx) => (
              <ExerciseItem key={idx} exercise={exercise} index={idx} />
            ))}

            <div className="flex justify-center pt-8">
               <button onClick={handleBack} className="text-slate-500 hover:text-slate-900 underline">
                 Вернуться к выбору темы
               </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className={`bg-white border-b border-slate-200 sticky top-0 z-40 transition-shadow ${activeTopic ? 'shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleBack}>
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm group-hover:shadow-md transition-all">
              Р
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-slate-900 text-base leading-none">РКИ Тренажер</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Russian as Foreign Language</span>
            </div>
          </div>
          
          {activeTopic && (
            <h2 className="absolute left-1/2 transform -translate-x-1/2 font-medium text-slate-900 hidden md:flex items-center gap-2 px-4 py-1 bg-slate-100 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {activeTopic.title}
            </h2>
          )}

          <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600">
             <button onClick={handleBack} className="hover:text-red-600 transition-colors">Главная</button>
             <button className="hover:text-red-600 transition-colors">О нас</button>
             <button className="hover:text-red-600 transition-colors">Контакты</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {!activeTopic ? (
          // Dashboard View
          <div className="animate-in fade-in duration-500">
            
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white overflow-hidden mb-16">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1920" 
                  alt="Library background" 
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              </div>
              
              <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight">
                  ИЗУЧЕНИЕ РУССКОГО ЯЗЫКА<br/>
                  <span className="text-red-500">КАК ИНОСТРАННОГО</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                  Платформа для целевой практики по русскому языку как иностранному.
                  Улучшайте грамматику и речь шаг за шагом.
                </p>
                
                <div className="mt-10">
                  <button 
                    onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all"
                  >
                    Начать обучение
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">О сайте</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Точечная работа над наиболее распространёнными ошибками в русском языке. 
                  Краткие правила и интерактивные упражнения.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="rounded-xl overflow-hidden shadow-md group">
                  <div className="h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500" alt="Students" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-bold text-lg mb-2 text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-red-500" />
                      Для студентов
                    </h3>
                    <p className="text-slate-600 text-sm">Идеально подходит для уровней A2-B1 для закрепления материала.</p>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-md group">
                  <div className="h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=500" alt="Learn Languages" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-bold text-lg mb-2 text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-red-500" />
                      Грамматика
                    </h3>
                    <p className="text-slate-600 text-sm">Простые объяснения сложных правил без лишней "воды".</p>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-md group">
                  <div className="h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573166368367-068a3151f845?auto=format&fit=crop&q=80&w=500" alt="Communication" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-bold text-lg mb-2 text-slate-900 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-red-500" />
                      Коммуникация
                    </h3>
                    <p className="text-slate-600 text-sm">Развитие навыков живой разговорной речи.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics Section */}
            <div id="topics" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-px bg-slate-200 flex-grow"></div>
                 <h2 className="text-2xl font-serif font-bold text-slate-900">Выберите раздел для тренировки</h2>
                 <div className="h-px bg-slate-200 flex-grow"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TOPICS_LIST.map((topic) => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic} 
                    onClick={handleTopicSelect}
                    disabled={false}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Topic Detail View
          <div className="bg-slate-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button 
                onClick={handleBack}
                className="mb-8 flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium group"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 group-hover:border-red-400 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-red-500" />
                </div>
                Вернуться к разделам
              </button>
              
              {renderContent()}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-serif font-bold">Р</div>
            <span className="font-serif font-bold text-slate-900">РКИ Тренажер</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Все права защищены.
          </div>
          <div className="flex gap-4">
            <Globe2 className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;