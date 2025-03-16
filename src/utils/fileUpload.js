import { Upload } from 'services/core';

/**
 * Uploads a file to the server
 * @param {File} file - The file to upload
 * @returns {Promise<Object>} - The uploaded file object from the server
 */
export const uploadFileToServer = async (file) => {
  if (!file) {
    throw new Error('No file provided for upload');
  }
  
  // If the file is already uploaded (has an id and url from server), return it
  if (file.id && (file.url?.startsWith('http') || file.url?.startsWith('/'))) {
    console.log('File already uploaded:', file.name || 'unknown');
    return file;
  }
  
  const formData = new FormData();
  formData.append('files', file.originalFile || file);
  
  try {
    console.log('Uploading file to server:', file.name || 'unknown');
    const response = await Upload(formData);
    
    if (!response || !response.length) {
      throw new Error('File upload failed - empty response');
    }
    
    const uploadedFile = response[0];
    console.log('File uploaded successfully:', uploadedFile);
    
    // Return a normalized file object
    return {
      id: uploadedFile.id,
      name: file.name || uploadedFile.name,
      size: file.size || uploadedFile.size,
      url: uploadedFile.url,
      type: file.type || uploadedFile.mime
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Uploads multiple files to the server
 * @param {Array<File>} files - The files to upload
 * @returns {Promise<Array<Object>>} - The uploaded file objects from the server
 */
export const uploadFilesToServer = async (files) => {
  if (!files || !files.length) {
    return [];
  }
  
  const uploadPromises = files.map(file => uploadFileToServer(file));
  return Promise.all(uploadPromises);
}; 