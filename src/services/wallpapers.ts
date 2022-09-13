import { Wallpaper } from '../types/Wallpaper';
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export const getAll = async () => {
    let list: Wallpaper[] = [];

    const imagesFolder = ref(storage, 'Images');
    const wallpaperList = await listAll(imagesFolder);

    for(let i in wallpaperList.items) {
        let WallpaperUrl = await getDownloadURL(wallpaperList.items[i]);

        list.push({
            name: wallpaperList.items[i].name,
            url: WallpaperUrl,
        });
    }

    return list;
}