import React from 'react'
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
                                      //({ title, vocabulary, onClick, check,onLock }) 
const VocabularyList: React.FC<Props> = ({ vocabulary, onClick, check,onLock }) => {
    return (
      <div className='cursor-pointer'>
        {/* <h2>{title}</h2> */}
        {vocabulary.map((word, index) => (
          <VocabularyItem
            key={index}
            word={word}
            checked={check}
            onClick={() => onClick(index, word.lang, word.locked )}
            onLock={() => onLock(index,word.lang, word.locked )}
          />
        ))}
      </div>
    );
}

export default VocabularyList

