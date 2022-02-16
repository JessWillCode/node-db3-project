/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
const { id } = req.params.id;
if(id) {
next();
} else {
  res.status(404).json({
    "message": `scheme with scheme_id ${id} not found`
  })
}
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
const { name } = req.body.scheme_name;
if(!name || name === '' || typeof name !== "string") {
  res.status(400).json({
    "message": "invalid scheme_name"
  })
} else {
  next();
}
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
const { instructions } = req.body.instructions;
const { stepNum } = req.body.step_number;
if(!instructions || instructions === '' || typeof instructions !== "string" || typeof stepNum !== "number" || stepNum < 1) {
  res.status(400).json({
    "message": "invalid scheme_name"
  })
} else {
  next();
}
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
