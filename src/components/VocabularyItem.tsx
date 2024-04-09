import React from "react";
import { IoLockOpenOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";

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
      // ตอนทำTimeRemoveให้เพิ่มตรงนี้เช็คว่าคำศัพท์ถูกล็อคไหมแต่มันจำเป็นไหมอะ ค่อยเช็ค
      onClick(word);
    }
  };

  const handleLock = () => {
    onLock(word);
  };

  return (
    <>
      {checked ? (
        <div>
          <div className="word-list place-content-center">
            <button className="button-word-list text-center place-content-center flex ">
            <span onClick={handleClick}>{word.word} </span>{" "}
            {word.locked ? (
              <IoLockClosedOutline onClick={handleLock} className="ml-auto" />
            ) : (
              // <i className="bi bi-lock" onClick={handleLock}></i>
              <IoLockOpenOutline onClick={handleLock} className="ml-auto" />
              // <i className="bi bi-unlock" onClick={handleLock}></i>
            )}
            </button>
          </div>
        </div>
      ) : (
        <div><button onClick={handleClick}>{word.word}</button></div>
      )}
    </>
  );
};

export default VocabularyItem;
