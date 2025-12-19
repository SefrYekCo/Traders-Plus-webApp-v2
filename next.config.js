/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  async redirects() {
    return [
      {
        source: '/signIn',
        destination: '/signInByMobileNumber',
        permanent: false,
      },
      {
        source: '/signUp',
        destination: '/signInByMobileNumber',
        permanent: false,
      },
      {
        source: '/forget-password',
        destination: '/signInByMobileNumber',
        permanent: false,
      },
      {
        source: '/changePassword',
        destination: '/signInByMobileNumber',
        permanent: false,
      },
    ]
  },
  images:{
    domains:["tradersplus-qa.sefryek.com" ,"s2.coinmarketcap.com" ,"pay-qa.digihyper.com" ,"pay.digihyper.com" ,"api.traderzplus.ir","s3.us-east-2.amazonaws.com" ,"nomics-api.s3.us-east-2.amazonaws.com" ,"drsho1.ir" ,"app.akharinkhabar.ir" ,"media.fardayeeghtesad.com" ,"localhost"]
  },

}


module.exports = nextConfig


