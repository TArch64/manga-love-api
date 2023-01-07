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
        const objectPath = illustration.alias || [
            'illustrations',
            illustration.id,
            illustration.filename,
        ];

        return [this.environment.aws.s3.cloudfrontOrigin].concat(objectPath).join('/');
    }
}
