import React, { useEffect, useRef } from "react";
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
  const timeoutId = useRef<NodeJS.Timeout>();
  const handleClick = () => {
    if (!word.locked) {
      onClick(word);
    }
  };

  const handleLock = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    onLock(word);
  };

  useEffect(() => {
    if (!word.locked) {
      timeoutId.current = setTimeout(() => {
        if (checked) {
          handleClick();
        }
      }, 5000);
    }
  
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [checked, word.locked]);
  

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
                <BiLockOpenAlt onClick={handleLock} className="icon" />
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
