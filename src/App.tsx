import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Wallpapers from './services/wallpapers';
import { Wallpaper } from './types/Wallpaper';
import { WallpaperItem } from './components/WallpaperItem';

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

  useEffect(() => {
    const getWallpaper = async () => {
      setLoading(true);
      setWallpapers(await Wallpapers.getAll());
      setLoading(false);
    }
    getWallpaper();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0) {
      setUploading(true);
      let result = await Wallpapers.insert(file);
      setUploading(false);

      if(result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newWallpaperList = [...wallpapers];
        newWallpaperList.push(result);
        setWallpapers(newWallpaperList);
      }
    }
  }

  return (
    <C.Container>
      <C.Area>
        <C.TextBox>
          <C.Header>Wallpaper Gallery</C.Header>
        </C.TextBox>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          {uploading && "Sending..."}
          <input type="submit" value="Send" />
        </C.UploadForm>

        {loading &&
          <C.LoadingInfo>
            <div className='gif'></div>
            <div>Loading...</div>
          </C.LoadingInfo>
        }

        {!loading && wallpapers.length > 0 &&
          <C.WallpaperList>
            {wallpapers.map((item, index) =>(
              <WallpaperItem key={index} url={item.url} name={item.name} />
            ))}
          </C.WallpaperList>
        }

        {!loading && wallpapers.length === 0 &&
          <C.LoadingInfo>
            <div className='emoji'>🕵️</div>
            <div>No registered wallpaper</div>
          </C.LoadingInfo>
        }
      </C.Area>
    </C.Container>
  );
}

export default App