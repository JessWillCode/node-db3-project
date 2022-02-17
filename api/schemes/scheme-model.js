const db = require('../../data/db-config');

function find() {
 return db('schemes as sc')
 .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
 .groupBy('sc.scheme_id')
 .orderBy('sc.scheme_id', 'asc')
 .select('sc.scheme_id', 'sc.scheme_name')
 .count('st.step_id as number_of_steps')
}

async function findById(scheme_id) {
      const query = await db('schemes as sc')
      .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
      .orderBy('st.step_number', 'asc')
      .select('scheme_name', 'step_id', 'step_number', 'instructions', 'sc.scheme_id')
      .where('sc.scheme_id', scheme_id)

      const result = {
        scheme_id: query[0].scheme_id,
        scheme_name: query[0].scheme_name,
        steps: (query[0].step_id
        ? query.map(query => ({ step_id: query.step_id, step_number: query.step_number, instructions: query.instructions }))
        : [])
      }
      return result;
    }

async function findSteps(scheme_id) { 
 const query = await db('schemes as sc')
  .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
  .orderBy('st.step_number', 'asc')
  .select('scheme_name', 'step_id', 'step_number', 'instructions')
  .where('sc.scheme_id', scheme_id)

  if (!query[0].step_id) {
    return [];
  } else {
    return query;
  }
} 

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(([id]) => { // eslint-disable-line
      return findById(id)
    })
}

function addStep(scheme_id, step) {
 step.scheme_id = scheme_id;
 return db('steps')
 .insert(step)
 .then(() => {
   return findSteps(scheme_id)
 })
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
