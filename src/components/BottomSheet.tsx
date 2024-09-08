import React from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  bgColor?: string;
  title?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children, bgColor, title }) => {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out z-30 ${bgColor ? `bg-[${bgColor}]` : 'bg-[#000000]'} rounded-tl-lg rounded-tr-lg w-[95%] mx-auto overflow-y-scroll mb-[15vh]`}
      style={{ height: '85%' }}
    >
      <div className="h-full p-4 shadow-lg rounded-t-2xl">
        <div className="w-full flex justify-start">
            <div className="w-full flex items-center gap-8">
                <button className="text-white w-[10%]" onClick={onClose}>Close</button>
                {
                  title &&
                  <h1 className="text-[#FFFFFF] w-[90%] w-full text-center font-bold text-xl">{title}</h1>
                }
            </div>
        </div>
        
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
