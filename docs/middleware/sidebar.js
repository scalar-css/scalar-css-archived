function sortDocuments(docs) {
  const result = Object.entries(docs).reduce((acc, [key, value]) => {
    acc[`${key}`] = {
      title: value.title,
      links: value.links.sort((a, b) => {
        return parseInt(a.position) > parseInt(b.position) ? 1 : -1
      })
    }
    return acc
  }, {})
  return result
}

function sortFolders(dir, content) {
  const result = content.reduce((acc, current) => {
    const folder = current.dir.replace(`${dir}/`, '')
    acc[`${folder}`] = {
      title: folder.replace('-', ' '),
      key: folder,
      links: folder in acc ? [...acc[`${folder}`].links, current] : [current]
    }
    return acc
  }, {})

  return sortDocuments(result)
}

async function fetchDirectory(dir, ctx) {
  const content = await ctx
    .$content(dir, { deep: true })
    .only(['title', 'position', 'dir', 'path'])
    .fetch()
  return sortFolders(dir, content)
}

export default async function sidebar(ctx) {
  const path = ctx.route.path
  if (path.startsWith('/docs')) {
    ctx.sidebarLinks = await fetchDirectory('/docs', ctx)
  } else if (path.startsWith('/blog')) {
    ctx.sidebarLinks = await fetchDirectory('/blog', ctx)
  }
}
