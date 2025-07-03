class BaseController {
    sendSuccessResponse(res, data, message = 'Success', statusCode = 200) {
      responseUtil.sendSuccessResponse(res, data, message, statusCode);
    }
  
    sendErrorResponse(res, error, message = 'Error', statusCode = 500) {
      responseUtil.sendErrorResponse(res, error, message, statusCode);
    }
  
    validateRequest(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        responseUtil.sendUnprocessableEntity(res, errors.array(), 'Validation Error');
        return false;
      }
      return true;
    }
  
    filterFields(data, allowedFields) {
      return Object.keys(data)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});
    }
}