import { Component } from 'react';
import axios from 'axios';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import style from './App.module.css';

const KEY = '33348757-d3bd4442be84b253a20cc414a';

const Status = {
  LOADING: 'loading',
  IDLE: 'idle',
  ERROR: 'error',
  SUCCESS: 'success',
};

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    perPage: 12,
    status: Status.IDLE,
    showModal: false,
    selectedImageId: '',
    totalImages: 0,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    if (!this.state.searchQuery) {
      return;
    }

    try {
      this.setState({ status: Status.LOADING });
      const result = await axios.get(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      );
      this.setState({
        images: [...this.state.images, ...result.data.hits],
        status: Status.SUCCESS,
        totalImages: result.data.totalHits,
      });
    } catch (error) {
      console.error(error);
      this.setState({ status: Status.ERROR });
    }
  };

  handleFormSubmit = search => {
    if (search === this.state.searchQuery) {
      alert(
        'this request has already been processed. Please enter new request'
      );
      return;
    }
    this.setState({ searchQuery: search, images: [], page: 1 });
  };

  changePage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  toggleModal = imageId => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImageId: imageId || '',
    }));
  };

  render() {
    const {
      images,
      status,
      showModal,
      selectedImageId,
      searchQuery,
      totalImages,
    } = this.state;
    const hasImages = !!images.length;
    const hasMoreImages = images.length < totalImages;
    const selectedImage = images.find(image => {
      return image.id === selectedImageId;
    });
    return (
      <div className={style.App}>
        {showModal && selectedImage && (
          <Modal onClose={this.toggleModal} image={selectedImage} />
        )}
        <Searchbar onSubmit={this.handleFormSubmit} searchQuery={searchQuery} />
        <ImageGallery
          images={this.state.images}
          onImageItemClick={this.toggleModal}
        />
        {!hasImages && 'Enter search word'}
        {hasImages && hasMoreImages && status === Status.SUCCESS && (
          <Button onClick={this.changePage} />
        )}
        {status === Status.LOADING && <Loader />}
      </div>
    );
  }
}

// export default App;
