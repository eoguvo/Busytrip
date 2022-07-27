import { Request, NextFunction, Response } from 'express';
import { ValidationError } from "joi";
import schemas from '../schemas';

import R from 'ramda';

const SchemaValidator = (useJoiError = false) => {
  const supportedMethods = ['post', 'put'];

  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    const route = req.originalUrl as string;
    const method = req.method.toLocaleLowerCase();
    if (!R.includes(method, supportedMethods) && !R.hasIn(route, schemas)) next();
      
    const _schema = schemas[route];
    if (!_schema) next();
    
    try {
      const data = await _schema.validateAsync(req.body, validationOptions);
      req.body = data;
      next();
    } catch(e: any) {
      console.log({e})
      
      if(typeof e !== typeof ValidationError) return next(e);
      const JoiError = {
        status: 'failed',
        error: {
          original: e._object,
          // fetch only message and type from each error
          details: R.map(({message, type}) => ({
            message: message.replace(/['"]/g, ''),
            type
          }), (e as ValidationError).details)
        }
      };

      // Custom Error
      const CustomError = {
        status: 'failed',
        error: 'Invalid request data. Please review request and try again.'
      };
      
      next({ statusCode: 422, message: useJoiError ? JoiError : CustomError })
    }
  }
}

export default SchemaValidator;