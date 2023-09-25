import fetch from "node-fetch";
import getEnvToVar from "../helpers/getEnvToVar";

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  access_token,
}: {
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const data = await fetch(
      `${getEnvToVar(
        "GOOGLE_USER_INFO_URL"
      )}?alt=json&access_token=${access_token}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));
    return data as GoogleUserResult;
  } catch (err: any) {
    throw Error(err);
  }
}
