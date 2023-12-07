import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';

const UserDialog = ({
  show,
  handleCancel,
  handleSubmit,
  formData,
  categories,
  tags,
}) => {
  const [internalData, setInternalData] = useState({ ...formData, tags: [] });

  useEffect(() => {
    setInternalData({ ...internalData, tags: internalData.tags || [] });
  }, [formData]);

  const updateFormData = (newValue, fieldName) => {
    setInternalData({ ...internalData, [fieldName]: newValue });
  };

  const handleInternalSubmit = (e) => {
    e.preventDefault();
    handleSubmit(internalData);
  };

  const handleTagChange = (e, tag) => {
    const checked = e.target.checked;
    let updatedTags = [...internalData.tags];

    if (checked && !updatedTags.includes(tag)) {
      updatedTags.push(tag);
    } else if (!checked && updatedTags.includes(tag)) {
      updatedTags = updatedTags.filter((t) => t !== tag);
    }

    updateFormData(updatedTags, 'tags');
  };
  return (
    <div
      className={
        'fixed inset-0 flex items-center justify-center bg-black/50 ' +
        (!show ? 'hidden' : '')
      }
    >
      {/* finestra dialog */}
      <div className="min-w-96 max-h-screen bg-white shadow-2xl">
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

            <TextInput
              name="description"
              placeholder="Descrizione del post"
              value={internalData.description ?? ''}
              onValueChange={(newValue) =>
                updateFormData(newValue, 'description')
              }
            ></TextInput>

            <TextInput
              name="image"
              placeholder="Immagine del post"
              value={internalData.image ?? ''}
              onValueChange={(newValue) => updateFormData(newValue, 'image')}
            ></TextInput>

            <select
              value={internalData.category}
              onChange={(e) => updateFormData(e.target.value, 'category')}
            >
              <option value="">Seleziona una categoria</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Tags */}
            <div className="flex gap-4">
              {tags.map((tag, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    // checked={internalData.tags.includes(tag)}
                    checked={
                      internalData.tags && internalData.tags.includes(tag)
                    }
                    onChange={(e) => handleTagChange(e, tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>

            <label>
              <input
                type="checkbox"
                checked={internalData.published}
                onChange={(e) => updateFormData(e.target.checked, 'published')}
              />
              Published
            </label>
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
