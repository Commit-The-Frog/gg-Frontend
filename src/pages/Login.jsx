import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from "recoil";
import { Link } from 'react-router-dom';

const loginUrl="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a74331b456cc2db0bfb71c584a1d8b8cc6369d5c8b8f775d59a19e6483b9ddbd&redirect_uri=http%3A%2F%2F13.124.198.32%3A4242%2Fcallback&response_type=code";

// export const UserLoginState = atom({
// 	key: 'UserLoginState',
// 	default: '',
// });

function Login() {
	// const userState = useRecoilValue(UserLoginState);

	return (
		<div>
			<button className="login-button">
				<Link to={loginUrl}>Login</Link>
			</button>
		</div>
	)
};

export default Login;