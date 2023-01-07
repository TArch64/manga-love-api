import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLUUID } from '../../common/types';

@ArgsType()
export class WorkGetArgs {
    @Field((returns) => GraphQLUUID)
    public id: string;
}
