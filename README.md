# Jolibox JS SDK Demo

[中文文档](./README_zh.md)

This is a demo project for Jolibox JS SDK.

Once you run the project, you are expected to provide the following query parameters in the URL:

- `gameId`: A required string value to indicate the game ID you want to play. Use G31903729079412278950430008822 for testing.

- `testAdsMode`: A required boolean value to indicate if the game uses test mode ads.

- `joliboxEnv`: A required string value to indicate the Jolibox environment. Must be staging when doing testing.

## Usage

We strongly recommend using the CDN to integrate our SDK as it can support the latest features and bug fixes.

```bash
cd via-cdn
npx serve .

# visit http://localhost:3000?testAdsMode=true&gameId=G31903729079412278950430008822&joliboxEnv=staging
```

## API Documentation

- [Jolibox JS SDK](https://sdk-docs.jolibox.com/)
