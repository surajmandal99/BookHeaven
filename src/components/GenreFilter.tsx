import React from 'react';

interface GenreFilterProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  genres: string[];
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onSelectGenre, genres }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectGenre('All')}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedGenre === 'All'
              ? 'bg-blue-900 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Books
        </button>
        
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedGenre === genre
                ? 'bg-blue-900 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;