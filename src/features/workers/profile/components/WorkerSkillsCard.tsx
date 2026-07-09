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
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Skills & Expertise
        </h2>
        
        {skills.length > 5 && (
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills..."
              className="pl-9 pr-4 py-1.5 bg-muted border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full sm:w-48"
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
              className="group flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/30 rounded-full transition-colors cursor-default"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
              <span className="text-sm font-semibold text-foreground">{skill}</span>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-6 text-sm text-muted-foreground">
            No skills found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
