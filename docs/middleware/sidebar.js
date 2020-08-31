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

function sortFolders(docs) {
  const result = docs.reduce((acc, current) => {
    const folder = current.dir.replace('/docs/', '')
    acc[`${folder}`] = {
      title: folder.replace('-', ' '),
      key: folder,
      links: folder in acc ? [...acc[`${folder}`].links, current] : [current]
    }
    return acc
  }, {})

  return sortDocuments(result)
}

export default async function sidebar(ctx) {
  const path = ctx.route.path
  let content
  if (path.startsWith('/docs')) {
    content = await ctx
      .$content('/docs', { deep: true })
      .only(['title', 'position', 'dir', 'path'])
      .fetch()
  } else if (path.startsWith('/blog')) {
    content = await ctx
      .$content('/blog', { deep: true })
      .only(['title', 'position', 'dir', 'path'])
      .fetch()
  }

  ctx.sidebarLinks = sortFolders(content)
}
