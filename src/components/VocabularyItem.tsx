import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiLockAlt } from "react-icons/bi";
import { BiLockOpenAlt } from "react-icons/bi";
import FlipMove from 'react-flip-move';
import { relative } from "path";

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
    <AnimatePresence mode="popLayout">
      {checked ? (
        <motion.div
          key="checked"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>
      ) : (
        <motion.div
          key="unchecked"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 5 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={handleClick}>{word.word}</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VocabularyItem;


