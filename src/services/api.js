import axios from 'axios';

const postURL = process.env.REACT_APP_POST_URL;
const getURL = process.env.REACT_APP_GET_URL;
const putURL = process.env.REACT_APP_PUT_URL;
const deleteURL = process.env.REACT_APP_DELETE_URL;

// In your api.js file
export const createMedia = async (formData) => {
    try {
      // Extract file from FormData
      const file = formData.get('file');
      const name = formData.get('name');
      const description = formData.get('description');
      const category = formData.get('category');
      
      // If there's a file, convert it to base64
      let fileBase64 = null;
      if (file) {
        fileBase64 = await convertFileToBase64(file);
      }
      
      // Create a JSON object instead of FormData
      const payload = {
        name: name,
        description: description,
        category: category,
        fileContent: fileBase64,
        fileName: file ? file.name : null,
        fileType: file ? file.type : null
      };
      
      // Send as JSON instead of FormData
      return await axios.post(postURL, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };
  
  // Helper function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };
  
  export const fetchMedia = async () => {
    try {
      const response = await axios.get(getURL);
      console.log('Raw API response:', response);
      
      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        return { data: response.data };
      } 
      // If it's an object with a data property that's an array
      else if (response.data && Array.isArray(response.data.Documents)) {
        return { data: response.data.Documents };
      }
      // If it's any other structure
      else {
        console.warn('Unexpected data structure:', response.data);
        // Try to find an array in the response
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            return { data: response.data[key] };
          }
        }
        // Return empty array as fallback
        return { data: [] };
      }
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

export const updateMedia = async (data) => {
  try {
    return await axios.put(putURL, data);
  } catch (error) {
    console.error('Error updating media:', error);
    throw error;
  }
};

export const deleteMedia = async (id) => {
  try {
    return await axios.delete(`${deleteURL}?id=${id}`);
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};

