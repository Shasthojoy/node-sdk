/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { getMissingParams } from '../lib/helper';
import { BaseService } from '../lib/base_service';
import { FileObject } from '../lib/helper';
import { buildRequestFileObject } from '../lib/helper';

/**
 * **Important**: As of September 8, 2017, the beta period for Similarity Search is closed. For more information, see [Visual Recognition API – Similarity Search Update](https://www.ibm.com/blogs/bluemix/2017/08/visual-recognition-api-similarity-search-update).  The IBM Watson Visual Recognition service uses deep learning algorithms to identify scenes, objects, and faces  in images you upload to the service. You can create and train a custom classifier to identify subjects that suit your needs.   **Tip**: To test calls to the **Custom classifiers** methods with the API explorer, provide your `api_key` from your Bluemix service instance.
 */

class GeneratedVisualRecognitionV3 extends BaseService {
  name: string; // set by prototype to 'watson_vision_combined'
  version: string; // set by prototype to 'v3'

  static VERSION_DATE_2016_05_20: string = '2016-05-20';

  static URL: string = 'https://gateway.watsonplatform.net/visual-recognition/api';

  /**
   * Construct a GeneratedVisualRecognitionV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} options.version_date - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/visual-recognition/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.api_key] - The API key used to authenticate with the service. The API key credential is only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {GeneratedVisualRecognitionV3}
   * @throws {Error}
   */
  constructor(options: GeneratedVisualRecognitionV3.Options) {
    super(options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error(
        'Argument error: version_date was not specified, use GeneratedVisualRecognitionV3.VERSION_DATE_2016_05_20'
      );
    }
    this._options.qs.version = options.version_date;
  }

