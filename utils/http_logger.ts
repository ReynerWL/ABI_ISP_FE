export function attachSuperagentLogger(req: any) {
  if (process.env.NODE_ENV === 'production') return
  const callback = req.callback
  console.log(
    '%s %s %s',
    req.method.padEnd('delete'.length, ' '),
    req.url,
    '(pending)'
  )

  req.callback = function (err: any, res: any) {
    console.log(
      '%s %s %s',
      req.method.padEnd('delete'.length, ' '),
      req.url,
      res?.statusCode
    )
    callback.call(req, err, res)
  }
}
