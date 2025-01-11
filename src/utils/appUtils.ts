import { DEPRECATION_MSG_FOR_REMOVAL } from '../enums/app';

const getDeprecationMsgForRemoval = (func: string) =>
  `${func} ${DEPRECATION_MSG_FOR_REMOVAL}`;

export { getDeprecationMsgForRemoval };
