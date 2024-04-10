import React from "react";
import { BiLockAlt } from "react-icons/bi";
import { BiLockOpenAlt } from "react-icons/bi";

interface Props {
  checked: boolean;
  word: {
    word: string;
    locked?: boolean;
  };
  onClick: (word: { word: string; locked?: boolean }) => void;
  onLock: (word: { word: string; locked?: boolean }) => void;
}

const VocabularyItem: React.FC<Props> = ({
  word,
  onClick,
  checked,
  onLock,
}) => {
  const handleClick = () => {
    if (!word.locked) {
      // ตอนทำTimeRemoveให้เพิ่มตรงนี้เช็คว่าคำศัพท์ถูกล็อคไหมแต่มันจำเป็นไหม
      onClick(word);
    }
  };

  const handleLock = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    onLock(word);
  };

  return (
    <>
      {checked ? (
        <div>
          <div onClick={handleClick} className="word-list">
            <button className="button-word-list">
              <span>{word.word} </span>{" "}
              {word.locked ? (
                <BiLockAlt onClick={handleLock} className="icon" />
              ) : (
                // <i className="bi bi-lock" onClick={handleLock}></i>
                <BiLockOpenAlt onClick={handleLock} className="icon" />
                // <i className="bi bi-unlock" onClick={handleLock}></i>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={handleClick}>{word.word}</button>
        </div>
      )}
    </>
  );
};

export default VocabularyItem;
