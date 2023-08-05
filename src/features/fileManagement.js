import firebase from 'firebase/compat/app'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    listAll,
    list,
    uploadBytes,
    getMetadata,
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyD9Fo5y8qhokjfJ_t4Gc0Gd4DXwDC_V2tM',
    authDomain: 'capstone-project-34253.firebaseapp.com',
    databaseURL:
        'https://capstone-project-34253-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'capstone-project-34253',
    storageBucket: 'capstone-project-34253.appspot.com',
    messagingSenderId: '342570414778',
    appId: '1:342570414778:web:6f43802265129593d88883',
    measurementId: 'G-0LG2E3HGPQ',
}

// Initialize Firebase
let firebaseApp
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
    firebaseApp = firebase.app()
}

const storage = getStorage(firebaseApp)

export const uploadFile = async (file, folderName, file_type) => {
    return new Promise(function (resolve, reject) {
        console.log(file.type)
        const metadata = {
            contentType: file_type ? file_type : file.type,
        }
        const storageRef = ref(storage, 'files/' + folderName + '/' + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file, metadata)

        uploadTask.on(
            'state_changed',
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                    default:
                        break
                }
            },
            function error(err) {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    default:
                        break
                }
                reject()
            },
            async function complete() {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(function (
                    downloadURL
                ) {
                    resolve(downloadURL)
                })
            }
        )
    })
}

export const deleteFile = async (fileName, folderName) => {
    // Create a reference to the file to delete
    const fileRef = ref(storage, `files/` + folderName + `${fileName}`)

    // Delete the file
    try {
        await deleteObject(fileRef)
        console.log(`${fileName} has been deleted successfully.`)
    } catch (error) {
        console.error(`Error deleting ${fileName}: ${error}`)
    }
}

export const deleteFileByUrl = async (url, folderName) => {
    // Get the file path from the URL
    const pathStartIndex = url.indexOf('/files/' + folderName)
    const pathEndIndex = url.indexOf('?')
    const filePath = decodeURIComponent(
        url.substring(pathStartIndex + 1, pathEndIndex)
    )

    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath)

    // Delete the file
    try {
        await deleteObject(fileRef)
        console.log(`${filePath} has been deleted successfully.`)
    } catch (error) {
        console.error(`Error deleting ${filePath}: ${error}`)
    }
}

export const getAll = async (folderName) => {
    const listRef = ref(storage, folderName)
    let data = []
    try {
        const res = await listAll(listRef)
        // for (let folderRef of res.prefixes) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        // }
        for (let itemRef of res.items) {
            const downloadURL = await getDownloadURL(itemRef)
            data.push(downloadURL)
        }
    } catch (error) {
        console.log(error)
    }
    return data
}

export const deleteFolder = async (folderPath) => {
    try {
        // Create a reference to the folder
        const folderRef = ref(storage, folderPath)

        // List all items (files and subfolders) inside the folder
        const listResult = await list(folderRef)
        const listResult2 = await listAll(folderRef)
        const items = listResult2.items

        // Filter out the subfolders based on their names
        const subfolders = listResult.prefixes.map(
            (subfolderRef) => subfolderRef.fullPath
        )

        //   console.log('Subfolders:', subfolders);

        // Delete all items (files and subfolders) inside the folder recursively
        await Promise.all(items.map(deleteObject))
        await Promise.all(subfolders.map(deleteFolder))

        console.log(
            `All items inside ${folderPath} have been deleted successfully.`
        )
        return true
    } catch (error) {
        console.error(`Error deleting items inside ${folderPath}:`, error)
        return false
    }
}
