export const parseJSONFields = (req, fields) => {
  fields.forEach((field) => {
    if (req.body[field] && typeof req.body[field] === 'string') {
      try {
        let parsedData = JSON.parse(req.body[field]);

        if (
          (field === 'teamMembers' || field === 'previousInvestments') &&
          !Array.isArray(parsedData)
        ) {
          parsedData = Object.values(parsedData);
        }

        req.body[field] = parsedData;
      } catch (error) {
        throw new Error(`${field} must be valid JSON: ${error.message}`);
      }
    }
  });
};
