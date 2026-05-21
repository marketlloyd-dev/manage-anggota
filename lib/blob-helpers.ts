import { put, list, del } from '@vercel/blob';

/**
 * Simpan data JSON ke path tertentu di Blob
 * @param pathname contoh: 'users/ketua@himmah.id.json'
 * @param data object yang akan di-serialize
 */
export async function setBlobData(pathname: string, data: any) {
  await put(pathname, JSON.stringify(data), {
    access: 'public', // atau private, sesuaikan
    contentType: 'application/json',
  });
}

/**
 * Ambil data JSON dari path Blob
 * @param pathname
 * @returns parsed JSON atau null jika tidak ditemukan
 */
export async function getBlobData<T = any>(pathname: string): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    if (blobs.length === 0) return null;
    const response = await fetch(blobs[0].url);
    const text = await response.text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/**
 * Ambil semua blob dengan prefix tertentu, lalu parse jadi array of T
 * @param prefix contoh: 'users/' untuk semua user, 'chat/divisi_x/' untuk pesan
 */
export async function listBlobData<T = any>(prefix: string): Promise<T[]> {
  const { blobs } = await list({ prefix });
  const results: T[] = [];
  for (const blob of blobs) {
    try {
      const response = await fetch(blob.url);
      const text = await response.text();
      results.push(JSON.parse(text));
    } catch (e) {
      console.error(`Gagal parse ${blob.pathname}`, e);
    }
  }
  return results;
}

/**
 * Hapus blob berdasarkan pathname
 */
export async function deleteBlob(pathname: string) {
  await del(pathname);
}