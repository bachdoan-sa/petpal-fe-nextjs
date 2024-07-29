import { z } from "zod";


export const PagingRes = z.object({
    page: z.number(),
    size: z.number(),
    maxPage: z.number() //có tất cả bao nhiêu trang (flex theo size)
});
export type PageResType = z.TypeOf<typeof PagingRes>;

export const PagingBody = z.object({
    page: z.number(),
    size: z.number(),
});
export type PageBodyType = z.TypeOf<typeof PagingBody>;