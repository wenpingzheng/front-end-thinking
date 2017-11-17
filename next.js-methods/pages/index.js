
import Link from 'next/link'
import Header from '../component/Header'


const PostLink = (props) => {
  return (
    <li>
      <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  )
}


const Index = () => {
  return(
    <div>
      <Header />
      <Link href="/about">
        <button>Go to About Page</button>
      </Link>
      <p>Hello Next.js</p>
      <ul>
        <PostLink id="hello-next.js" title="Hello Next"/>
        <PostLink id="app-next.js" title="apps Next" />
      </ul>
    </div>
  )
}

export default Index


