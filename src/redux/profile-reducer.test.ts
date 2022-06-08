import profileReducer, {actions} from "./profile-reducer";

const state =  {
    posts : [
        {id: 1, message: 'hello', likesCount : 51 },
        {id: 2, message: 'ok Google', likesCount : 21 },
        {id: 3, message: 'hahha', likesCount : 1},
        {id: 4, message: 'ha12hha', likesCount : 1}
    ],
    profile: null,
    status: ''
}

test('posts length should be incremented', () => {
    // 1. test data
    let action = actions.addPost('hello Every body')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(4);
});
test('post[4] should be correct', () => {
    // 1. test data
    let action = actions.addPost('hello Every body')
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts[3].message).toBe('hello Every body');
});

test('posts length should be decrement', () => {
    // 1. test data
    let action = actions.deletePost(1)
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(3);
});
