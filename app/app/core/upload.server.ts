import { ActionFunction } from '@remix-run/node';

// const uploadStreamToCloudStorage: UploadHandler = async ({ filename, data }, stream) => {
//   const bucketName = 'YOUR_BUCKET_NAME';

//   if (!filename) {
//     return null;
//   }

//   const file = storage.bucket(bucketName).file(filename).createWriteStream().pipe;

//   async function streamFileUpload() {
//     fileStream.pipe(file.createWriteStream()).on('finish', () => {
//       // The file upload is complete
//     });

//     console.log(`${filename} uploaded to ${bucketName}`);
//   }

//   streamFileUpload().catch(console.error);

//   return filename;
// };

export const action: ActionFunction = async ({ request }) => {
  // const formData = await unstable_parseMultipartFormData(request, () => {});
  // const filename = formData.get('upload');
  // return { filename };
};
