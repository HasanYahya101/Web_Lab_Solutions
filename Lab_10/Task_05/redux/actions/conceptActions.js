export const LOAD_CONCEPTS = "LOAD_CONCEPTS"
export const ADD_CONCEPT = "ADD_CONCEPT"
export const REMOVE_CONCEPT = "REMOVE_CONCEPT"

export const loadConcepts = () => {
  return {
    type: LOAD_CONCEPTS,
  }
}

export const addConcept = (concept) => {
  return {
    type: ADD_CONCEPT,
    payload: concept,
  }
}

export const removeConcept = (conceptId) => {
  return {
    type: REMOVE_CONCEPT,
    payload: conceptId,
  }
}
