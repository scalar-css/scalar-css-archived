import { loadCssFile, processParams } from '.'

describe('src/util/css.js', () => {
  it('should properly load a css file as a postcss object', () => {
    const actual = loadCssFile('fixture.css', 'fixtures')
    expect(actual.type).toBe('root')
    expect(actual.source).toBeTruthy()
  })

  it('should through an error if the css file does not exist', () => {
    expect(() => {
      loadCssFile('null.css')
    }).toThrowError('ENOENT: no such file or directory')
  })

  it('should properly process params', () => {
    const params = 'this, that, and, the, other , thing'
    const expected = ['this', 'that', 'and', 'the', 'other', 'thing']
    const actual = processParams(params)
    expect(actual).toEqual(expected)
  })
})
