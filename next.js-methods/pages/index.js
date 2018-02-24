
import Link from 'next/link'
import Header from '../component/Header'

import fetch from 'isomorphic-unfetch'


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


const Index = (props) => {
  return(
    <div>
      <Header />
      <Link href="/about">
        <button>Go to About Page</button>
      </Link>
      <p>Hello Next.js</p>
      <ul>
        {props.shows.map(({show}) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
        {/*
        <PostLink id="hello-next.js" title="Hello Next"/>
        <PostLink id="app-next.js" title="apps Next" />*/}
      </ul>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  console.log(`Show length:${data.length}`)
  return { shows: data}
}

export default Index


