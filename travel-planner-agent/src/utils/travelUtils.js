/**
 * Travel utility functions
 */

/**
 * Calculate trip duration in days
 * @param {String} startDate - Start date (YYYY-MM-DD)
 * @param {String} endDate - End date (YYYY-MM-DD)
 * @returns {Number} Number of days
 */
export const calculateTripDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return duration > 0 ? duration : 0;
};

/**
 * Estimate budget per day
 * @param {Number} totalBudget - Total budget
 * @param {Number} days - Number of days
 * @returns {Number} Daily budget
 */
export const calculateDailyBudget = (totalBudget, days) => {
  return days > 0 ? totalBudget / days : 0;
};

/**
 * Format currency value
 * @param {Number} amount - Amount
 * @param {String} currency - Currency code (USD, EUR, etc.)
 * @returns {String} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  });
  return formatter.format(amount);
};

/**
 * Validate date format
 * @param {String} dateString - Date string
 * @returns {Boolean} True if valid ISO date
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Get distance between two coordinates
 * @param {Number} lat1 - Latitude 1
 * @param {Number} lon1 - Longitude 1
 * @param {Number} lat2 - Latitude 2
 * @param {Number} lon2 - Longitude 2
 * @returns {Number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Format trip summary
 * @param {Object} trip - Trip data
 * @returns {String} Formatted trip summary
 */
export const formatTripSummary = (trip) => {
  return `
    Destination: ${trip.destination}
    Duration: ${trip.duration} days
    Budget: $${trip.budget}
    Travelers: ${trip.travelers}
    Dates: ${trip.startDate} to ${trip.endDate}
  `;
};

/**
 * Rate accommodation based on criteria
 * @param {Object} accommodation - Accommodation data
 * @returns {Number} Rating score (0-5)
 */
export const rateAccommodation = (accommodation) => {
  let score = 0;
  
  // Base rating from reviews
  score += (accommodation.rating || 0) * 0.4;
  
  // Amenities bonus
  const amenitiesCount = accommodation.amenities?.length || 0;
  score += Math.min(amenitiesCount / 10, 1) * 1.5;
  
  // Price value bonus (lower prices get higher scores)
  if (accommodation.pricePerNight < 50) score += 0.5;
  else if (accommodation.pricePerNight < 100) score += 0.25;
  
  return Math.min(score, 5);
};

/**
 * Filter attractions by category
 * @param {Array} attractions - List of attractions
 * @param {String} category - Category to filter by
 * @returns {Array} Filtered attractions
 */
export const filterAttractionsByCategory = (attractions, category) => {
  return attractions.filter(attr => attr.type?.toLowerCase() === category.toLowerCase());
};

/**
 * Sort attractions by rating
 * @param {Array} attractions - List of attractions
 * @param {Boolean} descending - Sort descending?
 * @returns {Array} Sorted attractions
 */
export const sortAttractionsByRating = (attractions, descending = true) => {
  return [...attractions].sort((a, b) => {
    const ratingDiff = b.rating - a.rating;
    return descending ? ratingDiff : -ratingDiff;
  });
};

/**
 * Estimate CO2 emissions for flight
 * @param {Number} distance - Distance in kilometers
 * @param {Number} passengers - Number of passengers
 * @returns {Number} CO2 in kilograms
 */
export const estimateFlightEmissions = (distance, passengers = 1) => {
  // Average: 0.09 kg CO2 per km per passenger
  return distance * 0.09 * passengers;
};

/**
 * Build accessibility summary
 * @param {Object} destination - Destination details
 * @returns {Object} Accessibility info
 */
export const getAccessibilityInfo = (destination) => {
  return {
    wheelchair_accessible: true,
    public_transport: true,
    taxi_available: true,
    assistance_services: 'Available',
    notes: 'Check specific attractions for detailed accessibility information'
  };
};
