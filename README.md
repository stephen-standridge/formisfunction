# component-api-client

## tasks
`npm run start #starts a development server`
`npm run dev #builds`
`npm run prod #builds and pushes to prod`
`npm run staging #builds and pushes to staging`

##infrastructure
- 2 s3 buckets (staging, prod)
- cors configuration
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```
- redirect rules
```
<RoutingRules>
  <RoutingRule>
    <Condition>
      <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
    </Condition>
    <Redirect>
      <HostName>bucketName</HostName>
      <ReplaceKeyPrefixWith>#!/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
</RoutingRules>

```
