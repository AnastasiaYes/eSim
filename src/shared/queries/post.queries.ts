import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../services/post.service"

export const usePosts = () =>
    useQuery({
        queryKey: ["posts"],
        queryFn: getPosts
    })
