export interface AddPostDto {
    title: string,
    content: string,
    userId?: string,
}
export interface getPostDto {
    postId?: string
}