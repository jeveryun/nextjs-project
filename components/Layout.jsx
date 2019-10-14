import Link from 'next/link'
import { Button } from 'antd'
export default ({ children }) => (
  <>
    <header>
      <Link href="/a?id=1" as="/a/1">
        <Button>a</Button>
      </Link>
      <Link href="/test/b?id=2" as="/b/2">
        <Button>b</Button>
      </Link>
    </header>
    <div>{children}</div>
  </>
)
