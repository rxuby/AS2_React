// import React from "react";

// interface Props {
//     checked: boolean;
//     word: {
//         word: string;
//         locked?: boolean;
//     };
//     onClick: (
//         word:{
//             word: string;
//             locked?: boolean
//         }
//     ) => void;

//     onLock: (  word:{
//             word: string;
//             locked?: boolean
//         }) => void;
// }

// const VocabularyItem: React.FC<Props> = ({
//   word,
//   onClick,
//   checked,
//   onLock,
// }) => {
//   const handleClick = () => {
//     onClick(word);
//   };

//   const handleLock = () => {
//     onLock(word);
//   }

//   return (
//     //   <div onClick={handleClick}>
//     //     {word.word} {word.locked && <span>icon</span>}
//     //     <i className="bi bi-unlock"></i>
//     //   </div>
//     <>
//       {checked ? (
//         <div>
//           {" "}
//           <span onClick={handleClick}>{word.word} </span>{" "}
//           <div>
//             {word.locked ? (
//               <i
//                 className="bi bi-lock"
//                 onClick={handleLock}
//               ></i>
//             ) : (
//               <i
//                 className="bi bi-unlock"
//                 onClick={handleLock}
//               ></i>
//             )}
//           </div>
//           {/* <i className={'bi ${isLocked "bi bi-lock" : "bi bi-unlock"}'}></i> */}
//         </div>
//       ) : (
//         <div onClick={handleClick}>{word.word}</div>
//       )}
//     </>
//   );
// };

// export default VocabularyItem


import React from "react";

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
      // ตอนทำTimeRemoveให้เพิ่มตรงนี้เช็คว่าคำศัพท์ถูกล็อคไหม
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
          {" "}
          <span onClick={handleClick}>{word.word} </span>{" "}
          <div>
            {word.locked ? (
              <i className="bi bi-lock" onClick={handleLock}></i>
            ) : (
              <i className="bi bi-unlock" onClick={handleLock}></i>
            )}
          </div>
        </div>
      ) : (
        <div onClick={handleClick}>{word.word}</div>
      )}
    </>
  );
};

export default VocabularyItem;
