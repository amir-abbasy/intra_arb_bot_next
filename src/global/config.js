var Config = {
  dev: false,
  api_url: (() => this.dev)
    ? 'http://127.0.0.1:7300'
    : 'https://intra-arb-bot-test.herokuapp.com/',
}



export default Config
