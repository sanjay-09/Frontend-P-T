import { supabase } from "@/Client/supabase";

export const uploadImage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from('bucket-w-p') // Replace with your bucket name
      .upload(`images/${Date.now()}_${file.name}`, file);
  
    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }
    const expiryTimeInSeconds = 365 * 24 * 60 * 60; // 1 year in seconds

    const { data: signedUrlData, error: signedUrlError } =await supabase.storage
      .from('bucket-w-p')
      .createSignedUrl(data.path, expiryTimeInSeconds); // Expiry time in seconds
  
    if (signedUrlError) {
      console.error('Error generating signed URL:', signedUrlError);
      return null;
    }
  
    return signedUrlData?.signedUrl; // Return the signed URL with 1-year expiry
  
     // Returns the path of the uploaded image
  };
