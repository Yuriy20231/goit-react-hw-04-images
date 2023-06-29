import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'api/getSearch';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (search === '') return;
      setLoading(true);
      try {
        const data = await fetchImages(search, page);
        const { hits, totalHits } = data;
        setImages(prevImages => [...prevImages, ...hits]);
        setTotal(totalHits);
        setLoading(false);
        if (hits.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

  const handleSubmit = search => {
    setSearch(search);
    setPage(1);
    setImages([]);
  };

  const clickLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />

      <Searchbar handleSubmit={handleSubmit} />

      {error && (
        <h2 style={{ textAlign: 'center' }}>
          Something went wrong: ({error})!
        </h2>
      )}

      <ImageGallery togleModal={openModal} images={images} />

      {loading && <Loader />}

      {empty && (
        <h2 style={{ textAlign: 'center' }}>
          Sorry. There are no images ... 😭
        </h2>
      )}

      {total / 12 > page && <Button clickLoad={clickLoad} />}

      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
};