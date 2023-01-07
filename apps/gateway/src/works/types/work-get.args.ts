import { ArgsType, Field } from '@nestjs/graphql';
import { ConstraintFormat, ConstraintValidator } from '../../common/decorators';

@ArgsType()
export class WorkGetArgs {
    @Field()
    @ConstraintValidator({ format: ConstraintFormat.UUID })
    public id: string;
}
