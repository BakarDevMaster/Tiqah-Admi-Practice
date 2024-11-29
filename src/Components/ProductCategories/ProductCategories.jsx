import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

const ProductCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', productsCount: 15, type: 'Product' },
    { id: 2, name: 'Consulting', productsCount: 7, type: 'Service' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleAddEditCategory = (category) => {
    if (currentCategory) {
      // Edit existing category
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? { ...cat, ...category } : cat
      ));
    } else {
      // Add new category
      setCategories([...categories, { 
        id: categories.length + 1, 
        ...category 
      }]);
    }
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const CategoryModal = ({ category, onClose, onSubmit }) => {
    const [name, setName] = useState(category?.name || '');
    const [description, setDescription] = useState(category?.description || '');
    const [type, setType] = useState(category?.type || 'Product');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, description, type });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button 
          onClick={() => {
            setCurrentCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center bg-black text-white px-4 py-2 rounded-md"
        >
          <Plus className="mr-2" size={20} /> Add New Category
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Category Name</th>
            <th className="border p-3 text-center">Number of Products/Services</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="border p-3">{category.name}</td>
              <td className="border p-3 text-center">{category.productsCount}</td>
              <td className="border p-3 text-center">
                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => {
                      setCurrentCategory(category);
                      setIsModalOpen(true);
                    }}
                    className="text-gray-600 hover:text-black"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-600 hover:text-black"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <CategoryModal
          category={currentCategory}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentCategory(null);
          }}
          onSubmit={handleAddEditCategory}
        />
      )}
    </div>
  );
};

export default ProductCategories;