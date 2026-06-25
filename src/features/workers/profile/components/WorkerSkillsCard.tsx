import React, { useState } from "react";
import { Award, Search } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";

interface WorkerSkillsCardProps {
  skills: WorkerProfileData["profile"]["skills"];
}

export function WorkerSkillsCard({ skills }: WorkerSkillsCardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Skills & Expertise
        </h2>
        
        {skills.length > 5 && (
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills..."
              className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full sm:w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 px-3.5 py-1.5 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 rounded-full transition-colors cursor-default"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
              <span className="text-sm font-semibold text-blue-800">{skill}</span>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-6 text-sm text-slate-500">
            No skills found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
