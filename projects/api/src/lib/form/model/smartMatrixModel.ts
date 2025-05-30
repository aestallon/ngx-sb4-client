/**
 * Form layout definition
 *
 * Contact: info@it4all.hu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Value } from '../../value/model/value';


export interface SmartMatrixModel { 
    /**
     * The keys
     */
    rows?: Array<Value>;
    /**
     * The possible values
     */
    columns?: Array<Value>;
    /**
     * A map for key - values
     */
    data?: { [key: string]: any; };
    multiSelect?: boolean;
}

