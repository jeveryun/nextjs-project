import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
export default () => {
  function goToTestB() {
    Router.push('/test/b')
  }
  return (
    <>
      <Link href="/a" title="AAA">
        <Button>a</Button>
      </Link>
      <Button onClick={goToTestB}>test b</Button>
    </>
  )
}
