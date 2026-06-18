import React from 'react';
import SearchComponent from './components/SearchComponent';

// Example data structure for stories
const exampleStories = [
  {
    id: 1,
    title: 'The Dragon\'s Quest',
    author: 'Jane Smith',
    description: 'An epic fantasy adventure following a young hero on a quest to defeat the ancient dragon.',
    genre: 'Fantasy',
    rating: 4.5,
    tags: ['fantasy', 'adventure', 'epic']
  },
  {
    id: 2,
    title: 'Mystery in the Night',
    author: 'John Doe',
    description: 'A thrilling mystery novel where secrets are hidden in every shadow.',
    genre: 'Mystery',
    rating: 4,
    tags: ['mystery', 'thriller', 'suspense']
  },
  {
    id: 3,
    title: 'Love in Paris',
    author: 'Marie Laurent',
    description: 'A romantic tale of two souls finding each other in the city of light.',
    genre: 'Romance',
    rating: 3.8,
    tags: ['romance', 'contemporary', 'love']
  },
  {
    id: 4,
    title: 'Future Worlds',
    author: 'Alex Chen',
    description: 'A science fiction epic exploring the distant future and alien civilizations.',
    genre: 'Science Fiction',
    rating: 4.2,
    tags: ['sci-fi', 'adventure', 'futuristic']
  },
  {
    id: 5,
    title: 'Whispers of the Past',
    author: 'Sarah Williams',
    description: 'A haunting historical fiction about forgotten secrets and family legacy.',
    genre: 'Historical Fiction',
    rating: 4.1,
    tags: ['historical', 'mystery', 'drama']
  },
  {
    id: 6,
    title: 'The Wizard\'s Tower',
    author: 'Jane Smith',
    description: 'A magical fantasy where a young apprentice discovers hidden powers.',
    genre: 'Fantasy',
    rating: 4.3,
    tags: ['fantasy', 'magic', 'coming-of-age']
  }
];

function SearchDemo() {
  const [searchResults, setSearchResults] = React.useState(exampleStories);

  const handleResultsChange = (results) => {
    setSearchResults(results);
    console.log('Search results updated:', results);
  };

  return (
    <div>
      <SearchComponent
        items={exampleStories}
        onResultsChange={handleResultsChange}
        searchType="advanced"
      />
    </div>
  );
}

export default SearchDemo;
