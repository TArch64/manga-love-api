import { Field, ObjectType } from '@nestjs/graphql';
import { map, Observable } from 'rxjs';
import { IStatusResponse } from '@manga-love-api/core/status-response';

@ObjectType()
export class SuccessObject implements IStatusResponse {
    public static mapTo(source: Observable<unknown>): Observable<SuccessObject> {
        return source.pipe(map(() => new SuccessObject()));
    }

    @Field((type) => Boolean)
    public success = true;
}
