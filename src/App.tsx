import { useState, useEffect } from 'react'
import SearchBar from './components/searchBar/SearchBar'
import ImageGallery from './components/imageGallery/ImageGallery'
import ImageModal from './components/ImageModal/ImageModal'
import Loader from './components/loader/Loader'
import LoadMoreBtn from './components/loadMoreBtn/LoadMoreBtn'
import { ImgProps, Response } from './types'
import { FetchImages } from "./articles-api"
import './App.css'

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [images, setImages] = useState<ImgProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [imgId, setImgId] = useState<number | null>(null);

  const modImg = images.find((img) => img.id === imgId)?.urls.regular;

  const handleImgId = (id: number): void => {
    setImgId(id);
  };

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
    setImgId(null);
  };

  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      setTotal(0);
      return;
    }
    async function getImages(): Promise<void> {
      try {
        setError(false);
        setLoading(true);
        const { result, total }: Response = await FetchImages(query, page);
        setTotal(total);
        setImages((prevImages) => [...prevImages, ...result]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [page, query]);
  
  return (
    <>
      <ImageModal openModal={openModal} CloseModal={handleCloseModal} id={modImg} />
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {error && console.log("Something went wrong")}
      {images.length > 0 && <ImageGallery data={images} onClick={handleOpenModal} onId={handleImgId} />}
      {!isLoading && images.length < (total || 0) && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}
 

export default App
