import CommonDataProvider from "data/axios/CommonDataProvider";

import IBankBank from "models/bank/IBankBank";
import ICommonItem from "models/common/ICommonItem";

export default CommonDataProvider<IBankBank, ICommonItem>("bankBank");
