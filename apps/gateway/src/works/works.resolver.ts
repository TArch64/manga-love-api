import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuccessObject } from '../common/types';
import { CreateWorkInput } from './types';

@Resolver()
export class WorksResolver {
    @Mutation((returns) => SuccessObject)
    public async workCreate(@Args('input') input: CreateWorkInput): Promise<SuccessObject> {
        console.log(input);
        console.log(await input.illustration.file);
        return new SuccessObject();
    }
}
