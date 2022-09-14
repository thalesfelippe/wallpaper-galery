import { Wallpaper } from '../types/Wallpaper';
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as createId } from 'uuid';

export const getAll = async () => {
    let list: Wallpaper[] = [];

    const imagesFolder = ref(storage, 'images');
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

export const insert = async (file: File) => {
    if(['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `images/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let wallpaperUrl = await getDownloadURL(upload.ref);
        
        return { name: upload.ref.name, url: wallpaperUrl } as Wallpaper;

    } else {
        return new Error('file type not allowed.');
    }
}