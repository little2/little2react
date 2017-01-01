import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
  GET_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  SET_RECIPE,
} from '../constants/actionTypes';

export const getRecipes = createAction('GET_RECIPES', WebAPI.getRecipes);
export const addRecipe = createAction('ADD_RECIPE', WebAPI.addRecipe);
export const updateRecipe = createAction('UPDATE_RECIPE', WebAPI.updateRecipe);
export const deleteRecipe = createAction('DELETE_RECIPE', WebAPI.deleteRecipe);
export const setRecipe = createAction('SET_RECIPE');

/**
the same as :

const getRecipes = {
  type:'GET_RECIPES',
  payload:
}

function getRecipes(WebAPI.getRecipes) {
  return {
    type: GET_RECIPES,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}


**/
