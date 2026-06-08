import { getServerSession } from "next-auth";
import { authOptions } from "./api/provider/Credentials";
import NotFoundContent from "./NotFoundContent";

const NotFound = async () => {
    const session = await getServerSession(authOptions);
    const actionHref = session ? "/home" : "/login";
    const actionType = session ? "home" : "login";

    return <NotFoundContent actionHref={actionHref} actionType={actionType} />;
};

export default NotFound;
