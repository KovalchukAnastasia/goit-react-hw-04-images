// Your API key: 30710518-a576e6666e1a547e2e14daa9e
import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '30710518-a576e6666e1a547e2e14daa9e';
const PARAMS = 'image_type=photo&orientation=horizontal&per_page=12';

export const fetchImagesWithQuery = async (searchQuery, page = 1) => {
  const response = axios.get(
    `${URL}?q=${searchQuery}&page=${page}&key=${KEY}&${PARAMS}`
  );
  return response;
};
