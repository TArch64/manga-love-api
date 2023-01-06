import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EnvironmentService } from '@manga-love-api/core/environment';
import { IllustrationObject } from './types';

@Resolver((of) => IllustrationObject)
export class IllustrationResolver {
    @Inject()
    private environment: EnvironmentService;

    @ResolveField()
    public url(@Parent() illustration: IllustrationObject): string {
        return [
            this.environment.aws.s3.cloudfrontOrigin,
            illustration.id,
            illustration.filename,
        ].join('/');
    }
}
