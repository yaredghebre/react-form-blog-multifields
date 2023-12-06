import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import UserDialog from './UserDialog';
import ConfirmAction from './ConfirmAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Main = () => {
  const categories = ['Travel', 'Business', 'Sport', 'Food', 'Education'];
  const tags = [
    'fun',
    'friends',
    'summer',
    'enjoy',
    'react',
    'sevabbe',
    'stucazz',
    'direibastacosì',
  ];

  const initialInput = {
    title: '',
    description: '',
    image: '',
    category: [],
    tags: [],
    published: false,
  };
  const [postsList, setPostsList] = useState([]);
  const [formData, setFormData] = useState(initialInput);
  const [editingPost, setEditingPost] = useState(null);
  const [confirmProps, setConfirmProps] = useState({
    show: false,
  });

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPostsList(JSON.parse(savedPosts));
    }
  }, []);

  const updateFormData = (newValue, inputField) => {
    setFormData((prevData) => ({ ...prevData, [inputField]: newValue }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.title) {
      const newPost = {
        id: crypto.randomUUID(),
        title: formData.title,
        description: formData.description,
        image: formData.image,
        category: formData.category,
        tags: [...formData.tags],
        published: formData.published,
      };

      setPostsList((prevPostsList) => {
        const newPostsList = [...prevPostsList, newPost];
        localStorage.setItem('posts', JSON.stringify(newPostsList));
        return newPostsList;
      });

      setFormData(initialInput);
    }
  };

  const handleFormReset = (e) => {
    setEditingPost('');
    setFormData(initialInput);
  };

  const deletePost = (deleteId) => {
    const post = postsList.find((post) => post.id === deleteId);
    setConfirmProps({
      show: true,
      content: `Stai per eliminare per sempre il post ${post.title}. Confermi?`,
      handleConfirmation: () => {
        setPostsList((prevPostsList) => {
          const updatedPosts = prevPostsList.filter(
            (post) => post.id !== deleteId,
          );
          localStorage.setItem('posts', JSON.stringify(updatedPosts));
          return updatedPosts;
        });
        setConfirmProps({ show: false });
      },
      handleCancelation: () => {
        setConfirmProps({ show: false });
      },
    });
  };

  const editPost = (idToEdit) => {
    const post = postsList.find((post) => post.id === idToEdit);

    if (!post) {
      return;
    }

    setEditingPost(idToEdit);

    setFormData({
      title: post.title,
      description: post.description,
      image: post.image,
      category: post.category,
      tags: [...formData.tags],
      published: post.published,
    });
  };

  const handleEditDialogSubmit = (newData) => {
    const post = postsList.find((post) => post.id === editingPost);
    setConfirmProps({
      show: true,
      title: 'Conferma Aggiornamento',
      content: `Stai per aggiornare il post ${post.title}. Confermi?`,
      handleConfirmation: () => {
        const newPostsList = postsList.map((post) => {
          if (post.id === editingPost) {
            return {
              ...post,
              ...newData,
            };
          }

          return post;
        });
        setPostsList(newPostsList);
        setEditingPost(null);
        setConfirmProps({ show: false });
      },
      handleCancelation: () => {
        setConfirmProps({ show: false });
      },
    });
  };

  const handleTagChange = (e, tag) => {
    const checked = e.target.checked;
    let updatedTags = [...formData.tags];

    if (checked && !updatedTags.includes(tag)) {
      updatedTags.push(tag);
    } else if (!checked && updatedTags.includes(tag)) {
      updatedTags = updatedTags.filter((t) => t !== tag);
    }

    updateFormData(updatedTags, 'tags');
  };

  return (
    <div>
      <main className="min-h-screen bg-gray-300 py-20">
        <div className="container mx-auto w-1/2 rounded-lg border-4 border-green-600 bg-green-300 p-7">
          {/* Form Body */}
          <form
            className="flex flex-col gap-5"
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
          >
            {/* title */}
            <TextInput
              name="title"
              placeholder="Titolo del Post"
              value={formData.title}
              onValueChange={(newValue) => updateFormData(newValue, 'title')}
            ></TextInput>

            {/* description */}
            <TextInput
              name="description"
              placeholder="Descrizione"
              value={formData.description}
              onValueChange={(newValue) =>
                updateFormData(newValue, 'description')
              }
            ></TextInput>

            {/* image */}
            <TextInput
              name="image"
              placeholder="URL Immagine"
              value={formData.image}
              onValueChange={(newValue) => updateFormData(newValue, 'image')}
            ></TextInput>

            {/* published */}
            <TextInput
              name="published"
              label="Published"
              type="checkbox"
              value={formData.published}
              onValueChange={(newValue) =>
                updateFormData(newValue, 'published')
              }
            ></TextInput>

            {/* category */}
            <select
              value={formData.category}
              onChange={(e) => updateFormData(e.target.value, 'category')}
            >
              <option value="">Seleziona una categoria</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* tags */}
            <div className="flex gap-4">
              {tags.map((tag, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag)}
                    onChange={(e) => handleTagChange(e, tag)}
                  />

                  {tag}
                </label>
              ))}
            </div>

            {/* Form Buttons */}
            <div className="mt-5 flex gap-6">
              <button
                className="rounded-lg border-2 bg-green-400 px-4 py-3 hover:bg-green-600"
                type="submit"
              >
                Salva
              </button>

              <button
                className="rounded-lg border-2 bg-red-400 px-4 py-3 hover:bg-red-600"
                type="reset"
              >
                Annulla
              </button>
            </div>
          </form>

          {/* Posts List Outcome */}
          <div className="mt-5">
            <ul>
              {postsList.map((post) => (
                <li
                  key={post.id}
                  className="flex w-full justify-between border-b-2 border-gray-900 px-2 py-4 text-2xl font-bold"
                >
                  <div>
                    <p>
                      <span className="text-red-500">Title:</span> {post.title}
                    </p>
                    <p>
                      <span className="text-red-500">Description:</span>{' '}
                      {post.description}
                    </p>
                    <p>
                      <span className="text-red-500">Image:</span> {post.image}
                    </p>
                    <p>
                      <span className="text-red-500">Category:</span>{' '}
                      {post.category}
                    </p>
                    <p>
                      <span className="text-red-500">Tags:</span>{' '}
                      {post.tags.map((tag, index) => (
                        <span key={index}>{tag}, </span>
                      ))}
                    </p>
                    <p>
                      <span className="text-red-500">Published:</span>{' '}
                      {post.published ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="duration-150 hover:scale-125">
                      <EditIcon
                        fontSize="large"
                        className="text-blue-500"
                        onClick={() => editPost(post.id)}
                      />
                    </button>
                    <button className="duration-150 hover:scale-125">
                      <DeleteIcon
                        fontSize="large"
                        className="text-red-500"
                        onClick={() => deletePost(post.id)}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <UserDialog
          show={!!editingPost}
          handleCancel={() => setEditingPost(null)}
          handleSubmit={handleEditDialogSubmit}
          formData={postsList.find((post) => post.id === editingPost)}
          categories={categories}
          tags={tags}
        ></UserDialog>

        <ConfirmAction {...confirmProps}></ConfirmAction>
      </main>
    </div>
  );
};

export default Main;
