import { ArticleTypeDtoResponse } from "./ArticleTypeDtoResponse";

export interface TeacherArticleDtoResponse{
    id: number;
    userId: number;
    information: string;
    articleType: ArticleTypeDtoResponse;
}
