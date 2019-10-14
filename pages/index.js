import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
export default () => {
  function goToTestB() {
    Router.push({
      pathname: '/test/b',
      query: {
        id: 2
      }
    }, '/test/b/2')
  }
  return (
    <>
      <Link href="/a?id=1" as="/a/1" title="AAA">
        <Button>a</Button>
      </Link>
      <Button onClick={goToTestB}>test b</Button>
    </>
  )
}
