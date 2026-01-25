import { list } from '@vercel/blob';

export default async function getImages() {
  try {
    const listResult = await list();
    console.log(listResult)
    // listResult contains an array of blob objects and a cursor

    // You can also list blobs within a specific folder using the 'prefix' option
    // const listResult = await list({ prefix: 'folder/' });

    // Iterate over the blobs to get their properties, e.g., URLs
    const blobUrls = listResult.blobs.map(blob => blob.url);

    return blobUrls;
  } catch (error) {
    console.log(error)
    return [];
  }
}
