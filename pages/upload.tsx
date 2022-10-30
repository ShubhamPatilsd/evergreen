// import axios from "axios";

// export default function Upload() {
//   const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]!;
//     const filename = encodeURIComponent(file.name);
//     const fileType = encodeURIComponent(file.type);

//     const res = await axios.get(
//       `/api/uploadimage?file=${filename}&fileType=${fileType}`
//     );
//     // const { url, fields } = await res.json();
//     const { url } = res.data;
//     // const formData = new FormData();

//     // Object.entries({ ...fields, file }).forEach(([key, value]) => {
//     //   formData.append(key, value as string);
//     // });

//     // const upload = await fetch(url, {
//     //   method: "PUT",
//     //   body: formData,
//     // });
//     console.log(url);
//     try {
//       const upload = await axios.put(url, file, {
//         headers: {
//           "Content-type": file.type,
//           "Access-Control-Allow-Origin": "*",
//         },
//       });
//       console.log("Uploaded successfully!");
//     } catch (err) {
//       console.error("Upload failed.", err);
//     }
//   };

//   return (
//     <>
//       <p>Upload a .png or .jpg image (max 1MB).</p>
//       <input
//         onChange={uploadPhoto}
//         type="file"
//         accept="image/png, image/jpeg"
//       />
//     </>
//   );
// }
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";

export default function UploadTest() {
  let [imageUrl, setImageUrl] = useState("");
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file: any) => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && <img src={imageUrl} />}
    </div>
  );
}
