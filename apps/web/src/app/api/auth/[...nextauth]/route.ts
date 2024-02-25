import {createRouteHandler} from '@nixysoftware/auth-adapter-prisma-providers';

import {prisma} from '@repo/database';

import {getBaseAuthOptions} from '~/server/auth';

const handler = createRouteHandler(prisma, getBaseAuthOptions());

export {handler as GET, handler as POST};
