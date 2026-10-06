import React from 'react';
import { Brain, Smile, AlertCircle, Eye, Zap } from 'lucide-react';

const EngagementMonitor = ({ status }) => {
    const { isAttentive, isPresent, mood, engagementScore = 85 } = status;

    const getStatusConfig = () => {
        if (!isPresent) return { 
            icon: <AlertCircle className="text-red-500" />, 
            text: 'User Not Detected', 
            color: 'border-red-500 bg-red-50 dark:bg-red-900/20' 
        };
        if (!isAttentive) return { 
            icon: <Zap className="text-yellow-500" />, 
            text: 'Distracted', 
            color: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
        };
        return { 
            icon: <Brain className="text-green-500" />, 
            text: 'Focused', 
            color: 'border-green-500 bg-green-50 dark:bg-green-900/20' 
        };
    };

    const config = getStatusConfig();

    return (
        <div className={`p-4 rounded-xl border-l-4 shadow-lg transition-all duration-500 ${config.color}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {config.icon}
                    <span className="font-bold text-sm uppercase tracking-wider">{config.text}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">LIVE AI</span>
                </div>
            </div>

            <div className="space-y-3">
                {/* Engagement Bar */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500 font-medium">Engagement Score</span>
                        <span className="text-xs font-bold">{engagementScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-1000 ease-out"
                            style={{ width: `${engagementScore}%` }}
                        ></div>
                    </div>
                </div>

                {/* Mood & Focus Icons */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Smile size={14} className="text-gray-400" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 leading-none">
                            Mood: <span className="capitalize text-gray-800 dark:text-gray-200">{mood || 'Neutral'}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-gray-300 dark:border-gray-700 pl-4">
                        <Eye size={14} className="text-gray-400" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 leading-none">
                            Attention: <span className="text-gray-800 dark:text-gray-200">{isAttentive ? 'High' : 'Low'}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EngagementMonitor;
