
import Layout from '../component/MyLayout'

export default (props) => (
    <Layout>
        <h1>{props.url.query.title}</h1>
    </Layout>

)

