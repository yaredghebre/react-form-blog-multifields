import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';

const UserDialog = ({ show, handleCancel, handleSubmit, formData }) => {
  const [internalData, setInternalData] = useState({ ...formData });

  useEffect(() => {
    setInternalData({ ...formData });
  }, [formData]);

  const updateFormData = (newValue, fieldName) => {
    setInternalData({ ...internalData, [fieldName]: newValue });
  };

  const handleInternalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(internalData);
  };
  return (
    <div
      className={
        'fixed inset-0 flex items-center justify-center bg-black/50 ' +
        (!show ? 'hidden' : '')
      }
    >
      {/* finestra dialog */}
      <div className="max-h-screen w-96 bg-white shadow-2xl">
        {/* titolo */}
        <div className="border-b px-4 py-3 text-xl">Modifica Post</div>

        {/* body */}
        <div className="px-4 py-3">
          <form
            className="mx-auto flex flex-col gap-4 py-8"
            id="user-post-form"
            onSubmit={handleInternalSubmit}
            onReset={() => handleCancel()}
          >
            <TextInput
              name="title"
              placeholder="Titolo del post"
              value={internalData.title ?? ''}
              onValueChange={(newValue) => updateFormData(newValue, 'title')}
            ></TextInput>
          </form>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-4 border-t px-4 py-3">
          <button
            className="bg-red-300 px-4 py-3 hover:bg-red-600"
            type="reset"
            form="user-post-form"
          >
            Annulla
          </button>

          <button
            className="bg-green-300 px-4 py-3 hover:bg-green-600"
            type="submit"
            form="user-post-form"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDialog;
