import React from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 transform ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      } transition-transform duration-300 ease-in-out z-50 bg-[#000000]/80 rounded-tl-lg rounded-tr-lg w-[95%] mx-auto overflow-y-scroll`}
      style={{ height: '85vh' }}
    >
      <div className="h-full p-4 shadow-lg rounded-t-2xl">
        <div className="w-full flex justify-end">
            <div className="w-auto flex justify-end">
                <button className="text-white" onClick={onClose}>Close</button>
            </div>
        </div>
        
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