  /**
   * Classify images.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ReadableStream|FileObject|Buffer} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 20 images and limit the .zip file to 5 MB. You can also include images with the `url` property in the **parameters** object.
   * @param {string} [params.parameters] - Specifies input parameters. The parameter can include these inputs in a JSON object:  - url: A string with the image URL to analyze. You can also include images in the **images_file** parameter. - classifier_ids: An array of classifier IDs to classify the images against. - owners: An array with the values IBM, me, or both to specify which classifiers to run. - threshold: A floating point value that specifies the minimum score a class must have to be displayed in the response.  For example: {"url": "...", "classifier_ids": ["...","..."], "owners": ["IBM", "me"], "threshold": 0.4}.
   * @param {string} [params.accept_language] - Specifies the language of the output class names.  Can be `en` (English), `ar` (Arabic), `de` (German), `es` (Spanish), `it` (Italian), `ja` (Japanese), or `ko` (Korean).  Classes for which no translation is available are omitted.  The response might not be in the specified language under these conditions: - English is returned when the requested language is not supported. - Classes are not returned when there is no translation for them. - Custom classifiers returned with this method return tags in the language of the custom classifier.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  classify(
    params?: GeneratedVisualRecognitionV3.ClassifyParams,
    callback?: GeneratedVisualRecognitionV3.Callback<
      GeneratedVisualRecognitionV3.ClassifiedImages
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = typeof callback === 'function' ? callback : () => {};
    const formData: any = {};
    if (_params.images_file) {
      formData.images_file = buildRequestFileObject({
        data: _params.images_file,
        contentType:
          params.images_file_content_type || 'application/octet-stream'
      });
    }
    if (_params.parameters) {
      formData.parameters = _params.parameters;
    }
    const parameters = {
      options: {
        url: '/v3/classify',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
          'accept-language': _params.accept_language
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Detect faces in an image.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ReadableStream|FileObject|Buffer} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 15 images. You can also include images with the `url` property in the **parameters** object.  All faces are detected, but if there are more than 10 faces in an image, age and gender confidence scores might return scores of 0.
   * @param {string} [params.parameters] - A JSON string containing the image URL to analyze.   For example: {"url": "..."}.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  detectFaces(
    params?: GeneratedVisualRecognitionV3.DetectFacesParams,
    callback?: GeneratedVisualRecognitionV3.Callback<
      GeneratedVisualRecognitionV3.DetectedFaces
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = typeof callback === 'function' ? callback : () => {};
    const formData: any = {};
    if (_params.images_file) {
      formData.images_file = buildRequestFileObject({
        data: _params.images_file,
        contentType: 'application/octet-stream'
      });
    }
    if (_params.parameters) {
      formData.parameters = _params.parameters;
    }
    const parameters = {
      options: {
        url: '/v3/detect_faces',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Create a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the new classifier. Cannot contain special characters.
   * @param {ReadableStream|FileObject|Buffer} params.<classname>_positive_examples - A compressed (.zip) file of images that depict the visual subject for a class within the new classifier. Must contain a minimum of 10 images. The swagger limits you to training only one class. To train more classes, use the API functionality.
   * @param {ReadableStream|FileObject|Buffer} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createClassifier(
    params: GeneratedVisualRecognitionV3.CreateClassifierParams,
    callback?: GeneratedVisualRecognitionV3.Callback<
      GeneratedVisualRecognitionV3.Classifier
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _positive_example_classes = Object.keys(params).filter(key => {
      return key.match(/^.+positive_examples$/);
    }) || ['classname_positive_examples'];
    const requiredParams = ['name', ..._positive_example_classes];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData: any = {
      name: _params.name
    };
    _positive_example_classes.forEach(positive_example_class => {
      formData[positive_example_class] = buildRequestFileObject({
        data: _params[positive_example_class],
        contentType: 'application/octet-stream'
      });
    });
    if (_params.negative_examples) {
      formData.negative_examples = buildRequestFileObject({
        data: _params.negative_examples,
        contentType: 'application/octet-stream'
      });
    }
    const parameters = {
      options: {
        url: '/v3/classifiers',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Delete a custom classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteClassifier(
    params: GeneratedVisualRecognitionV3.DeleteClassifierParams,
    callback?: GeneratedVisualRecognitionV3.Callback<
      GeneratedVisualRecognitionV3.Empty
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = typeof callback === 'function' ? callback : () => {};
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      classifier_id: _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Retrieve information about a custom classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getClassifier(
    params: GeneratedVisualRecognitionV3.GetClassifierParams,
    callback?: GeneratedVisualRecognitionV3.Callback<
      GeneratedVisualRecognitionV3.Classifier
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = typeof callback === 'function' ? callback : () => {};
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      classifier_id: _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Retrieve a list of custom classifiers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.verbose] - Specify true to return classifier details. Omit this parameter to return a brief list of classifiers.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listClassifiers(
    params?: GeneratedVisualRecognitionV3.ListClassifiersParams,
    callback?: GeneratedVisualRecognitionV3.Callback<
      GeneratedVisualRecognitionV3.Classifiers
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = typeof callback === 'function' ? callback : () => {};
    const query = {
      verbose: _params.verbose
    };
    const parameters = {
      options: {
        url: '/v3/classifiers',
        method: 'GET',
        qs: query
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Update a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {ReadableStream|FileObject|Buffer} [params.classname_positive_examples] - A compressed (.zip) file of images that depict the visual subject for a class within the classifier. Must contain a minimum of 10 images.
   * @param {ReadableStream|FileObject|Buffer} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateClassifier(
    params: GeneratedVisualRecognitionV3.UpdateClassifierParams,
    callback?: GeneratedVisualRecognitionV3.Callback<
      GeneratedVisualRecognitionV3.Classifier
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = typeof callback === 'function' ? callback : () => {};
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData: any = {};
    if (_params.classname_positive_examples) {
      formData.classname_positive_examples = buildRequestFileObject({
        data: _params.classname_positive_examples,
        contentType: 'application/octet-stream'
      });
    }
    if (_params.negative_examples) {
      formData.negative_examples = buildRequestFileObject({
        data: _params.negative_examples,
        contentType: 'application/octet-stream'
      });
    }
    const path = {
      classifier_id: _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'POST',
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

GeneratedVisualRecognitionV3.prototype.name = 'visual_recognition';
GeneratedVisualRecognitionV3.prototype.version = 'v3';

namespace GeneratedVisualRecognitionV3 {
  export interface Empty {}

  export type Callback<T> = (
    error: any,
    body?: T,
    response?: RequestResponse
  ) => void;

  export type Options = {
    version_date: string;
    url?: string;
    api_key?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  export interface ClassifyParams {
    images_file?: ReadableStream | FileObject | Buffer;
    parameters?: string;
    accept_language?: ClassifyConstants.AcceptLanguage | string;
    images_file_content_type?: string;
  }

  export namespace ClassifyConstants {
    export enum AcceptLanguage {
      EN = 'en',
      AR = 'ar',
      DE = 'de',
      ES = 'es',
      IT = 'it',
      JA = 'ja',
      KO = 'ko'
    }
  }

  export interface DetectFacesParams {
    images_file?: ReadableStream | FileObject | Buffer;
    parameters?: string;
    images_file_content_type?: string;
  }

  export interface CreateClassifierParams {
    name: string;
    classname_positive_examples: ReadableStream | FileObject | Buffer;
    negative_examples?: ReadableStream | FileObject | Buffer;
  }

  export interface DeleteClassifierParams {
    classifier_id: string;
  }

  export interface GetClassifierParams {
    classifier_id: string;
  }

  export interface ListClassifiersParams {
    verbose?: boolean;
  }

  export interface UpdateClassifierParams {
    classifier_id: string;
    classname_positive_examples?: ReadableStream | FileObject | Buffer;
    negative_examples?: ReadableStream | FileObject | Buffer;
  }

  export interface Class {
    class_name: string;
  }

  export interface ClassResult {
    class_name: string;
    score?: number;
    type_hierarchy?: string;
  }

  export interface ClassifiedImage {
    source_url?: string;
    resolved_url?: string;
    image?: string;
    error?: ErrorInfo;
    classifiers: ClassifierResult[];
  }

  export interface ClassifiedImages {
    custom_classes?: number;
    images_processed?: number;
    images: ClassifiedImage[];
    warnings?: WarningInfo[];
  }

  export interface Classifier {
    classifier_id: string;
    name: string;
    owner?: string;
    status?: string;
    explanation?: string;
    created?: string;
    classes?: Class[];
  }

  export interface ClassifierResult {
    name: string;
    classifier_id: string;
    classes: ClassResult[];
  }

  export interface Classifiers {
    classifiers: Classifier[];
  }

  export interface DetectedFaces {
    images_processed?: number;
    images: ImageWithFaces[];
    warnings?: WarningInfo[];
  }

  export interface ErrorInfo {
    error_id: string;
    description: string;
  }

  export interface Face {
    age?: FaceAge;
    gender?: FaceGender;
    face_location?: FaceLocation;
    identity?: FaceIdentity;
  }

  export interface FaceAge {
    min?: number;
    max?: number;
    score?: number;
  }

  export interface FaceGender {
    gender: string;
    score?: number;
  }

  export interface FaceIdentity {
    name: string;
    score?: number;
    type_hierarchy?: string;
  }

  export interface FaceLocation {
    width: number;
    height: number;
    left: number;
    top: number;
  }

  export interface ImageWithFaces {
    faces: Face[];
    image?: string;
    source_url?: string;
    resolved_url?: string;
    error?: ErrorInfo;
  }

  export interface WarningInfo {
    warning_id: string;
    description: string;
  }
}

export = GeneratedVisualRecognitionV3;
