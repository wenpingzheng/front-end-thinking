
import Layout from '../component/MyLayout'

export default (props) => (
  <Layout>
    <h1>{props.url.query.title}</h1>
    <p>这是主我要的内容</p>
  </Layout>
)
