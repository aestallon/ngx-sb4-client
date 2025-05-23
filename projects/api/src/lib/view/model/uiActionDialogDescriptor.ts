/**
 * View API
 *
 * Contact: info@it4all.hu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UiActionButtonDescriptor } from './uiActionButtonDescriptor';


/**
 * Describes the look of a dialog that is related to a specific UiAction. 
 */
export interface UiActionDialogDescriptor { 
    title: string;
    placeholder?: string;
    text?: string;
    mask?: string;
    actionButton: UiActionButtonDescriptor;
    cancelButton: UiActionButtonDescriptor;
}

