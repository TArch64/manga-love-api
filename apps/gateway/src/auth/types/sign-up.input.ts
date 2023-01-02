import { Field, InputType } from '@nestjs/graphql';
import { ISignUpRequest } from '@manga-love-api/auth/types';
import { ConstraintFormat, ConstraintValidator } from '../../common/decorators';

@InputType()
export class SignUpInput implements ISignUpRequest {
    @Field()
    @ConstraintValidator({ minLength: 3, maxLength: 255 })
    public username: string;

    @Field()
    @ConstraintValidator({ format: ConstraintFormat.EMAIL })
    public email: string;

    @Field()
    @ConstraintValidator({ minLength: 8, maxLength: 255 })
    public password: string;
}
