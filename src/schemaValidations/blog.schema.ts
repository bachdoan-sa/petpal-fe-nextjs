import { z } from "zod";
import { IsSucceedRes } from "./common.schema";
import { PagingRes, PagingBody } from "./paging/paging.schema";
import { UserSchema, UserType } from "./user.schema";
// Các bước định nghĩa 1 response
// 1. định nghĩa object đó
export const BlogSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    content: z.string(),
    tags: z.string(),
    viewNumber: z.number().optional(),
    likeNumber: z.number().optional(),
    listImages: z.string().optional(),
    status: z.string().optional(),
    userID: z.string().optional(),
    user: UserSchema.optional(),

    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional()
})
// 2. định nghĩa cấu trúc trả về đơn lẻ của object
export const BlogRes = z.object({
    data: BlogSchema,
    message: z.string()
});
// 2.1 định nghĩa kiểu thuộc tính trả về (cái này là định nghĩa kiểu để bên ngoài lấy)
export type BlogResType = z.TypeOf<typeof BlogRes>;



// 3. Định nghĩa cấu trúc trả về theo list, đây là định nghĩa cái thông tin ở trong.
export const BlogList = z.object({
    Blogs: z.array(BlogSchema)
})
// 3.1 Định nghĩa kiểu res ( vì template trả về là payload: data và message)
export const BlogListRes = z.object({
    data: BlogList,
    message: z.string()
})
// 3.2
export type BlogType = z.TypeOf<typeof BlogSchema>;
export type BlogListType = z.TypeOf<typeof BlogList>
export type BlogListResType = z.TypeOf<typeof BlogListRes>

// 4. Định nghĩa cấu trúc trả về theo list (có PAGINATION)
export const BlogListPage = z.object({
    Blogs: z.array(BlogSchema),
    paging: PagingRes
});
export const BlogListPageRes = z.object({
    data: BlogListPage,
    message: z.string()
});
// 4.1
export type BlogListPageResType = z.TypeOf<typeof BlogListPageRes>;

export const BlogListPageBody = PagingBody;
export type BlogListPageBodyType = z.TypeOf<typeof BlogListPageBody>;

//Create Model
export const CreateBlogBody = BlogSchema;
export type CreateBlogBodyType = z.TypeOf<typeof CreateBlogBody>;
export const CreateBlogRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type CreateBlogResType = z.TypeOf<typeof CreateBlogRes>;


//Update Model
export const UpdateBlogBody = BlogSchema;
export type UpdateBlogBodyType = z.TypeOf<typeof UpdateBlogBody>;
export const UpdateBlogRes = z.object({
    data: IsSucceedRes,
    message: z.string()
});
export type UpdateBlogResType = z.TypeOf<typeof UpdateBlogRes>;