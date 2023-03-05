import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import style from './App.module.css';

const KEY = '33348757-d3bd4442be84b253a20cc414a';
const itemsPerPage = 12;
const Status = {
  LOADING: 'loading',
  IDLE: 'idle',
  ERROR: 'error',
  SUCCESS: 'success',
};

const App = () => {
  // state = {
  //   searchQuery: '',
  //   images: [],
  //   page: 1,
  //   perPage: 12,
  //   status: Status.IDLE,
  //   showModal: false,
  //   selectedImageId: '',
  //   totalImages: 0,
  // };

  // componentDidMount() {
  //   this.fetchImages();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.searchQuery !== this.state.searchQuery ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.fetchImages();
  //   }
  // }

  // fetchImages = async () => {
  //   if (!this.state.searchQuery) {
  //     return;
  //   }

  //   try {
  //     this.setState({ status: Status.LOADING });
  //     const result = await axios.get(
  //       `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
  //     );
  //     this.setState({
  //       images: [...this.state.images, ...result.data.hits],
  //       status: Status.SUCCESS,
  //       totalImages: result.data.totalHits,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     this.setState({ status: Status.ERROR });
  //   }
  // };

  // handleFormSubmit = search => {
  //   if (search === this.state.searchQuery) {
  //     alert(
  //       'this request has already been processed. Please enter new request'
  //     );
  //     return;
  //   }
  //   this.setState({ searchQuery: search, images: [], page: 1 });
  // };

  // changePage = () => {
  //   this.setState({ page: this.state.page + 1 });
  // };

  // toggleModal = imageId => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //     selectedImageId: imageId || '',
  //   }));
  // };

  // render() {
  //   const {
  //     images,
  //     status,
  //     showModal,
  //     selectedImageId,
  //     searchQuery,
  //     totalImages,
  //   } = this.state;
  //   const hasImages = !!images.length;
  //   const hasMoreImages = images.length < totalImages;
  //   const selectedImage = images.find(image => {
  //     return image.id === selectedImageId;
  //   });
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [selectedImageId, setSelectedImageId] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  const fetchImages = async (search, page = 1) => {
    const result = await axios.get(
      `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
    );
    return { images: result.data.hits, totalImages: result.data.totalHits };
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const saveImages = async () => {
      try {
        setStatus(Status.LOADING);
        const { images: newImages, totalImages: fetchTotalImages } =
          await fetchImages(searchQuery, page);
        setImages(oldImages => [...oldImages, ...newImages]);
        setStatus(Status.SUCCESS);
        setTotalImages(fetchTotalImages);
      } catch (error) {
        alert(error);
        setStatus(Status.ERROR);
      }
    };
    saveImages();
  }, [page, searchQuery]);

  const handleFormSubmit = search => {
    if (search === searchQuery) {
      alert.info(
        'this request has already been processed. Please enter new request'
      );
      return;
    }
    setSearchQuery(search);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = imageId => {
    setSelectedImageId(imageId || '');
  };

  const hasImages = !!images.length;
  const hasMoreImages = images.length < totalImages;
  const selectedImage = images.find(image => {
    return image.id === selectedImageId;
  });

  return (
    <div className={style.App}>
      {selectedImage && <Modal onClose={toggleModal} image={selectedImage} />}
      <Searchbar onSubmit={handleFormSubmit} searchQuery={searchQuery} />
      <ImageGallery images={images} onImageItemClick={toggleModal} />
      {!hasImages && 'Please enter a search word'}
      {hasImages && hasMoreImages && status === Status.SUCCESS && (
        <Button onClick={loadMore} />
      )}
      {status === Status.LOADING && <Loader />}
    </div>
  );
};

export default App;
