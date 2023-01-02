import { Field, ObjectType } from '@nestjs/graphql';
import { map, Observable } from 'rxjs';

@ObjectType()
export class SuccessObject {
    public static mapTo(source: Observable<unknown>): Observable<SuccessObject> {
        return source.pipe(map(() => new SuccessObject()));
    }

    @Field((type) => Boolean)
    public success = true;
}
