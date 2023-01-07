import { Field, InputType } from '@nestjs/graphql';
import { IFilterWorksSort, WorkSortField } from '@manga-love-api/work/types';
import { FieldSortOrder } from '@manga-love-api/database';

@InputType()
export class WorkFilterSortInput implements IFilterWorksSort {
    public static readonly default: IFilterWorksSort = {
        field: WorkSortField.UPDATED_AT,
        direction: FieldSortOrder.DESC,
    };

    @Field(() => WorkSortField, {
        defaultValue: WorkFilterSortInput.default.field,
    })
    public field: WorkSortField;

    @Field(() => FieldSortOrder, {
        defaultValue: WorkFilterSortInput.default.direction,
    })
    public direction: FieldSortOrder;
}
