import {
	atom,
	atomFamily,
	selector, 
	selectorFamily 
} from 'recoil'

import { dateState } from '../store/State.jsx';
/*
* user : {
*	id: STRING,
*	name: STRING,
*	profile-img: URL,
* }
*/

/* Test Code */

// const userId = cookie.get('userid');
// const userId = '';

export const userState = atom({
	key: 'UserState',
	default: {
		id: 0,
		name: '',
		admin: false,
		displayname: '',
		profile_img: '',
	},
});

//특정 유저의 정보를 한번 가져온 경우 들고있음
export const usersState = atomFamily({
	key: 'UsersState',
	default: selectorFamily({
		key: 'UsersState/Default',
		get: userID => async ({ get }) => {
			const checkDuplicateUser = get(userState);
			if (checkDuplicateUser.id === userID || userID === 0) return null;
			const response = await fetchUserStateQuery("id", userID);
			return response;
		}
	}),
});

//특정한 사용자 검색을 위한 api
export const getUserInfoById = async (userID) => {
	try {
		/* check id regex needed */
		const response = await fetchUserStateQuery("id", userID);
		return response;
	} catch (err) {
		throw err;
	};
}

export const getUserInfoByName = async (userName) => {
	try {
		/* check id regex needed */
		const response = await fetchUserStateQuery("name", userName);
		return response;
	} catch (err) {
		throw err;
	};
}

const fetchUserStateQuery = async (param, search) => {
	try {
		/* check id regex 	needed */
		const response = await fetch(`http://54.180.96.16:4242/users?${param}=${search}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status !== 200)
			throw new Error("fetchUserStateQuery : fetching path is invaild");
		return response.json();
	} catch (err) {
		throw err;
	};
}
/* Test Code End */

export const fetchUserCurrentBook = selectorFamily({
	key: 'FetchUserCurrentBook',
	get: (id) => async ({ get }) => {
		try {
			if (id === 0) return null;
			const today = get(dateState);
			const response = await fetch(`http://54.180.96.16:4242/books/${id}/list?date=${today}`, {
				method: "GET",
				headers: {
					"Content-Type": "appication/json",
				},
			});
			if (response.status !== 200)
				throw new Error('failed to fecth user current booking');
			return await response.json();
		} catch (error) {
			console.error(error);
		};
	},
});

export const fetchUserHistory = selectorFamily ({
	key: 'FetchUserHistory',
	get : (id) => async () => {
		try {
			if (id === 0) return null;
			const response = await fetch(`http://54.180.96.16:4242/books/${id}/history`, {

				method: "GET",
				headers: {
					"Content-Type": "appication/json",
				},
			});
			if (response.status !== 200)
				throw new Error('failed to fecth user current booking');
			return response.json();
		} catch (error) {
			console.error(error);
		}
	},
});

export const UserlistStateQuery = selector({
	key: 'UserlistStateQuery',
	get: async () => {
		try {
			const response = await fetch(process.env.REACT_APP_URL + "/users", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					/* Token */
				},
			});
			if (response !== 200)
				throw new Error("failed to fetch Users Data");
		} catch (err) {
			throw err;
		}
	}
})

export default fetchUserStateQuery;