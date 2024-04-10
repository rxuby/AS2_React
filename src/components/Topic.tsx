import React from "react";

const Topic: React.FC = () => {
  return (
    <div className="topic-list grid grid-cols-3 gap-3 mb-4 text-xl font-normal">
      <div className="top-i border rounded-[10px] p-[15px]">คำศัพท์</div>
      <div className="top-i border rounded-[10px] p-[15px]">ภาษาไทย</div>
      <div className="top-i border rounded-[10px] p-[15px]">ภาษาอังกฤษ</div>
    </div>
  );
};

export default Topic;
