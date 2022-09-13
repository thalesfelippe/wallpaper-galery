import { useState, useEffect } from 'react';
import * as C from './App.styles';
import * as Wallpapers from './services/wallpapers';
import { Wallpaper } from './types/Wallpaper';

const App = () => {
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

  return (
    <C.Container>
      <C.Area>
        <C.TextBox>
          <C.Header>Wallpaper Gallery</C.Header>
        </C.TextBox>

        {loading &&
          <C.LoadingInfo>
            <div className='gif'></div>
            <div>Loading...</div>
          </C.LoadingInfo>
        }

        {!loading && wallpapers.length > 0 &&
          <C.WallpaperList>
            {wallpapers.map((item, index) =>(
              <div>{item.name}</div>
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