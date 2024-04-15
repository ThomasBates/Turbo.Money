import CommonDataProvider from "data/axios/CommonDataProvider";

import IBankAccount from "models/bank/IBankAccount";
import ICommonItem from "models/common/ICommonItem";

export default CommonDataProvider<IBankAccount, ICommonItem>("bankAccount");
