import {follow} from "./users-reducer"
import {userAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock('../api/users-api')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

// @ts-ignore
userAPIMock.follow.mockReturnValue(result)

/*
test('', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();


    await thunk(dispatchMock,getStateMock,{})

    expect(dispatchMock).toBeCalledTimes(3)
})*/
