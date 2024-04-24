import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call the Unsplash API to fetch a random image
      const unsplashResponse = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            client_id: 'nik7Z7zpoAzffIzs6xO7DoyFXb5PgrHoyuEKBF-OIPU',
            query: textInput,
          },
        }
      );

      const imageUrl = unsplashResponse.data.urls.regular;

      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
      setError('Error fetching image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Image Generation App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter text..."
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Fetch Image'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {generatedImage && (
        <div>
          <h2>Generated Image</h2>
          <img src={generatedImage} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default App;
