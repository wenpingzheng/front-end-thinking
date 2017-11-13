
import Layout from '../component/MyLayout'

export default (props) => (
  <Layout>
    <h1>{props.url.query.title}</h1>
    <p>这就是内容</p>
  </Layout>
)