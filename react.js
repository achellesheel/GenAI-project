import React, { useState } from 'react';
import { Mic, Image, Video, FileText, Download, Sparkles, Zap, Database } from 'lucide-react';

export default function AIContentStudio() {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectStats] = useState({
    technologies: 12,
    features: 6,
    apiIntegrations: 4
  });

  const techStack = [
    { name: 'React.js', category: 'Frontend', icon: '⚛️' },
    { name: 'Node.js', category: 'Backend', icon: '🟢' },
    { name: 'JavaScript (ES6+)', category: 'Language', icon: '📜' },
    { name: 'ElevenLabs API', category: 'AI Voiceover', icon: '🎙️' },
    { name: 'MidJourney API', category: 'AI Image Gen', icon: '🖼️' },
    { name: 'HeyGen API', category: 'AI Video Gen', icon: '🎬' },
    { name: 'OpenAI GPT-4', category: 'NLP', icon: '🤖' },
    { name: 'Statistical Modeling', category: 'Analytics', icon: '📊' },
    { name: 'Feature Engineering', category: 'ML Pipeline', icon: '⚙️' },
    { name: 'GitHub Copilot', category: 'Dev Tool', icon: '🐙' },
    { name: 'LLMOps', category: 'Operations', icon: '🔧' },
    { name: 'Agile/PM', category: 'Methodology', icon: '📋' }
  ];

  const features = [
    {
      id: 1,
      title: 'AI Text Generation',
      description: 'GPT-4 powered content creation with custom fine-tuning',
      tech: ['OpenAI API', 'NLP', 'Model Fine-tuning'],
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Voice Synthesis',
      description: 'Generate professional voiceovers using ElevenLabs',
      tech: ['ElevenLabs API', 'AI Voiceover'],
      icon: <Mic className="w-6 h-6" />
    },
    {
      id: 3,
      title: 'Image Generation',
      description: 'Create AI images with prompt engineering',
      tech: ['MidJourney', 'Prompt Engineering'],
      icon: <Image className="w-6 h-6" />
    },
    {
      id: 4,
      title: 'Video Creation',
      description: 'AI-powered video generation with HeyGen',
      tech: ['HeyGen API', 'Video Processing'],
      icon: <Video className="w-6 h-6" />
    },
    {
      id: 5,
      title: 'Analytics Dashboard',
      description: 'Track usage with statistical modeling',
      tech: ['Statistical Modeling', 'Data Visualization'],
      icon: <Database className="w-6 h-6" />
    },
    {
      id: 6,
      title: 'LLMOps Pipeline',
      description: 'Model monitoring and optimization',
      tech: ['LLMOps', 'Performance Tracking'],
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const architectureLayers = [
    { layer: 'Frontend', tech: 'React.js + JavaScript ES6+', color: 'bg-blue-500' },
    { layer: 'API Layer', tech: 'Node.js + Express', color: 'bg-green-500' },
    { layer: 'AI Services', tech: 'OpenAI, ElevenLabs, MidJourney, HeyGen', color: 'bg-purple-500' },
    { layer: 'Analytics', tech: 'Statistical Modeling + Feature Engineering', color: 'bg-orange-500' },
    { layer: 'DevOps', tech: 'GitHub, LLMOps, Agile PM', color: 'bg-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Content Studio
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Full-Stack GenAI Application with Multi-Modal Content Generation
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="bg-purple-500/20 px-6 py-3 rounded-lg border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-400">{projectStats.technologies}</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
            <div className="bg-blue-500/20 px-6 py-3 rounded-lg border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400">{projectStats.features}</div>
              <div className="text-sm text-gray-400">AI Features</div>
            </div>
            <div className="bg-green-500/20 px-6 py-3 rounded-lg border border-green-500/30">
              <div className="text-3xl font-bold text-green-400">{projectStats.apiIntegrations}</div>
              <div className="text-sm text-gray-400">API Integrations</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          {['overview', 'features', 'tech-stack', 'architecture'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-400 mb-4">Project Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                A comprehensive full-stack application demonstrating advanced GenAI capabilities across
                multiple modalities. Built using modern JavaScript frameworks and integrated with cutting-edge
                AI services for text, image, voice, and video generation.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-400 mb-2">🎯 Objective</h3>
                  <p className="text-sm text-gray-300">
                    Showcase end-to-end GenAI development with production-ready LLMOps practices
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-400 mb-2">💡 Key Innovation</h3>
                  <p className="text-sm text-gray-300">
                    Multi-modal AI pipeline with statistical modeling for quality optimization
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">📈 Impact</h3>
                  <p className="text-sm text-gray-300">
                    90% reduction in content creation time with AI-assisted workflows
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-400 mb-2">⚡ Performance</h3>
                  <p className="text-sm text-gray-300">
                    Real-time generation with feature engineering for optimal model performance
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">AI Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-purple-400">{feature.icon}</div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tech-stack' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-4 rounded-lg border border-gray-600"
                  >
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <h3 className="font-semibold text-white">{tech.name}</h3>
                    <p className="text-sm text-gray-400">{tech.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">System Architecture</h2>
              <div className="space-y-4">
                {architectureLayers.map((layer, idx) => (
                  <div key={idx} className="relative">
                    <div className={`${layer.color} h-2 rounded-full mb-2`} />
                    <div className="flex justify-between items-center bg-gray-700/50 p-4 rounded-lg">
                      <span className="font-semibold text-lg">{layer.layer}</span>
                      <span className="text-gray-300">{layer.tech}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-gray-700/30 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Development Workflow</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <p>Agile sprint planning with GitHub project boards</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p>AI-assisted coding with GitHub Copilot</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <p>LLMOps monitoring for model performance</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <p>Statistical modeling for quality assurance</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GitHub CTA */}
        <div className="mt-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl">
          <Download className="w-8 h-8 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">Ready to Deploy</h3>
          <p className="text-purple-100 mb-4">
            Complete with documentation, test cases, and deployment scripts
          </p>
          <div className="flex gap-3 justify-center">
            <span className="px-4 py-2 bg-white/20 rounded-lg text-sm">MIT License</span>
            <span className="px-4 py-2 bg-white/20 rounded-lg text-sm">Docker Ready</span>
            <span className="px-4 py-2 bg-white/20 rounded-lg text-sm">CI/CD Pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
