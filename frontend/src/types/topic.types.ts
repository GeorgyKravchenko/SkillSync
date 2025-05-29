import { BaseResponseData } from './bases.types';

export interface ITopic extends ITopicCreateDto, BaseResponseData {}
export interface ITopicCreateDto {
  title: string;
  slug: string;
}
