import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const LinkedInLogin = () => {
    const router = useHistory();
    const [user, setUser] = useState("");
    const LinkedIn = {
        response_type: "code",
        client_id: `78bl9hyo050nrg`,
        redirect_uri: `http://localhost:3000`,
        state: "DCEeFWf45A53sdfKef424",
        scope: `r_liteprofile`,
    };

    const profileURL = queryString.stringify(LinkedIn);
    const authURL = `https://www.linkedin.com/oauth/v2/authorization/?${profileURL}`;

    const requestSever = async () => {
        const { code, state } = router;
        if (code === undefined) return;
        const authToken = localStorage.getItem("token");
        try {
            const response = await axios.get(`/api/auth/${code}`);
            if (response.status === 200) {
                setUser(response.data);
                router.push("/");
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        requestSever();
    }, [router.query]);
    const imageURL = _.get(
        _.last(_.get(user, "profilePicture.displayImage~.elements", "")),
        "identifiers[0].identifier",
        ""
    );

    return (
        <div>
            <main>

                {user === "" ? (
                    <button className={'log-button'} color="primary" variant="contained">
                        <a href={authURL}>Sign in with linkedIn</a>
                    </button>
                ) : ''}
            </main>

        </div>
    );
}

export default LinkedInLogin