import { Component } from 'react';
import { CompApp } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import { SearchBar } from './Searchbar/SearchBar';
import { Notify } from 'notiflix';
import { fetchPhoto } from 'api/fetchPhoto';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    totalItems: 0,
    loading: false,
    isModalShow: false,
    modalData: {
      largeImageUrl: '',
      altName: '',
    },
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });

      await fetchPhoto(query, page)
        .then(res => {
          if (res.hits.length === 0) {
            Notify.failure('No images were found for your request');
            return;
          }

          if (prevState.totalItems !== res.total) {
            Notify.success(`We found ${res.total} images`);
          }
          const response = res.hits.map(
            ({ webformatURL, tags, largeImageURL, id }) => {
              return {
                id,
                webformatURL,
                tags,
                largeImageURL,
              };
            }
          );

          this.setState(() => {
            return {
              images: [...images, ...response],
              totalItems: res.total,
            };
          });
        })
        .catch(error => Notify.failure(error.message))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSubmit = query => {
    if (this.state.query !== query) {
      this.setState({ query, images: [], page: 1 });
    }
  };

  toggleModalIsShow = () => {
    this.setState(({ isModalShow }) => ({
      isModalShow: !isModalShow,
    }));
  };

  openModalWindow = newModalData => {
    if (newModalData.largeImageUrl !== this.state.modalData.largeImageUrl) {
      this.setState(() => {
        return {
          modalData: { ...newModalData },
        };
      });
    }
    this.toggleModalIsShow();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, totalItems, page, isModalShow, modalData } =
      this.state;

    const { onSubmit, openModalWindow, handleLoadMore, toggleModalIsShow } =
      this;

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
  }
}
