import Link from 'next/link'
import Layout from '../components/layout'
import { fetchIndex } from '../lib/data'
import markdown from '../lib/micromark'

export const getStaticProps = async ({ params }) => {
  const { lists } = await fetchIndex()
  return { props: { data: { lists } }, revalidate: false }
}

const content = `
临高启明公开图书馆为爱好者建立的开源项目，目的是为临高启明读者提供修订过早期文本以及在线讨论环境。本站非官方，无版权，所有资料为论坛公开资料收集，请勿用于商业用途！如有侵权，请联系我们删除。

- Discord群：https://discord.gg/XgE4xJM
- 电报群：https://t.me/lingaoqiming
`

export default function Home({ data }) {
  const { lists } = data

  return (
    <Layout title="主页">
      <article className="post content">
        <h1 className="title has-text-centered">
          欢迎来到：临高启明公开图书馆
        </h1>
        <div dangerouslySetInnerHTML={{ __html: markdown(content) }} />
        <h2 className="title has-text-centered" id="catalog">
          目录
        </h2>
        <p className="subtitle" style={{ fontSize: '1.25em' }}>
          以下是已收录分卷列表，共 {lists.length} 卷
        </p>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>编号</th>
              <th>标题</th>
              <th>作者</th>
              <th>文章数量</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list.aid}>
                <td>{list.aid}</td>
                <td>
                  <Link href="/[aid]/" as={`/${list.aid}/`}>
                    {list.title}
                  </Link>
                </td>
                <td>{list.author}</td>
                <td>{list.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </Layout>
  )
}
