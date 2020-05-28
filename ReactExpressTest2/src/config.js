

  const config = {
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
      endpoints: [
        {
          name: "menu",
          endpoint: settings.apiGateway.URL,
          region: settings.apiGateway.REGION
        },
      ]
    }
  };

  export default awsConfig;

  const settings = {
    s3: {
      REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
      BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
    },
    apiGateway: {
      REGION: "us-central-1",
      URL: "https://z33e79ez91.execute-api.eu-central-1.amazonaws.com/dev/menu"
    },
    cognito: {
      REGION: "YOUR_COGNITO_REGION",
      USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
      APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
      IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID"
    }
};