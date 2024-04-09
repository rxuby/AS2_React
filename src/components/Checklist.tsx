import React, { useState, useEffect } from "react";
import VocabularyList from "./VocabularyList";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { clearInterval } from "timers";
import Topic from "./Topic";

interface Word {
  lang: string;
  word: string;
  locked: boolean;
}

const Checklist: React.FC = () => {
  const [word, setWord] = useState<Word[]>([]);
  const [thaiWord, setThaiWord] = useState<Word[]>([]);
  const [engWord, setEngWord] = useState<Word[]>([]);

  useEffect(() => {
    getWord();
  }, []);

  //เพิ่มฟังก์ชัน useEffect อีกอันสำหรับ timeRemove
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAutoRemove();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [thaiWord, engWord]);

  const handleAutoRemove = () => {
    setWord((prevWord) => [
      ...prevWord,
      ...thaiWord.filter((word) => !word.locked),
      ...engWord.filter((word) => !word.locked),
    ]);
    setThaiWord(thaiWord.filter((word) => word.locked));
    setEngWord(engWord.filter((word) => word.locked));
  };


  // useEffect(() =>{
  //   const timeoutId = setInterval(() => {
  //     const currentTime = new Date().getTime();
  //     const newSelectedWords: { [key: string]: number } = {};
  //     for (const word in selectedWords) {
  //       const timePressed = selectWords[word];
  //       if ((currentTime - timePressed) <= 5000) {
  //         newSelectedWords[word] = timePressed;
  //       }
  //     }
  //     setSelectedWords(newSelectedWords);
  //   }, 1000);

  //   return () => clearInterval(timeoutId);
  // }, [selectedWords]);

  const getWord = async () => {
    try {
      const response = await fetch("word.json");
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const data = await response.json();

      const wordData: Word[] = data.map((item: any) => ({
        lang: item.lang,
        word: item.word,
        locked: false,
      }));

      setWord(wordData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (index: number) => {
    const clickedWord = word[index];
    if (clickedWord.lang === "TH") {
      setThaiWord((prevThaiWord) => [...prevThaiWord, clickedWord]);
      setWord((prevWord) => prevWord.filter((_, i) => i !== index));
    } else if (clickedWord.lang === "EN") {
      setEngWord((prevEngWord) => [...prevEngWord, clickedWord]);
      setWord((prevWord) => prevWord.filter((_, i) => i !== index));
    }
  };

  const handleResetWord = (index: number, lang: string, locked: boolean) => {
    if (locked) {
      return;
    } else {
      if (lang === "TH") {
        let clickedThaiWord = thaiWord[index];
        setWord((prevWord) => [...prevWord, clickedThaiWord]);
        setThaiWord((prevThaiWord) =>
          prevThaiWord.filter((_, i) => i !== index)
        );
      } else if (lang === "EN") {
        let clickedEngWord = engWord[index];
        setWord((prevWord) => [...prevWord, clickedEngWord]);
        setEngWord((prevEngWord) => prevEngWord.filter((_, i) => i !== index));
      }
    }
  };

  const handleLockWord = (index: number, lang: string) => {
    if (lang === "TH") {
      const lockedThai = thaiWord.map((word) => {
        if (thaiWord[index] === word) {
          return {
            ...word,
            locked: !word.locked,
          };
        }
        return word;
      });
      setThaiWord(lockedThai);
    } else if (lang === "EN") {
      const lockedEng = engWord.map((word) => {
        if (engWord[index] === word) {
          return {
            ...word,
            locked: !word.locked,
          };
        }
        return word;
      });
      setEngWord(lockedEng);
    }
  };

  return (
    <div className="vocab-list">
      <Topic/>
      <div className="grid grid-cols-3 gap-20 mt-6">

      <div className="rounded-[12px] p-[20px]">
        <VocabularyList
          // title="คำศัพท์"
          check={false}
          vocabulary={word}
          onClick={handleClick}
          onLock={handleLockWord}
        />
        </div>

   <div className="rounded-[12px] p-[20px]">
        <VocabularyList
          // title="ภาษาไทย"
          check={true}
          vocabulary={thaiWord}
          onClick={handleResetWord}
          onLock={handleLockWord}
        />
      </div>

      <div className="rounded-[12px] p-[20px]">
        <VocabularyList 
          // title="ภาษาอังกฤษ"
          check={true}
          vocabulary={engWord}
          onClick={handleResetWord}
          onLock={handleLockWord}
        />
        </div>
     
      </div>
    </div>
  );
};

export default Checklist;
