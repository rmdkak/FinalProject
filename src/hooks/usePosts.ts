import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchPostData } from "api/supabase/postData";

export const usePosts = () => {
  const { id: paramsId } = useParams();

  // get
  const fetchPostsMutation = useQuery({
    queryKey: ["POSTS", paramsId],
    queryFn: async () => {
      return await fetchPostData(paramsId as string);
    },
  });

  return { fetchPostsMutation };
};
