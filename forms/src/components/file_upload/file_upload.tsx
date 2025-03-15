import { ChangeEvent } from 'react';

export function handlePictureUpload(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  console.log(file);
  if (!file) return;
  const maxFileSize = 2 * 1024 * 1024;
  if (file.size > maxFileSize) {
    alert('File size should be less than 2 MB');
    return;
  }
  const allowedExtensions = ['image/png', 'image/jpeg'];
  if (!allowedExtensions.includes(file.type)) {
    alert('Only PNG and JPEG files are allowed');
    return;
  }
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => reject('Error reading file');
    reader.readAsDataURL(file);
  });
}
