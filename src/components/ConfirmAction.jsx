import React, { useState, useEffect } from 'react';

const ConfirmAction = ({
  show,
  title,
  content,
  handleConfirmation,
  handleCancelation,
}) => {
  useEffect(() => {}, [show]);
  return (
    <div>
      <div
        className={
          'fixed inset-0 flex items-center justify-center bg-black/50 ' +
          (!show ? 'hidden' : '')
        }
      >
        {/* finestra dialog */}
        <div className="max-h-screen w-96 bg-white shadow-2xl">
          {/* titolo */}
          <div className="border-b px-4 py-3 text-xl">{title}</div>

          {/* body */}
          <div className="px-4 py-3">{content}</div>

          {/* footer */}
          <div className="flex items-center justify-end gap-4 border-t px-4 py-3">
            <button
              className="bg-red-300 px-4 py-3 hover:bg-red-600"
              onClick={handleCancelation}
            >
              Annulla
            </button>

            <button
              className="bg-green-300 px-4 py-3 hover:bg-green-600"
              onClick={handleConfirmation}
            >
              Si
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
