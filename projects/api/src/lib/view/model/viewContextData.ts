/**
 * View API
 *
 * Contact: info@it4all.hu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DownloadedFile } from './downloadedFile';
import { ViewData } from './viewData';
import { ClipboardData } from './clipboardData';
import { Link } from './link';


/**
 * The same session can be valid / used in multiple UIs, this object represents a UI.
 */
export interface ViewContextData { 
    uuid?: string;
    views: Array<ViewData>;
    links: Array<Link>;
    downloads: Array<DownloadedFile>;
    clipboardData: Array<ClipboardData>;
}

