import { CurrentUser, GraphqlAuthGuard } from '@drawhub/server/auth';
import { UploadService } from '@drawhub/server/upload';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Canvas, CreateCanvasInput, DeleteCanvasInput, GetCanvasInput, UpdateCanvasInput } from './canvas.schema';
import { CanvasService } from './canvas.service';

@Resolver(() => Canvas)
@UseGuards(GraphqlAuthGuard)
export class CanvasResolver {
  constructor(private canvasService: CanvasService, private uploadService: UploadService) {}

  @Query(() => [Canvas])
  async canvases() {
    return this.canvasService.getAll();
  }

  @Query(() => Canvas)
  async canvas(@Args('payload') { _id }: GetCanvasInput) {
    return this.canvasService.get(_id);
  }

  @Mutation(() => Canvas)
  async createCanvas(@CurrentUser() user: { email: string }, @Args('payload') payload: CreateCanvasInput) {
    const { email } = user;
    return this.canvasService.create({ ...payload, contributors: [email], isNew: true });
  }

  @Mutation(() => Canvas)
  async deleteCanvas(@Args('payload') { _id }: DeleteCanvasInput) {
    const deleted: Canvas = await this.canvasService.delete(_id);

    if (!deleted.isNew) {
      await this.uploadService.deleteImage(_id as string);
    }

    return deleted;
  }

  @Mutation(() => Canvas)
  async updateCanvas(@Args('payload') { _id, ...data }: UpdateCanvasInput) {
    return this.canvasService.update(_id, data);
  }

  @Mutation(() => Canvas)
  async addContributor(@Args('payload') { _id, ...data }: UpdateCanvasInput) {
    return this.canvasService.addContributor(_id, data['contributors'][0]);
  }
}
