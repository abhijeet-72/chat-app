import { useState } from "react";
import useConversationStore from "../store/conversationStore";
import axios from "axios";
import toast from "react-hot-toast";

const useSendImage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, addMessage } = useConversationStore();

  const sendImage = async (imageFile) => {
    if (!imageFile) return;

    setLoading(true);

    // 1. Create a FormData object to bundle the file
    const formData = new FormData();
    // "image" must match the name in our multer.middleware.js: upload.single("image")
    formData.append("image", imageFile);

    try {
      // 2. Call the new image upload endpoint
      // const res = await axios.post(
      //   `/api/messages/send/image/${selectedConversation._id}`,
      const res = await axios.post(
        `/api/messages/send/image/${selectedConversation._id}`,
        formData,
        {
          // 3. Set content-type to multipart/form-data
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newMessage = res.data;

      // 4. Add the new image message to our store
      addMessage(newMessage);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred uploading the image.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Return loading state renamed to avoid conflicts
  return { loading: loading, sendImage };
};

export default useSendImage;
