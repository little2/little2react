import Immutable from 'immutable';

// initstate model
export const UiState = Immutable.fromJS({
  spinnerVisible: false,
  isEdit: false,
});

export const RecipeState = Immutable.fromJS({
  recipes: [],
  recipe: {
    id: '',
    name: '',
    description: '',
    imagePath: '',
  }
});

export const UserState = Immutable.fromJS({
  username: '',
  email: '',
  password: '',
  isAuthorized: false,
  alertVisible: false,
  alertErrorMsg : ''
});

export const LoginInstantState = Immutable.fromJS({
  currentInput: '',
  password: '',
  loginStatus: '',
  keyframe: 100,
  shakeFixed:false
});

export const UsersStore  = Immutable.fromJS({
  userRows: [{
    userId:0,
    userName:'',
    password: 0

  }],
  userId: 0,
  dealerId: '',
  account: '',
  password: '',
  userName: '',
  userPosition: '',
  userPower: 0,
  lastUpdateDate: '',
});


export const InventoryState = Immutable.fromJS({
  inventoryRows:[],
  currentInput: '',
  password: '',
  loginStatus: '',
  keyframe: 100,
  shakeFixed:false
});
