import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import VocabularyItem from "./VocabularyItem";

interface Props {
  title?: string;
  check: boolean;
  vocabulary: {
    word: string;
    lang: string;
    locked: boolean;
  }[];
  onClick: (index: number, lang: string, locked: boolean) => void;
  onLock: (index: number, lang: string, locked: boolean) => void;
}
const VocabularyList: React.FC<Props> = ({
  vocabulary,
  onClick,
  check,
  onLock,
}) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{ type: "spring"   }}
      >
        <div className="cursor-pointer">
          {vocabulary.map((word, index) => (
            <VocabularyItem
              key={word.word}
              word={word}
              checked={check}
              onClick={() => onClick(index, word.lang, word.locked)}
              onLock={() => onLock(index, word.lang, word.locked)}
            />
          ))}
        </div>
        </motion.div>

    </AnimatePresence>
  );
};

export default VocabularyList;
