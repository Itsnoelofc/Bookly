/**
 * Search Algorithm for Bookly
 * Provides multiple search strategies for finding stories, authors, and content
 */

/**
 * Basic search - finds exact or partial matches
 * @param {Array} items - Array of items to search through (stories, authors, etc)
 * @param {String} query - Search query
 * @param {Array} fields - Fields to search in (e.g., ['title', 'author', 'description'])
 * @returns {Array} Matching items
 */
export const basicSearch = (items, query, fields) => {
  if (!query || query.trim() === '') return items;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return items.filter(item => 
    fields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(lowerQuery);
    })
  );
};

/**
 * Fuzzy search - finds matches even with typos or partial words
 * @param {Array} items - Array of items to search through
 * @param {String} query - Search query
 * @param {Array} fields - Fields to search in
 * @returns {Array} Matching items sorted by relevance
 */
export const fuzzySearch = (items, query, fields) => {
  if (!query || query.trim() === '') return items;
  
  const lowerQuery = query.toLowerCase().trim();
  
  // Create a regex pattern that matches characters in sequence
  const pattern = lowerQuery.split('').join('.*?');
  const regex = new RegExp(pattern, 'i');
  
  return items
    .filter(item =>
      fields.some(field => {
        const value = item[field];
        return value && regex.test(value.toString());
      })
    )
    .sort((a, b) => {
      // Score based on position in string (earlier matches rank higher)
      let scoreA = Infinity;
      let scoreB = Infinity;
      
      fields.forEach(field => {
        const valueA = a[field] ? a[field].toString().toLowerCase() : '';
        const valueB = b[field] ? b[field].toString().toLowerCase() : '';
        
        const indexA = valueA.indexOf(lowerQuery);
        const indexB = valueB.indexOf(lowerQuery);
        
        if (indexA !== -1) scoreA = Math.min(scoreA, indexA);
        if (indexB !== -1) scoreB = Math.min(scoreB, indexB);
      });
      
      return scoreA - scoreB;
    });
};

/**
 * Multi-field weighted search
 * @param {Array} items - Array of items to search through
 * @param {String} query - Search query
 * @param {Object} fieldWeights - Object with fields as keys and weights as values
 *                                e.g., { title: 3, author: 2, description: 1 }
 * @returns {Array} Matching items sorted by relevance score
 */
export const weightedSearch = (items, query, fieldWeights) => {
  if (!query || query.trim() === '') return items;
  
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);
  
  return items
    .map(item => {
      let score = 0;
      
      Object.entries(fieldWeights).forEach(([field, weight]) => {
        const value = item[field] ? item[field].toString().toLowerCase() : '';
        
        queryWords.forEach(word => {
          if (value.includes(word)) {
            // Exact word match scores higher
            score += weight * 2;
          } else if (word.length > 2 && value.includes(word)) {
            // Partial match
            score += weight;
          }
        });
        
        // Bonus for position in string
        if (value.startsWith(lowerQuery)) {
          score += weight * 3;
        }
      });
      
      return { ...item, relevanceScore: score };
    })
    .filter(item => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
};

/**
 * Tag-based search
 * @param {Array} items - Array of items with tags
 * @param {Array} tags - Array of tags to search for
 * @param {Boolean} matchAll - If true, item must have all tags; if false, at least one
 * @returns {Array} Matching items
 */
export const tagSearch = (items, tags, matchAll = false) => {
  if (!tags || tags.length === 0) return items;
  
  const normalizedTags = tags.map(tag => tag.toLowerCase());
  
  if (matchAll) {
    return items.filter(item =>
      normalizedTags.every(tag =>
        item.tags && item.tags.map(t => t.toLowerCase()).includes(tag)
      )
    );
  } else {
    return items.filter(item =>
      item.tags && item.tags.some(itemTag =>
        normalizedTags.includes(itemTag.toLowerCase())
      )
    );
  }
};

/**
 * Combined advanced search with filters
 * @param {Array} items - Array of items to search through
 * @param {Object} options - Search options
 *   - query: string (text search)
 *   - fields: array (fields to search)
 *   - tags: array (tags to filter by)
 *   - author: string (filter by author)
 *   - minRating: number (minimum rating)
 *   - maxResults: number (limit results)
 * @returns {Array} Filtered and sorted results
 */
export const advancedSearch = (items, options = {}) => {
  let results = [...items];
  
  // Text search
  if (options.query && options.fields) {
    results = weightedSearch(results, options.query, 
      options.fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    );
  }
  
  // Tag filter
  if (options.tags && options.tags.length > 0) {
    results = results.filter(item =>
      options.tags.some(tag =>
        item.tags && item.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
      )
    );
  }
  
  // Author filter
  if (options.author) {
    results = results.filter(item =>
      item.author && item.author.toLowerCase() === options.author.toLowerCase()
    );
  }
  
  // Rating filter
  if (options.minRating) {
    results = results.filter(item => item.rating >= options.minRating);
  }
  
  // Limit results
  if (options.maxResults) {
    results = results.slice(0, options.maxResults);
  }
  
  return results;
};

/**
 * Search with autocomplete suggestions
 * @param {Array} items - Array of items
 * @param {String} query - Partial search query
 * @param {Array} fields - Fields to generate suggestions from
 * @param {Number} limit - Maximum number of suggestions
 * @returns {Array} Array of unique suggestion strings
 */
export const autocompleteSuggestions = (items, query, fields, limit = 5) => {
  if (!query || query.trim() === '') return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const suggestions = new Set();
  
  items.forEach(item => {
    fields.forEach(field => {
      const value = item[field] ? item[field].toString() : '';
      const words = value.split(/\s+/);
      
      words.forEach(word => {
        if (word.toLowerCase().startsWith(lowerQuery)) {
          suggestions.add(word);
        }
      });
    });
  });
  
  return Array.from(suggestions).slice(0, limit);
};

export default {
  basicSearch,
  fuzzySearch,
  weightedSearch,
  tagSearch,
  advancedSearch,
  autocompleteSuggestions
};
