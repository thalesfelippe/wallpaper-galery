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
      </C.Area>
    </C.Container>
  );
}

export default App