import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        // Our 'protectRoute' middleware will get the user ID
        // and the controller will exclude that user.
        const res = await axios.get("/api/users");
        setConversations(res.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "An error occurred.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []); // Empty dependency array ensures this runs once on mount

  return { loading, conversations };
};

export default useGetConversations;
