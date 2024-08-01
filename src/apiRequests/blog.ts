import http from '@/src/lib/httpAxios'
import {
    BlogListPageBodyType,
    BlogListPageResType,
    BlogResType,
    CreateBlogBodyType,
    CreateBlogResType,
    UpdateBlogBodyType,
    UpdateBlogResType
} from '@/src/schemaValidations/blog.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

const blogApiRequest = {
    getListPageBlog: (body: BlogListPageBodyType) => http.post<BlogListPageResType>('/api/Blog/get-list', body),
    getBlogById: (id: string) => http.get<BlogResType>('/api/Blog/get-blog/' + id),
    createBlog: ({ body, sessionToken }: { body: CreateBlogBodyType; sessionToken?: string }) =>
        http.post<CreateBlogResType>("/api/Blog/create-blog", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            }),
    updateBlog: ({ body, sessionToken }: { body: UpdateBlogBodyType; sessionToken?: string }) =>
        http.post<UpdateBlogResType>("/api/Blog/create-blog", body,
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            })
}
export default blogApiRequest;