
import Link from 'next/link'

import Header from '../component/Header'


const Index = () => {
  return(
    <div>
      <Header />
      <Link href="/about">
        <button>Go to About Page</button>
      </Link>
      <p>Hello Next.js</p>
    </div>
  )
}

export default Index


