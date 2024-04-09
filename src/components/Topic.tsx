import React from 'react'

const Topic:React.FC = () => {
  return (
    <div  className='topic-list grid grid-cols-3 gap-6 mb-4'>
    <div className='border rounded-[12px] p-[20px]'>คำศัพท์</div>
    <div className='border rounded-[12px] p-[20px]'>ภาษาไทย</div>
    <div className='border rounded-[12px] p-[20px]'>ภาษาอังกฤษ</div>
    </div>
  )
}

export default Topic