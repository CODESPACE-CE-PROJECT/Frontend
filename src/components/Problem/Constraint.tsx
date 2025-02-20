import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DescriptionIcon from "@mui/icons-material/Description";

// Define the types for the section props
interface SectionProps {
  title: string;
  items: { name: string; count: number }[]; 
  expandedSections: { [key: string]: boolean }; // Map of section title to its expanded state
  toggleSection: (section: string) => void; // Function to toggle a section's expanded state
}

// Section component
const Section: React.FC<SectionProps> = ({ title, items, expandedSections, toggleSection }) => (
  <div>
    <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow px-4 justify-between">
      {title} ({items.length})
      <KeyboardArrowDownIcon
        className={`cursor-pointer transform transition-transform ${expandedSections[title] ? "rotate-180" : ""}`}
        onClick={() => toggleSection(title)}
      />
    </div>
    {expandedSections[title] && (
      <div className="flex flex-col space-y-2 mt-2">
        {items.map((item, index) => (
          <div key={index} className="flex">
            <div className="bg-[#3049724D] h-[39px] flex items-center px-4 w-[240px] rounded-md">{item.name}</div>
            <div className="bg-[#3049724D] h-[39px] flex items-center px-4 py-2 w-[80px] ml-3 rounded-md justify-center">{item.count}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Define types for the KeywordLimitations component state
interface KeywordLimitationsState {
  expandedSections: {
    [key: string]: boolean;
  };
}

const KeywordLimitations: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<KeywordLimitationsState["expandedSections"]>({
    function: false,
    methods: false,
    classes: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const functionItems = [
    { name: "cout", count: 3 },
    { name: "cin", count: 1 },
    { name: "if", count: 1 },
  ];

  return (
    <div className="flex w-full py-9 gap-8">
      <div className="w-1/2 p-6 rounded-lg shadow-lg">
        <p className="text-white font-medium text-lg pb-2 mb-4 flex items-center gap-2">
          <LightbulbIcon className="w-6 h-6" />
          ข้อจำกัดของคีย์เวิร์ดวิเคราะห์ได้จากโค้ดเฉลย
        </p>
        <div className="space-y-3">
          <Section
            title="Function"
            items={functionItems}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <Section
            title="Methods"
            items={[]}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <Section
            title="Classes"
            items={[]}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>
      </div>

      <div className="w-1/2 p-6 rounded-lg shadow-lg">
        <p className="text-white font-medium text-lg pb-2 mb-4 flex items-center gap-2">
          <DescriptionIcon className="w-6 h-6" />
          ข้อจำกัดของคีย์เวิร์ดที่กำหนด
        </p>
        <div className="space-y-3">
          <Section
            title="Function"
            items={[]}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <Section
            title="Methods"
            items={[]}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
          <Section
            title="Classes"
            items={[]}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>
      </div>
    </div>
  );
};

export default KeywordLimitations;
