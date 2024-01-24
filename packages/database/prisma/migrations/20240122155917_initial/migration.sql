-- CreateEnum
CREATE TYPE "OAuthClientProviderType" AS ENUM ('SCHOOL_42', 'APPLE', 'ATLASSIAN', 'AUTH0', 'AUTHENTIK', 'AZURE_AD', 'AZURE_AD_B2C', 'BATTLENET', 'BOX', 'BOXYHQ_SAML', 'BUNGIE', 'COGNITO', 'COINBASE', 'DISCORD', 'DROPBOX', 'DUENDE_IDENTITY_SERVER6', 'EVEONLINE', 'FACEBOOK', 'FACEIT', 'FOURSQUARE', 'FRESHBOOKS', 'FUSIONAUTH', 'GITHUB', 'GITLAB', 'GOOGLE', 'HUBSPOT', 'IDENTITY_SERVER4', 'INSTAGRAM', 'KAKAO', 'KEYCLOAK', 'LINE', 'LINKEDIN', 'MAILCHIMP', 'MAILRU', 'MEDIUM', 'NAVER', 'NETLIFY', 'OAUTH', 'OIDC', 'OKTA', 'ONELOGIN', 'OSSO', 'OSU', 'PASSAGE', 'PATREON', 'PINTEREST', 'PIPEDRIVE', 'REDDIT', 'SALESFORCE', 'SLACK', 'SPOTIFY', 'STRAVA', 'TODOIST', 'TRAKT', 'TWITCH', 'TWITTER', 'UNITED_EFFECTS', 'VK', 'WIKIMEDIA', 'WORDPRESS', 'WORKOS', 'YANDEX', 'ZITADEL', 'ZOHO', 'ZOOM');

-- CreateEnum
CREATE TYPE "OAuthClientProviderCheckType" AS ENUM ('NONCE', 'NONE', 'PKCE', 'STATE');

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAddress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" VARCHAR(32),
    "verifiedAt" TIMESTAMP(3),
    "entityId" UUID NOT NULL,

    CONSTRAINT "EmailAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "handle" TEXT,
    "name" TEXT NOT NULL,
    "profileImageUrl" TEXT,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entityId" UUID NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMembership" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "groupId" UUID NOT NULL,
    "entityId" UUID NOT NULL,

    CONSTRAINT "GroupMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthClientConnection" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "expiresAt" INTEGER,
    "tokenType" TEXT,
    "scope" TEXT,
    "idToken" TEXT,
    "sessionState" TEXT,
    "providerId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "OAuthClientConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthClientProvider" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "type" "OAuthClientProviderType" NOT NULL,
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "wellKnown" TEXT,
    "issuer" TEXT,
    "authorization" JSONB,
    "token" JSONB,
    "userinfo" JSONB,
    "checks" "OAuthClientProviderCheckType",
    "clientId" TEXT,
    "clientSecret" TEXT,
    "style" JSONB,

    CONSTRAINT "OAuthClientProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entityId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_token_key" ON "AuthToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_email_token_key" ON "AuthToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "EmailAddress_email_key" ON "EmailAddress"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_handle_key" ON "Entity"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Group_entityId_key" ON "Group"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthClientConnection_providerId_identifier_key" ON "OAuthClientConnection"("providerId", "identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_entityId_key" ON "User"("entityId");

-- AddForeignKey
ALTER TABLE "EmailAddress" ADD CONSTRAINT "EmailAddress_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthClientConnection" ADD CONSTRAINT "OAuthClientConnection_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "OAuthClientProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthClientConnection" ADD CONSTRAINT "OAuthClientConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
