import { useEffect, useState } from 'react';
import { CompApp } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import { SearchBar } from './Searchbar/SearchBar';
import { Notify } from 'notiflix';
import { fetchPhoto } from 'api/fetchPhoto';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    largeImageUrl: '',
    altName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetchPhoto(query, page);

        if (res.hits.length === 0) {
          Notify.failure('No images were found for your request');
          return;
        }

        if (totalItems !== res.total) {
          Notify.success(`We found ${res.total} images`);
        }

        const response = res.hits.map(
          ({ webformatURL, tags, largeImageURL, id }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        setImages(prevImages => [...prevImages, ...response]);
        setTotalItems(res.total);
      } catch (error) {
        Notify.failure(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '' && (page !== 1 || images.length === 0)) {
      fetchData();
    }
  }, [query, page, images.length, totalItems]);

  const onSubmit = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }
  };

  const toggleModalIsShow = () => {
    setIsModalShow(!isModalShow);
  };

  const openModalWindow = newModalData => {
    if (newModalData.largeImageUrl !== modalData.largeImageUrl) {
      setModalData(...newModalData);
    }

    toggleModalIsShow();
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <CompApp>
      <SearchBar onSubmit={onSubmit}></SearchBar>

      <ImageGallery images={images} openModalWindow={openModalWindow} />
      {loading && <Loader />}
      {images.length > 0 && totalItems > page * 12 && !loading && (
        <LoadMoreButton handleClick={handleLoadMore} />
      )}

      {isModalShow && (
        <Modal modalData={modalData} onClose={toggleModalIsShow} />
      )}
    </CompApp>
  );
};
