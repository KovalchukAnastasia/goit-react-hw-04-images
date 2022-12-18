import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import * as API from './Api';
import { AppStyle } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImgLink, setLargeImgLink] = useState(null);
  const [imgAlt, setImgAlt] = useState(null);
  const [imgOnRequest, setImgOnRequest] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setIsLoading(true);

    async function addImages() {
      try {
        const response = await API.fetchImagesWithQuery(searchQuery, page);
        const { hits, total } = response.data;
        if (hits.length === 0) {
          toast.success('Enter a request!');
          setTotalImages(0);
          return;
        }
        const imagesData = hits.map(image => {
          return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          };
        });
        if (page === 1) {
          setSearchQuery(searchQuery);
          setImages(imagesData);
          setTotalImages(total);
          setImgOnRequest(hits.length);
        } else {
          setImages(prevImages => [...prevImages, ...imagesData]);
          setImgOnRequest(
            prevImgOnRequest => prevImgOnRequest + imagesData.length
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [page, searchQuery]);

  const getSearchName = query => {
    setSearchQuery(query);
    setPage(1);
    setImgOnRequest(0);
    setImages([]);
  };

  const onImageClick = event => {
    const { name, alt } = event.target;
    setLargeImgLink(name);
    setImgAlt(alt);
  };

  const onCloseModal = () => {
    setLargeImgLink(null);
    setImgAlt(null);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyle>
      {error && <h2>Try reloading the page!</h2>}
      <Searchbar onSubmit={getSearchName} />
      {images.length > 0 && (
        <ImageGallery items={images} onImgClick={onImageClick} />
      )}
      {largeImgLink && (
        <Modal alt={imgAlt} url={largeImgLink} closeModal={onCloseModal} />
      )}
      {imgOnRequest >= 12 && imgOnRequest < totalImages && !isLoading && (
        <Button onClick={onLoadMoreClick} />
      )}
      {isLoading && <Loader></Loader>}
      {imgOnRequest > 1 && imgOnRequest === totalImages && <Loader></Loader>}
      <Toaster />
      <GlobalStyle />
    </AppStyle>
  );
}
