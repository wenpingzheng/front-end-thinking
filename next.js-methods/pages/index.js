
import Link from 'next/link'
import Header from '../component/Header'


const PostLink = (props) => {
  return (
    <li>
      <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>

      <style jsx>{`
        h1, a {
          font-family: "Arial";
        }
        ul {
          padding: 0;
        }
        li {
          list-style: none;
          margin: 5px 0;
        }
        a {
          text-decoration: none;
          color: blue;
        }
        a:hover {
          opacity: 0.6;
        }
      `}</style>

    <style jsx global>{`
      p{
        font-size:24px;
        color:green;
        font-weight:600;
      }
    `}</style>
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


