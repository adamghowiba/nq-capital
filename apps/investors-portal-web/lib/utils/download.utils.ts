/**
 * Download asset
 */
export async function downloadFile(
  fileUrl: string,
  params?: { filename: string }
): Promise<void> {
  if (typeof window === 'undefined' || !params?.filename) return;

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Network response was not ok');

    const fileName = params.filename;

    const blob = await response.blob();

    // Create a URL for the blob
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.click();

    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Failed to download the file:', error);
  }
}
