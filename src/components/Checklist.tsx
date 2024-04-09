import React, { useState, useEffect } from "react";
import VocabularyList from "./VocabularyList";
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
      handleAutoRemoveThai();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [thaiWord]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAutoRemoveEng();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [engWord]);

  const handleAutoRemoveThai = () => {
    //ให้มันหา index ที่จะลบออกด้วยการเช็คว่าคำไหนไม่ถูกล็อค
    const thaiWordToRemoveIndex = thaiWord.findIndex((word) => !word.locked);

    // ตรวจสอบว่ามีคำที่ต้องการลบหรือไม่
    if (thaiWordToRemoveIndex !== -1) {
      // ลบคำที่ไม่ได้ถูกล็อคออกจาก state
      setWord((prevWord) => [
        ...prevWord,
        ...(thaiWordToRemoveIndex !== -1 ? [thaiWord[thaiWordToRemoveIndex]]
          : []),
      ]);

      setThaiWord((prevThaiWord) =>
        prevThaiWord.filter(
          (_, index) =>
            index !== thaiWordToRemoveIndex || prevThaiWord[index].locked
        )
      );
    }
  };

  const handleAutoRemoveEng = () => {
    const engWordToRemoveIndex = engWord.findIndex((word) => !word.locked);

    if (engWordToRemoveIndex !== -1) {
      setWord((prevWord) => [
        ...prevWord,
        ...(engWordToRemoveIndex !== -1 ? [engWord[engWordToRemoveIndex]] : []),
      ]);

      setEngWord((prevEngWord) =>
        prevEngWord.filter(
          (_, index) =>
            index !== engWordToRemoveIndex || prevEngWord[index].locked
        )
      );
    }
  };

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
    <div className="vocab-list ">
      <Topic />
      <div className="word-box grid grid-cols-3 gap-6">
        <div className="word-box-i border rounded-[10px] p-[20px]">
          <VocabularyList
            // title="คำศัพท์"
            check={false}
            vocabulary={word}
            onClick={handleClick}
            onLock={handleLockWord}
          />
        </div>

        <div className="word-box-i border rounded-[10px] p-[20px]">
          <VocabularyList
            // title="ภาษาไทย"
            check={true}
            vocabulary={thaiWord}
            onClick={handleResetWord}
            onLock={handleLockWord}
          />
        </div>

        <div className="word-box-i border rounded-[10px] p-[20px]">
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
