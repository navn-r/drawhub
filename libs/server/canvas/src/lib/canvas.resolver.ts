import { CurrentUser, GraphqlAuthGuard } from '@drawhub/server/auth';
import { ServerEmailService } from '@drawhub/server/email';
import { UploadService } from '@drawhub/server/upload';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Canvas,
  CreateCanvasInput,
  DeleteCanvasInput,
  GetCanvasInput,
  StitchedCanvasInput,
  UpdateCanvasInput,
  User,
} from './canvas.schema';
import { CanvasService } from './canvas.service';

@Resolver(() => Canvas)
@UseGuards(GraphqlAuthGuard)
export class CanvasResolver {
  constructor(
    private canvasService: CanvasService,
    private uploadService: UploadService,
    private emailService: ServerEmailService
  ) {}

  @Query(() => [Canvas])
  async canvases(@CurrentUser() { email }: User) {
    return this.canvasService.getAll(email);
  }

  @Query(() => Canvas)
  async canvas(@CurrentUser() { email }: User, @Args('payload') { _id }: GetCanvasInput) {
    const canvas = await this.canvasService.get(_id);
    if (!canvas.contributors.includes(email) && !canvas.isPublic) {
      throw new ForbiddenException();
    }
    return canvas;
  }

  @Mutation(() => Canvas)
  async createCanvas(@CurrentUser() { email }: User, @Args('payload') payload: CreateCanvasInput) {
    return this.canvasService.create({ ...payload, contributors: [email], isNew: true, isStitched: false });
  }

  @Mutation(() => Canvas)
  async stitchCanvas(@CurrentUser() { email }: User, @Args('payload') payload: StitchedCanvasInput) {
    const { _id, ...data } = payload;

    const canvas = await this.canvasService.get(_id);
    if (!canvas.isPublic && !canvas.contributors.includes(email)) {
      throw new ForbiddenException();
    }

    const stitchedCanvas = await this.canvasService.create({
      ...data,
      contributors: [email],
      isNew: false,
      isStitched: true,
    });

    await this.uploadService.stitchImage(_id as string, stitchedCanvas._id as string);

    const filteredContributors = canvas.contributors.filter((owner) => owner !== email);

    filteredContributors.forEach((owner) => {
      this.emailService.add(owner, email, canvas.name);
    });

    return stitchedCanvas;
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
  async saveContributor(@Args('payload') { _id, ...data }: UpdateCanvasInput) {
    return this.canvasService.saveContributor(_id, data['contributors'][0]);
  }
}
