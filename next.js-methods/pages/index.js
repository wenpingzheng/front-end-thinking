
import Link from 'next/link'

import Header from '../component/Header'

const PostLink = (props) => {
  return (
    <li>
      <Link href={`/post?title=${post.title}`}>
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
        <PostLink title="Hello Next"/>
        <PostLink title="apps Next" />
      </ul>
    </div>
  )
}

export default Index


