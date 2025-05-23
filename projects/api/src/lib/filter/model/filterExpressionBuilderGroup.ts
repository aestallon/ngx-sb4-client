/**
 * Filter API 2
 *
 * Contact: info@it4all.hu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { FilterExpressionBuilderField } from './filterExpressionBuilderField';


/**
 * The group is just a UI structure to define a tree structure for the available filter fields. In a group there is an ordered list of filter fields. The group can imply a parenthesis in the xpression or an exist node. Theoreticaly the groups are hierarchical but the pratcticaly it is not. The kind of the group defines what operation is available for the filter fields in the group.  DISPLAY: means thet we can choose an available filter field from the group and place it into the field list related with the current group or in any sub list except under an exist. BRACKET: The given groups defines a bracket. If we choose any of the fiels to add to a filter list then this imlicitely create a bracket node. It can not be added under an exist node. EXIST: The same as the BRACKET but with an exist node. 
 */
export interface FilterExpressionBuilderGroup { 
    /**
     * The visual display name fo the group.
     */
    label?: string;
    /**
     * Defines if the given groups is just a visual sugar to group somehow the available filter fields or it is definetely a bracket or exists. 
     */
    builderGroupKind?: FilterExpressionBuilderGroup.BuilderGroupKindEnum;
    fields?: Array<FilterExpressionBuilderField>;
    /**
     * The unique identifier of the root list in the workplace.
     */
    rootListId?: string;
    subGroups?: Array<FilterExpressionBuilderGroup>;
}
export namespace FilterExpressionBuilderGroup {
    export const BuilderGroupKindEnum = {
        Diplay: 'DIPLAY',
        Bracket: 'BRACKET',
        Exist: 'EXIST'
    } as const;
    export type BuilderGroupKindEnum = typeof BuilderGroupKindEnum[keyof typeof BuilderGroupKindEnum];
}


