import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";
import "../css/facebook-login.css";

interface facebookLoginProps {
	appId: string;
	cookie: boolean;
	xfbml: boolean;
	version: string;
}

interface Response {
	status: "connected" | "not_authorized" | "unknown";
	authResponse: null | AuthResponse;
}

interface AuthResponse {
	accessToken: string;
	expiresIn: number;
	signedRequest: string;
	userId: string;
	data_access_expiration_time: number;
	graphDomain: string;
}

interface UserData{
    id: string;
    email: string;
    name: string;
}

function setFBAsyncInit(data: facebookLoginProps) {
	(window as any).fbAsyncInit = () => {
		(window as any).FB.init({
			version: data.version,
			appId: data.appId,
			xfbml: data.xfbml,
			cookie: data.cookie,
		});
	};
}

function loadSdkAsynchronously() {
	((d, s, id) => {
		const element = d.getElementsByTagName(s)[0];
		const fjs = element as Element;
		let js = element as any;
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = `https://connect.facebook.net/en_US/sdk.js`;
		fjs.parentNode!.insertBefore(js, fjs);
	})(document, "script", "facebook-jssdk");
}

function checkLogin() {
	(window as any).FB.getLoginStatus((checkResponse: Response) => {
		checkState(checkResponse);
	});
}

function checkState(checkResponse: Response) {
	if (checkResponse.status === "connected") {
		// 로그인 돼있을 때 작업
        getUser();
	} else {
		(window as any).FB.login((response: Response) => {
			// 로그인 후 작업
            if(response.status === "connected"){
                // Do Somethings...
            }
		});
	}
}

function getUser() {
	(window as any).FB.api("/me", { fields: ["email", "name"] }, (response: UserData) => {
		console.log(response);
	});
}

// Button Style : https://www.npmjs.com/package/react-social-login-buttons
function Facebooklogin(props: facebookLoginProps): any {
	setFBAsyncInit(props);
	loadSdkAsynchronously();
	return (
		<div className="facebook-login">
			<FacebookLoginButton
				text="페이스북으로 로그인"
				onClick={checkLogin}
			/>
		</div>
	);
}

export default Facebooklogin;
