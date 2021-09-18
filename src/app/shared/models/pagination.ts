import { IPost } from "./IPost";

export interface IPagination {
  before: string;
  after: string;
  posts: IPost[];
}

export class Pagination implements IPagination {
  before: string = '';
  after: string = '';
  posts: IPost[] = [];
}
